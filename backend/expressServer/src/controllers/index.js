import { getCollection } from "../config/db.js";
import { embedQuery } from "../embedding/embed.js"

export async function handleSearch(req, res) {
    try {
        const query = req.query.q
        const category = req.query.category

        const embededQuery = await embedQuery(query)
        const cleanCategory = category.toLowerCase().replace(/[^a-z]/g, "");
        const filter = {};
        if (cleanCategory && cleanCategory !== "all") {
            filter.source = { $eq: cleanCategory };
        }

        const collection = getCollection()
        const pipeline = [
            {
                $vectorSearch: {
                    index: "vector_index",
                    path: "embedding",
                    queryVector: embededQuery,
                    numCandidates: 50,
                    limit: 10,
                    ...(Object.keys(filter).length > 0 ? { filter } : {})
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    url: 1,
                    source: 1,
                    stars: 1,
                    score: { $meta: "vectorSearchScore" }
                }
            }
        ]

        const results = await collection.aggregate(pipeline).toArray()
        const ingestingResult = fetch('http://localhost:8001/ingest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: query })
        })
            .then(r => r.json())
            .then(data => console.log(`ingestion of ${query}: ${data}`))
            .catch(err => console.warn('Backend Ingestion failed', err))


        return res.json(results)

    } catch (err) {
        console.error(err)
        res.status(400).json({ message: err.message })
    }

}