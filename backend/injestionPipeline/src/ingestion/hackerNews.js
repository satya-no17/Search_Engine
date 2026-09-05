import dotenv from 'dotenv';
dotenv.config();

export async function fetchHackerNews(query, limit = 10) {
    const res = await fetch(`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story&hitsPerPage=${limit}`)
    if (!res.ok) {
        throw new Error(`HN API error: ${res.status}`)
    }
    const data = await res.json()
    return data.hits.map(results => ({
        source: 'hackernews',
        title: results.title,
        description: results.story_text?.slice(0, 300) || '',
        url: results.url,
        stars: results.points,
        text: `${results.title}: ${results.story_text?.slice(0, 300) || ''}`
    }))

}