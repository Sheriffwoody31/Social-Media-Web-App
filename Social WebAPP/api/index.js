const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const helmet = require('helmet')


//To use .env file :
dotenv.config()

//Mongoose Connection:
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to MongoDB !!")
  })


//Routes for the app:
const userRouter = require("./routes/users.router")
const authRouter = require("./routes/auth.router")
const postRouter = require("./routes/post.router")


const app = express()
const PORT = 5001;
 


//Middleware's:
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))


app.use("/users", userRouter)
app.use("/auth", authRouter)
app.use("/post", postRouter)


app.listen(PORT, ()=> {
    console.log(`server is running on PORT ${PORT} ..`)
})