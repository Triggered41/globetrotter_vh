import express from 'express'
import cors from 'cors' 
import fs from 'fs'
import { assignAnswer, pickChoices, pickCity, pickClues } from './utils/pickRandom.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())


const test_ds = JSON.parse(fs.readFileSync('./test_ds.json'))

app.get("/getQuestion", (req, res)=>{
    const [city, cityId] = pickCity(test_ds)
    const pickedClues = pickClues(city['clues'])
    const pickedChoices = pickChoices(['Paris', 'New York', 'Tokyo', 'Berlin'])
    const answeredChoices = assignAnswer(pickedChoices, city['city'])

    const payload = { cityId: cityId }
    console.log("Pl: ", payload)
    const token = jwt.sign(payload, "hola")

    res.send(JSON.stringify({
        token: token,
        choices: answeredChoices,
        clues: pickedClues
    }))
})

app.post("/submitAnswer", (req, res) => {
    const cityId = jwt.decode(req.body.token)["cityId"]
    const answer = req.body.answer

    if (answer === test_ds[cityId]['city']){
        console.log("OKOK")
    }
    console.log(req.body)
})

const PORT = process.env.PORT
app.listen(PORT, (err)=>{
    if (err){
        console.error("Error: ", err)
        return
    }
    console.log(`Server started at ${PORT}`)
})