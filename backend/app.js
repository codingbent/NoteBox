require("dotenv").config();

const connectToMongo = require('./db');
const express = require('express')
const cors=require('cors')
connectToMongo();

const app = express()
const port = process.env.PORT||5002
app.use(express.json())
app.use(cors({ origin: "*" }));

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})