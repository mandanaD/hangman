import {useState, useEffect} from "react";
import "./Hangman.css"

type hangmanProps = {
    keys: string[],
    setGuessedLetters: (value: ((pre: string[]) => string[])) => void,
    inCorrectLetter: string[]
    wordToGuess: {
        word: string,
        hint: string
    },
    guessedLetters: string[]
    setStatus: (value: string) => void,
    showHint: boolean,
    setShowHint: (value: boolean) => void,
}
const Hangman = ({
                     keys,
                     setGuessedLetters,
                     inCorrectLetter,
                     wordToGuess,
                     guessedLetters,
                     setStatus,
                     showHint,
                     setShowHint
                 }: hangmanProps) => {
    const [score, setScore] = useState<number>(0)
    let keyboard: JSX.Element[] = [];
    if (keys) {
        keyboard = keys.map((item: string, index: number) => {
            const isDisable = guessedLetters.includes(item)
            return (
                <button
                    disabled={isDisable}
                    style={{boxShadow: "5px 5px 0 black"}}
                    className={`${isDisable ? "bg-disPurple" : "bg-purple"} h-10 w-14 rounded keyboard-btn`}
                    key={index} onClick={() => setGuessedLetters((prev => [...prev, item]))}>
                    {item.toUpperCase()}
                </button>
            )
        })
    }

    useEffect(() => {
        if (wordToGuess.word) {
            setScore((wordToGuess.word.split("").length) * 600);
        }
    }, [wordToGuess.word]);

    useEffect(() => {
        if (inCorrectLetter.length > 0 && score > 0) {
            const val = (((wordToGuess.word.split("").length) * 600) / 6)
            const newVal = ((wordToGuess.word.split("").length) * 600) - (val * inCorrectLetter.length)
            const newScore = (newVal);
            if (newScore <= 0) {
                setScore(0);
                setStatus("loser");
            } else {
                setScore(newScore)
            }
        }
    }, [inCorrectLetter]);

    let word;
    if (wordToGuess.word) {
        word = wordToGuess.word.split("").map((item: string, index: number) => {
            return (
                <div className={"word outline outline-purple-200 rounded"}
                     style={{outlineWidth: "2px", boxShadow: "5px 5px 0 black"}} key={index}>
                    {guessedLetters.includes(item) ? (
                        <p className={"px-3"}>
                            {item.toUpperCase()}
                        </p>
                    ) : (<p className={"px-1 text-purple-950"}>__</p>)}
                </div>
            )
        })
    }
    return (
        <div className={"min-h-screen flex justify-center items-center bg-fuchsia-50"}>
            <div className={"w-full"} style={{maxWidth: "50rem"}}>
                <div className={"flex flex-col p-8 justify-between items-center hangman"}
                     style={{minHeight: "85vh"}}
                >
                    <h1 className={"title text-6xl font-bold relative z-20"}>
                        <div>
                            Hang Man
                        </div>
                        <div className={"absolute w-28 h-1 rounded bg-black -right-6"}/>
                        <div className={"absolute h-20 w-1 rounded bg-black -bottom-1 -right-2"}/>
                        <div className={"absolute h-7 w-1 rotate-45 rounded bg-black -top-5 -right-4"}/>
                        <div className={"absolute w-11 h-1 rounded bg-black -top-4 -right-12"}/>
                        <div className={"absolute h-5 w-1 rounded bg-black -top-4 -right-12"}/>

                        <div className={"absolute h-4 w-4 rounded-full border-4 border-black top-0 -right-14"}
                             style={{display: inCorrectLetter.length >= 1 ? "block" : "none"}}/>
                        <div className={"absolute h-5 w-1 rounded bg-black top-3 -right-12"}
                             style={{display: inCorrectLetter.length >= 2 ? "block" : "none"}}/>
                        <div className={"absolute h-3 w-1 rotate-45 rounded bg-black top-4 -right-11"}
                             style={{display: inCorrectLetter.length >= 3 ? "block" : "none"}}/>
                        <div className={"absolute h-3 w-1 -rotate-45 rounded bg-black top-4"}
                             style={{right: "-3.3rem", display: inCorrectLetter.length >= 4 ? "block" : "none"}}/>
                        <div className={"absolute h-3 w-1 rotate-45 rounded bg-black top-7 -right-11"}
                             style={{display: inCorrectLetter.length >= 5 ? "block" : "none"}}/>
                        <div className={"absolute h-3 w-1 -rotate-45 rounded bg-black top-7"}
                             style={{right: "-3.3rem", display: inCorrectLetter.length >= 6 ? "block" : "none"}}/>
                    </h1>
                    <div className={"my-4 text-lg score flex justify-between w-full"}>
                        <div className={"flex gap-2 font-bold"}>
                            <p>
                                Incorrect guesses:
                            </p>
                            <p className={"text-red-600 font-bold"}>
                                {inCorrectLetter.length + " "}
                                / 6
                            </p>
                        </div>
                        <div className={"flex gap-2 "}>
                            <p className={"font-bold"}>
                                score:
                            </p>
                            <p>
                                {score}
                            </p>
                        </div>
                    </div>
                    <div className={"flex items-center gap-2"}>
                        {
                            showHint ? (
                                <div className={"flex gap-1"}>
                                    <p className={"text-red-600 font-bold"}>
                                        Hint::
                                    </p>
                                    <p>
                                        {wordToGuess.hint}
                                    </p>
                                </div>
                            ) : (
                                <button className={"h-10 text-white px-4 rounded bg-purple"}
                                        style={{boxShadow: "5px 5px 0 black"}}
                                        onClick={() => {
                                            setShowHint(true)
                                            setScore((pre) => pre - 200)
                                        }}>
                                    Show Hint (-200 pts)
                                </button>
                            )
                        }
                    </div>
                    <div className={"flex flex-wrap gap-4 mt-10 w-full justify-center font-bold text-3xl"}>
                        {word}
                    </div>
                    <div className={"keyboard flex flex-wrap gap-2 mt-12 text-white justify-center"}>
                        {keyboard && keyboard}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Hangman;