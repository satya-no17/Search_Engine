import e from "express";
import searchRoute from "./routes.js";
const app = e()
app.use(e.json())


app.use('/query',searchRoute)

export default app