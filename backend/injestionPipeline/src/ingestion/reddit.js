export async function fetchRedditPosts(query, limit = 10) {
  const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&limit=${limit}&sort=relevance`;

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'search-engine-project/0.1 (personal learning project)',
    },
  });

  if (!res.ok) {
    throw new Error(`Reddit API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return data.data.children.map(({ data: post }) => ({
    source: 'reddit',
    title: post.title,
    description: post.selftext?.slice(0, 300) || '',
    url: `https://reddit.com${post.permalink}`,
    stars: post.ups,
    text: `${post.title}: ${post.selftext?.slice(0, 300) || ''}`,
  }));
}