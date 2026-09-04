import dotenv from 'dotenv';
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
dotenv.config()

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.json({ message: "backend gateway is rolling" })
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Express app is rolling on http://localhost:${PORT}`);
    });
});