import http from "http";
import { Client } from "pg";
import "dotenv/config";

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "bunny",
    password: process.env.PASSWORD,
    port: 5432,
});

await client.connect();

const server = http.createServer(async (req, res) => {
    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        });
        return res.end();
    }

    if (req.method === "POST" && req.url === "/api/interact") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", async () => {
            try {
                const { item } = JSON.parse(body);

                await client.query(
                    "INSERT INTO bunny_interactions (item) VALUES ($1)",
                    [item]
                );

                const liked = ["🥕", "🍀", "🍭"];
                const disliked = ["🍗", "🕷️", "💩"];

                const result = await client.query(`
          SELECT
            COUNT(*) FILTER (WHERE item = ANY($1)) AS liked_count,
            COUNT(*) FILTER (WHERE item = ANY($2)) AS disliked_count
          FROM bunny_interactions
        `, [liked, disliked]);

                const likedCount = Number(result.rows[0].liked_count);
                const dislikedCount = Number(result.rows[0].disliked_count);

                let status = "feels neutral about you";
                if (likedCount >= 5) status = "likes you";
                if (dislikedCount >= 5) status = "does not like you";

                console.log("SENDING:", { likedCount, dislikedCount, status });

                res.writeHead(200, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({
                    liked_count: likedCount,
                    disliked_count: dislikedCount,
                    status
                }));

            } catch (err) {
                console.error(err);
                res.writeHead(500);
                res.end("Server error");
            }
        });
    }

    // DELETE route
    if (req.method === "DELETE" && req.url === "/api/clear") {
        await client.query("DELETE FROM bunny_interactions");

        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ success: true }));
    }
});

server.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});