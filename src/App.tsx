import './App.css'
import Hangman from "./Hangman/Hangman.tsx";
import WordList from "./wordList.ts";
import {useEffect, useState} from "react";

const getWord = () => {
    return WordList[Math.floor(Math.random() * WordList.length)]
}

function App() {
    const [wordToGuess, setWordToGuess] = useState(getWord)
    const [guessedLetters, setGuessedLetters] = useState<string[]>([])
    const [showHint, setShowHint] = useState(false)
    let inCorrectLetter = guessedLetters.filter((letter) => !wordToGuess.word.includes(letter))
    const [status, setStatus] = useState("")
    useEffect(() => {
        if (guessedLetters.length > 0) {
            if (wordToGuess.word.split("").every((letter) => guessedLetters.includes(letter))) {
                setStatus("winner")
            } else if (inCorrectLetter.length >= 6) {
                setStatus("loser")
            }
        }
    }, [guessedLetters])

    const KEYS = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
    ]

    const resetHandler = () => {
        setGuessedLetters([])
        inCorrectLetter = []
        setStatus("")
        setWordToGuess(getWord)
        setShowHint(false)
    }

    return (
        <div className={"relative"}>
            {status && (
                <div className={"fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"}
                     style={{background: "rgba(14,14,14,0.15)"}}>
                    <div className={"w-11/12 max-w-96 h-40 rounded bg-white flex flex-col justify-center items-center"}
                         style={{boxShadow: "0 0 10px var(--clr-purple)"}}
                    >
                        <div className={"mb-6 text-center"}>
                            {status === "winner" ? <div className={"text-3xl font-bold "}>You Won!</div> : (
                                <>
                                    <div className={"text-3xl font-bold "}>
                                        You Lost!
                                    </div>
                                    <h2>
                                        The answer is "{wordToGuess.word}"
                                    </h2>
                                </>
                            )}
                        </div>
                        <button className={"w-11/12 h-9 text-white rounded bg-purple"}
                                style={{boxShadow: "5px 5px 0 black"}}
                                onClick={resetHandler}
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            )}
            <Hangman keys={KEYS} setGuessedLetters={setGuessedLetters}
                     inCorrectLetter={inCorrectLetter}
                     wordToGuess={wordToGuess}
                     guessedLetters={guessedLetters}
                     setStatus={setStatus}
                     showHint={showHint}
                     setShowHint={setShowHint}
            />
        </div>
    )
}

export default App
