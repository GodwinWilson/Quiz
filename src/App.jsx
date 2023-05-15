import React, { useState } from "react";
import { quiz } from "./data/Questions";
//import { shuffle } from "lodash/shuffle";

function App() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState({
    score: 0,
    correctAnswer: 0,
    wrongAnswer: 0,
  });

  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const { questions } = quiz;

  //const shuffledQuestions = shuffle(quiz)
  const { question, choices, correctAnswer } = questions[activeQuestion];

  const onNext = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 10,
            correctAnswer: prev.correctAnswer + 1,
          }
        : { ...prev, wrongAnswer: prev.wrongAnswer + 1 }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
    <>
      <main className="bg-slate-200 p-2 max-w-lg flex flex-col rounded-md">
        {!showResult ? (
          <section className="bg-slate-200 p-2 max-w-lg flex items-start justify-center flex-col">
            <div className="text-lg">
              <span>{addLeadingZero(activeQuestion + 1)}</span>
              <span>/{addLeadingZero(questions.length)}</span>
            </div>
            <h2 className="font-bold text-lg">{question}</h2>
            <ul className="flex flex-col w-full space-y-3">
              {choices.map((choice, index) => (
                <li
                  onClick={() => onAnswerSelected(choice, index)}
                  key={choice}
                  className={
                    selectedAnswerIndex === index ? "selected-answer" : null
                  }
                >
                  {choice}
                </li>
              ))}
            </ul>
            <div className="flex items-end justify-end w-full mt-1">
              <button
                onClick={onNext}
                disabled={selectedAnswerIndex === null}
                className="bg-gradient-to-r from-sky-700 to-indigo-500 text-white px-10 py-2 rounded-lg cursor-pointer"
              >
                {activeQuestion == questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </section>
        ) : (
          <div className="bg-slate-200 min-w-max space-y-4 py-4 px-10">
            <h3 className="font-extrabold text-2xl">Result</h3>
            <p className="text-lg font-bold">
              Total Questions :{" "}
              <span className="font-extrabold text-xl">{questions.length}</span>
            </p>
            <p className="text-lg font-bold">
              Total Score:{" "}
              <span className="font-extrabold text-xl">{result.score}</span>
            </p>
            <p className="text-lg font-bold">
              Correct Answers:{" "}
              <span className="font-extrabold text-xl">{result.correctAnswer}</span>
            </p>
            <p className="text-lg font-bold">
              Wrong Answers:{" "}
              <span className="font-extrabold text-xl">{result.wrongAnswer}</span>
            </p>
            <button className="bg-gradient-to-r from-sky-700 to-indigo-500 text-white px-10 py-2 rounded-lg cursor-pointer" 
            onClick={() => window.location.reload()}>
              Restart
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
