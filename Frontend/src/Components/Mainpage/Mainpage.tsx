import { CenterContainer } from '../Containers/CenterContainer/CenterContainer'
import { GridContainer } from '../Containers/GridContainer/GridContainer'
import style from './Mainpage.module.css'

import { ReactNode, useEffect, useState } from "react"

export const Mainpage = () => {
    const [question, setQuestion] = useState({clues: [], choices: []})
    
    const fetchQuestion = () => {
        fetch("http://192.168.167.202:8080/getQuestion")
        .then(data => data.json())
        .then(json => setQuestion(json))
    }

    useEffect(()=>{
        fetchQuestion()
    }, [])
    return (
        <div>
            <h2 className={style.clue} >{question.clues}</h2>
            
            <CenterContainer >
                <GridContainer>
                    <ChoiceButton choice={question.choices[0]} />
                    <ChoiceButton choice={question.choices[1]} />
                    <ChoiceButton choice={question.choices[2]} />
                    <ChoiceButton choice={question.choices[3]} />
                </GridContainer>
            </CenterContainer>
            
        </div>
    )
}

export const ChoiceButton = ({choice="Choice"}: {choice?: string}) => {

    const submitAnswer = () => {
        fetch("http://192.168.167.202:8080/submitAnswer",{
            method: 'POST',
            mode: 'cors',
            headers: {"content-type": "application/json"},
            body: JSON.stringify({answer: choice})
        })
    }

    return (
        <button onClick={submitAnswer} className={style.choice_button}>
            {choice}
        </button>
    )
}

