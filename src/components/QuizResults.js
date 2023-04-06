import React from "react"

export default function QuizResults(props) {
 
    const {quiz, checkAnswers, newQuiz, createNewQuiz} = props
    
    function styles() {
        const allSelected = quiz.every(prompt => prompt.selectedAnswer !== "")
        if(!allSelected || newQuiz) {
            return {
                backgroundColor: "#cccccc",
                color: "#666666",
                pointerEvents: "none"

            }
        } else {
            return {
                backgroundColor: "#4D5B9E",
                color: "#F5F7FB"  
            }
        }
    }

    function score() {
        let score = 0
        props.selectedAnswers.forEach(selectedAnswer => {
            quiz.forEach(prompt => {
                if(selectedAnswer === prompt.correctAnswer) {
                    score++
                }
            })
        })
        return score
    }
        
    return ( 
        <div className="results--container">
            {!checkAnswers && (
                <button className="check--answers--btn" style={styles()} onClick={props.handleCheckAnswers}>Check answers</button>
            )}
            {checkAnswers && (
                <div className="results">
                    <p className="score">You scored {score()} / 5 correct answers</p>
                    <button className="play--again--btn" style={styles()} onClick={createNewQuiz}>Play Again</button>
                </div>
            )}
        </div>
    )
}