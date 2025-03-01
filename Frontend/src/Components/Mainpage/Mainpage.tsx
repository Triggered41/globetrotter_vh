import { getQuestion } from '../../utils/apihandler'
import { CenterContainer } from '../Containers/CenterContainer/CenterContainer'
import { GridContainer } from '../Containers/GridContainer/GridContainer'
import style from './Mainpage.module.css'

import { useEffect, useState } from "react"

export const Mainpage = () => {
    const [question, setQuestion] = useState({clues: [], choices: []})
    const fetchQuestion = async () => {
        // fetch("http://192.168.29.176:8080/getQuestion")
        // .then(data => data.json())
        // .then(json => {
        //     setQuestion(json)
        //     document.cookie = `token=${json['token']}`
        //     console.log("Got: ", document.cookie)
        // })
        const data = await getQuestion()
        return data;
    }

    useEffect(()=>{
        fetchQuestion().then(data => {
            console.log(data)
            setQuestion(data)
        })
    }, [])
    return (
        <div className={style.main_page}>
            <CenterContainer vertical={true}>
                <div className={style.holder}>
                    <CenterContainer vertical={true}>
                        <div className={style.clue_holder}>
                            {question.clues.map((el, id)=><h2 key={id} className={style.clue} ><i>Clue {id+1}:</i> {el}</h2>)}
                        </div>
                    </CenterContainer>
                    
                    <div style={{borderTop: 'solid #EEE 3px', width: '100%', marginBlock: '2rem'}}></div>

                    <CenterContainer vertical={true}>
                        <GridContainer>
                            <ChoiceButton choice={question.choices[0]} />
                            <ChoiceButton choice={question.choices[1]} />
                            <ChoiceButton choice={question.choices[2]} />
                            <ChoiceButton choice={question.choices[3]} />
                        </GridContainer>
                    </CenterContainer>
                </div>
            </CenterContainer>
        </div>
    )
}

export const ChoiceButton = ({choice="Choice"}: {choice?: string}) => {
    

    const submitAnswer = () => {
        fetch("http://192.168.29.176:8080/submitAnswer",{
            method: 'POST',
            mode: 'cors',
            headers: {"content-type": "application/json"},
            body: JSON.stringify({token: document.cookie.split('=')[1], answer: choice})
        })
    }
    
    return (
        <button onClick={submitAnswer} className={style.choice_button}>
            {choice}
        </button>
    )
}

