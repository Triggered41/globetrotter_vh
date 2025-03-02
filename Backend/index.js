import express from 'express'
import cors from 'cors' 
import fs from 'fs'
import { assignAnswer, pickChoices, pickCity, pickClues } from './utils/pickRandom.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { generateQR } from './QRgen/gen.js'

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
    const token = jwt.sign(payload, process.env.JWT_SECRET)

    res.send(JSON.stringify({
        token: token,
        choices: answeredChoices,
        clues: pickedClues
    }))
})

app.get("/getQR", (req, res) => {
    // console.log("Cl")
    const qrRes = generateQR("https://vehdathamid-vh.web.app")
    qrRes.then(data => {
        console.log(data)
        res.json({src: data.output.output_images[0]})
    })

})

app.post("/submitAnswer", (req, res) => {
    const cityId = jwt.decode(req.body.token)["cityId"]
    const answer = req.body.answer

    res.json({result: answer === test_ds[cityId]['city'], fact: test_ds[cityId]['fun_fact']})
})

const PORT = process.env.PORT
app.listen(PORT, (err)=>{
    if (err){
        console.error("Error: ", err)
        return
    }
    console.log(`Server started at ${PORT}`)
})