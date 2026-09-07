import dotenv from 'dotenv';
dotenv.config();

const KEY = process.env.STACKOVERFLOW_KEY;

export async function fetchStackOverflowPosts(query, limit = 10) {
    const url = `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=relevance&q=${encodeURIComponent(query)}&site=stackoverflow&pagesize=${limit}&key=${KEY}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Stack Overflow API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data.items.map(item => ({
        source: 'stackoverflow',
        title: item.title,
        description: '',
        url: item.link,
        stars: item.score,
        text: item.title,
    }));
}