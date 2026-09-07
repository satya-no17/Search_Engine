import dotenv from 'dotenv';
dotenv.config();

const GITHUB_TOKEN = process.env.GIT_TOKEN;
const HEADERS = GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {};

export async function fetchGithubRepos(query, perPage = 10) {
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=${perPage}&sort=stars`;
  const res = await fetch(url, { headers: HEADERS });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.items.map(repo => ({
    source: 'github',
    title: repo.name,
    description: repo.description || '',
    url: repo.html_url,
    stars: repo.stargazers_count,
    text: `${repo.name}: ${repo.description || ''}`, // what gets embedded
  }));
}