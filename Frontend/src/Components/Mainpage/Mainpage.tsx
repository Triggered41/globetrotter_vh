import Confetti from 'react-confetti-boom'
import { getQR, getQuestion } from '../../utils/apihandler'
import { CenterContainer } from '../Containers/CenterContainer/CenterContainer'
import { GridContainer } from '../Containers/GridContainer/GridContainer'
import style from './Mainpage.module.css'

import { useEffect, useRef, useState } from "react"

export const Mainpage = () => {
    const [question, setQuestion] = useState({clues: [], choices: []})
    const [confetti, setConfetti] = useState(false)
    const [result, setResult] = useState({res: false, fact: ''})
    const [gameStats, setGameStats] = useState({won: 0, lost: 0})
    const resultRef = useRef<HTMLDivElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)

    const fetchQuestion = async () => {
        const data = await getQuestion()
        return data;
    }

    const startRound = () => {
        fetchQuestion().then(data => {
            setQuestion(data)
            resultRef.current?.classList.toggle(style.reveal)
        })
    }

    useEffect(()=>{
        startRound()
    }, [])

    const onChoiceClick = (result: boolean, fact: string) => {
        setResult({res: result, fact: fact})
        
        resultRef.current!.classList.toggle(style.reveal)
        if (result){   
            setGameStats({ won: gameStats.won+1, lost: gameStats.lost })
            setConfetti(true)
            setTimeout(() => {
                setConfetti(false)
            }, 5000);
            return
        }

        setGameStats({ won: gameStats.won, lost: gameStats.lost+1 })
    }
    
    const onPlayClick = () => {
        startRound()
    }

    const onShareClick = () => {
        getQR()
        .then(data => data.json())
        .then(json => imgRef.current!.src = json.src )
    }

    const onCopyClick = () => {
        navigator.clipboard.writeText("vehdathamid-vh.web.app")
    }

    return (
        <div className={style.main_page}>
            {confetti && <Confetti mode='boom' particleCount={200} launchSpeed={1} spreadDeg={100}/>}
            <div ref={resultRef} className={style.result_card} >
                <div className={style.result} >
                    <h4>{`Won: ${gameStats.won}, Lost: ${gameStats.lost}`}</h4>
                    <h4>Fun Fact</h4>
                    <h4>{result.fact}</h4>
                    <p>{result.res? '😀 ' : '🙁' }</p>
                    <button onClick={onPlayClick} className={style.choice_button}>Play Again</button>
                </div>
            </div>

            <div className={style.share_card}>
                <div className={style.share}>
                    <h4>QR</h4>
                    <img className={style.img} ref={imgRef} src="" alt="Loading..." />
                    <br />
                    <button className={style.choice_button} onClick={onCopyClick}>Copy URL</button>
                </div>
            </div>
            
            <CenterContainer vertical={true}>
                <div className={style.holder}>
                <button onClick={onShareClick} className={style.choice_button+' '+style.share_button}>Share</button>
                    <CenterContainer vertical={true}>
                        <div className={style.clue_holder}>
                            {question.clues.map((el, id)=><h2 key={id} className={style.clue} ><i>Clue {id+1}:</i> {el}</h2>)}
                        </div>
                    </CenterContainer>
                    
                    <div style={{borderTop: 'solid #EEE 3px', width: '100%', marginBlock: '2rem'}}></div>

                    <CenterContainer vertical={true}>
                        <GridContainer>
                            <ChoiceButton onClick={onChoiceClick} choice={question.choices[0]} />
                            <ChoiceButton onClick={onChoiceClick} choice={question.choices[1]} />
                            <ChoiceButton onClick={onChoiceClick} choice={question.choices[2]} />
                            <ChoiceButton onClick={onChoiceClick} choice={question.choices[3]} />
                        </GridContainer>
                    </CenterContainer>
                </div>
            </CenterContainer>
        </div>
    )
}

export const ChoiceButton = ({onClick, choice="Choice"}: {onClick?: Function, choice?: string}) => {
    

    const submitAnswer = () => {
        fetch("http://192.168.29.176:8080/submitAnswer",{
            method: 'POST',
            mode: 'cors',
            headers: {"content-type": "application/json"},
            body: JSON.stringify({token: document.cookie.split('=')[1], answer: choice})
        })
        .then(data => data.json())
        .then(json => {
            onClick!(json.result, json.fact)
        })
    }
    
    return (
        <button onClick={submitAnswer} className={style.choice_button}>
            {choice}
        </button>
    )
}

