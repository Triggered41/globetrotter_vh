
const pickRandom = (size) => {
    return Math.trunc(Math.random()*size)
}

const pickCity = (cities) => {
    const cityId = pickRandom(cities.length)
    return [cities[cityId], cityId]
}

const pickClues = (clues) => {
    const firstClueId = pickRandom(clues.length)
    let secondClueId = pickRandom(clues.length)
    secondClueId = secondClueId === firstClueId ? (firstClueId+1)%clues.length : secondClueId
    return [clues[firstClueId], clues[secondClueId] ]
}

const pickChoices = (choices) => {
    let pickedChoices = []
    
    while (pickedChoices.length < 4){
        const choice = choices[pickRandom(choices.length)]
        if (pickedChoices.find((el)=>el==choice)){
            continue
        }
        pickedChoices.push(choice)
    }
    return pickedChoices
}

const assignAnswer = (choices, answer) => {
    let answerId = pickRandom(4) 
    let answeredChoices = choices
    if (answeredChoices[answerId] == answer) return answeredChoices

    answeredChoices[answerId] = answer
    return answeredChoices
}

export {
    pickRandom as pickRandom,
    pickCity as pickCity,
    pickClues as pickClues,
    pickChoices as pickChoices,
    assignAnswer
}