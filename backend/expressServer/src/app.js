import e from "express";
import cors from 'cors';
import searchRoute from "./routes/index.js";
const app = e()

app.use(cors())
app.use(e.json())


app.use('/query', searchRoute)

export default app