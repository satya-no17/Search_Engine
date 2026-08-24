import dotenv from 'dotenv';
dotenv.config();

import figlet from 'figlet';
import chalk from 'chalk';
import gradient from 'gradient-string';
import * as p from '@clack/prompts';

import { connectDB, closeDB } from './src/config/db.js';
import { ingest, ingestGithub, ingestReddit } from './main.js';

// Rainbow-ish gradient banner instead of flat cyan
console.log(
  gradient(['#00c6ff', '#0072ff', '#7b2ff7']).multiline(
    figlet.textSync('IngestCLI', { font: 'Standard' })
  )
);
console.log(chalk.gray('  semantic search ingestion tool\n'));

async function main() {
  p.intro(chalk.bgMagenta.white.bold(' search-engine ingestion '));

  const query = await p.text({
    message: chalk.yellow('What do you want to search for?'),
    placeholder: 'e.g. docker containers',
    validate: (value) => {
      if (!value || !value.trim()) return chalk.red('Query cannot be empty');
    },
  });

  if (p.isCancel(query)) {
    p.cancel(chalk.red('Cancelled.'));
    process.exit(0);
  }

  const from = await p.select({
    message: chalk.yellow('Where should we fetch from?'),
    options: [
      { value: 'both', label: chalk.green('Both'), hint: 'GitHub + Reddit' },
      { value: 'github', label: chalk.blue('GitHub'), hint: 'high rate limit' },
      { value: 'reddit', label: chalk.hex('#FF4500')('Reddit'), hint: 'slower, rate-limited' },
    ],
  });

  if (p.isCancel(from)) {
    p.cancel(chalk.red('Cancelled.'));
    process.exit(0);
  }

  const sourceMap = {
    github: ingestGithub,
    reddit: ingestReddit,
    both: ingest,
  };

  const runIngest = sourceMap[from];

  const s = p.spinner();
  s.start(chalk.dim('Connecting to database...'));
  await connectDB();
  s.stop(chalk.green('✔ Connected.'));

  s.start(chalk.dim(`Ingesting "${chalk.bold(query)}" from ${chalk.bold(from)}...`));
  try {
    const result = await runIngest(query);
    s.stop(chalk.green(`✔ Done — inserted ${chalk.bold(result.inserted)} documents.`));
    p.outro(chalk.bgGreen.black.bold(' Ingestion complete ✔ '));
  } catch (err) {
    s.stop(chalk.red('✘ Ingestion failed.'));
    p.log.error(chalk.red(err.message));
    process.exit(1);
  } finally {
    await closeDB();
  }
}

main();