import dotenv from 'dotenv';
dotenv.config();


export async function fetchDevToArticles(query, limit = 10) {
    const tag = query.split(' ').join('-');
    const url = `https://dev.to/api/articles?tag=${encodeURIComponent(tag)}&per_page=${limit}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Dev.to API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return data.map(article => ({
        source: 'devto',
        title: article.title,
        description: article.description || '',
        url: article.url,
        stars: article.public_reactions_count || 0,
        text: `${article.title}: ${(article.description || '').slice(0, 300)}`,
    }));
}