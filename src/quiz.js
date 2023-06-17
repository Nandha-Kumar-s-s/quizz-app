import React, { useState, useEffect } from 'react';
import './App.css';
import Result from './result';
import './quiz.scss';
import {AiOutlineFieldTime} from 'react-icons/ai'


const Quiz1 = () => {
  const questionsData = [
    {
      id: 1,
      question: 'What is the capital of France?',
      options: ['London', 'Paris', 'Rome'],
      answer: 'Paris',
    },
    {
      id: 2,
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter'],
      answer: 'Mars',
    },
    {
      id: 3,
      question: 'Which is the largest ocean in the world?',
      options: ['Indian Ocean', 'Pacific Ocean', 'Atlantic Ocean'],
      answer: 'Pacific Ocean',
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState(questionsData);
  const [userData, setUserData] = useState(questionsData.map((question) => ({ ...question, isSelected: 'not selected' })));
  const [showResults, setShowResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const [viewRes, setViewRes] = useState(false);

  const viewResult = () =>{
    setViewRes(true);
  }
  const handleOptionChange = (event) => {
    const updatedUserData = [...userData];
    updatedUserData[currentQuestion].isSelected = event.target.value;
    setUserData(updatedUserData);
  };

  const prevQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    calculateScore();
    setShowResults(true);
  };

  const calculateScore = () => {
    let score = 0;
    userData.forEach((question) => {
      if (question.isSelected === question.answer) {
        score++;
      }
    });
    setQuizScore(score);
  };

  useEffect(() => {
    let interval;

    if (timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      handleSubmit(); // Automatically submit when time runs out
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeRemaining]);

  let divisor_for_minutes = timeRemaining % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);
  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  return (

    <>
    {!viewRes ? (
      <div>
      
      {!showResults ? (
        <form onSubmit={handleSubmit}>
          <div className='ques-main'>
            <div className='ques-container'>
            <h1 className='head'>RPA QUIZZ COMPETITION</h1>
            
            <h4 className='time'><AiOutlineFieldTime/>  {minutes} : {seconds} sec</h4>
          <h4>{questionsData[currentQuestion].id}.{questions[currentQuestion].question}</h4>
          {questions[currentQuestion].options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`q${currentQuestion}-${index}`}
                name={`q${currentQuestion}`}
                value={option}
                checked={userData[currentQuestion].isSelected === option}
                onChange={handleOptionChange}
              />
              <label htmlFor={`q${currentQuestion}-${index}`}>{option}</label>
            </div>
          ))}
            </div>
          </div>
          
          <br />
          <div className="btn-container">
            <div className='btn'>

          {currentQuestion > 0 && <div type="button" onClick={prevQuestion} className='prev'>Previous</div>}
          {currentQuestion < questions.length - 1 && <div type="button" onClick={nextQuestion} className='next'>Next</div>}
          {currentQuestion === questions.length - 1 && <div type="submit" className='submit' onClick={handleSubmit}>Submit</div>}
            </div>
          </div>
          
          
        </form>
      ) : (
        <div className='score-main'>
          <div className='score-container'>

          <h1>Congratuluations you completed your test</h1>
          <h3 className='score'>You Scored: {quizScore} Out of {questions.length} questions</h3>
          <div className='btn-container'>
            <div className='btn'>
              <div onClick={viewResult} className='show'>SHOW RESLUT</div>

            </div>

          </div>
          </div>
        </div>

      )
      }
      
    </div>
    ) : (
      <div>
      {viewRes && (<Result userAnswer = {userData}/>)}
    </div>
    )}
    
    
    </>
    
  );
  
};

export default Quiz1;