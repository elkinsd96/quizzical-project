import React from "react"
import { nanoid } from "nanoid"

export default function Quiz(props) {
    
    function styles(answer) {
        if(props.checkAnswers) {
             if(answer === props.correctAnswer) {
                 return {
                    backgroundColor: "#94D7A2",
                    pointerEvents: "none"
                }
             } else if(answer === props.selectedAnswer) {
                 return {
                    backgroundColor: "#F8BCBC",
                    pointerEvents: "none"
                }
             }  else {
                 return {
                     backgroundColor: "white",
                     pointerEvents: "none"
                 }
             }
        }
    }

    const answersElements = props.answers.map(answer => (
        <div className="answer" key={nanoid()}>
            <button 
                className={`answer--btn
                    ${answer === props.selectedAnswer ? "selected--answer" : ""} 
                    ${answer === props.correctAnswer ? "correct--answer" : ""}
                    `}
                style={styles(answer)}
                onClick={props.handleSelection}
            >
                {answer}
            </button>
        </div>
    ))
    
    return (
        <div className="quiz" key={props.id}>
            <h2 className="question">{props.question}</h2>
            <div className="answers">
                {answersElements}
            </div>
        </div>
    )
}