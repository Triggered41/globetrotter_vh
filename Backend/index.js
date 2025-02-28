import express from 'express'
import cors from 'cors' 
import { PORT } from './server_config.js'
import fs from 'fs'
import { pickRandom } from './utils/pickRandom.js'

const app = express()
app.use(cors())
app.use(express.json())


const test_ds = JSON.parse(fs.readFileSync('./test_ds.json'))

app.get("/getQuestion", (req, res)=>{
    const pick = pickRandom(test_ds)
    const pickedClue = pickRandom(pick['clues'])
    res.send(JSON.stringify({
        choices: ['paris', 'tokyo', 'berlin', 'belgium'],
        clues: pickedClue
    }))
})

app.post("/submitAnswer", (req, res) => {
    console.log("Rec: ", req.body)
})

app.listen(PORT, (err)=>{
    if (err){
        console.error("Error: ", err)
        return
    }
    console.log(`Server started at ${PORT}`)
})