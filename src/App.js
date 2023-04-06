import React from "react"
import Quiz from "./components/Quiz"
import QuizResults from "./components/QuizResults"
import QuizStartScreen from "./components/QuizStartScreen"
import { nanoid } from "nanoid"

export default function App() {
    
    const [quiz, setQuiz] = React.useState([])
    
    const [checkAnswers, setCheckAnswers] = React.useState(false)
    
    const [startQuiz, setStartQuiz] = React.useState(false)
    
    const [newQuiz, setNewQuiz] = React.useState(false)
    
    const [apiFetch, setApiFetch] = React.useState(false)
    
    React.useEffect(() => {
        async function getQuiz() {
            const resp = await fetch("https://opentdb.com/api.php?amount=5&type=multiple&encode=url3986")
            const data = await resp.json()
            setQuiz(data.results.map(result => {
                const {question, correct_answer, incorrect_answers} = result
                setCheckAnswers(false)
                setNewQuiz(false)
                return {
                    question: decodeURIComponent(question),
                    correctAnswer: decodeURIComponent(correct_answer),
                    answersArray: shuffle([
                        decodeURIComponent(correct_answer), 
                        ...incorrect_answers.map(incorrect_answer => decodeURIComponent(incorrect_answer))
                    ]),
                    selectedAnswer: "",
                    id: nanoid()
                }
            }))
        }
        getQuiz()
    }, [apiFetch])
    
    
    function createNewQuiz(){
        setNewQuiz(true)
        setApiFetch(prevState => !prevState)
    }  
    
    function startGame() {
        setStartQuiz(true)
    }
    
    function shuffle(array) {
        let counter = array.length;
        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);
            counter--;
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }
    
    function handleSelection(id, e) {
        const selectedAnswer = e.target.innerText
        setQuiz(prevQuiz => {
            return prevQuiz.map(prevPrompt => {
                if(prevPrompt.id === id) {
                    return {
                        ...prevPrompt,
                        selectedAnswer: selectedAnswer
                    }
                } else {
                    return prevPrompt
                }
            })
        })
    }
       
    function handleCheckAnswers() {
        setCheckAnswers(true)
    }
    
    const selectedAnswers = quiz.map(prompt =>prompt.selectedAnswer)
    
    const quizElements = quiz.map(prompt => (
        <Quiz 
            question={prompt.question}
            correctAnswer={prompt.correctAnswer}
            answers={prompt.answersArray}
            selectedAnswer={prompt.selectedAnswer}
            id={prompt.id}
            key={prompt.id}
            handleSelection={(event) => handleSelection(prompt.id, event)}
            checkAnswers={checkAnswers}
        /> 
    ))
    
    const quizResultsElement = (
       <QuizResults
            quiz={quiz} 
            checkAnswers={checkAnswers} 
            handleCheckAnswers={() => handleCheckAnswers()}
            selectedAnswers={selectedAnswers}
            createNewQuiz={() => createNewQuiz()}
            newQuiz={newQuiz}
    /> 
    )
    
    const startQuizElement = (
        <QuizStartScreen 
            startGame={() => startGame()}
        />        
    )

    return (
        <div className="container">
            <img className="blob blue--blob"src="../images/blobs.png" alt=""/>
            <img className="blob yellow--blob"src="../images/blobs-1.png" alt=""/>
            {!startQuiz && startQuizElement}
            {startQuiz && (
                <div className="quiz--container">
                    {quizElements}
                    {quizResultsElement}
                </div>   
            )}
        </div>
    )    
}

