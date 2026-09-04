import React from "react";

export default function Results({ results }) {
    return (
        <div>
            <h1>Results</h1>
            <ul>
                {results.map((result) => (
                    <div className="border" key={result._id}>
                        <h2>{result.title}</h2>
                        <p>{result.url}</p>
                    </div>
                ))}
            </ul>
        </div>
    )
}