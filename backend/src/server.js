import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import cors from "cors"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express()
const port = process.env.PORT || 5001



// middleware - functions that run in between request and response

app.use(cors({
    origin:"http://localhost:5173",
}))
// in this case, parses JSON bodies to get req.body
app.use(express.json())

// example of middleware, which just returns info about request
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} and URL is ${req.url}`)
//     next();
// })
app.use(rateLimiter)



// if request uses "api/notes", fetch routes from notesRoutes.js file
app.use("/api/notes", notesRoutes)

// better if db connects first before the app starts
connectDB().then(() => {
    app.listen(port, () => {
        console.log("Server started on PORT:", port)
    })
})

