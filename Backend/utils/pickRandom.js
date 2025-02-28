const pickRandom = (arr) => {
    const pick = Math.trunc(Math.random()*arr.length)
    return arr[pick]
}


export {
    pickRandom
}