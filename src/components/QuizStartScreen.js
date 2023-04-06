import React from "react"

export default function QuizStartScreen(props) {
    return (
        <div className="intro--page">
            <h1 className="intro--title">Quizzical</h1>
            <p className="intro--desc">Test your knowledge</p>
            <button className="start--quiz--btn" onClick={props.startGame}>Start quiz</button>
        </div>
    )
}