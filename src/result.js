import { useState } from "react";
import './result.scss'
const Result =  (props) =>{
    const [currentQuestion , setCurrentQuestion] = useState(0)
    const [finish, setFinish] = useState(false)

    const [buttonVisible, setButtonVisible] = useState(true);

    const handleButtonClick = () => {
      setButtonVisible(false);
      console.log("hi");
    };

    const {userAnswer} = props;

 /*   const userAnswer = [
        {
            id: 1,
            question: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin','russia'],
            answer: 'Paris',
            isselected: 'London',
          
          },
          {
            id: 2,
            question: 'Which planet is known as the Red Planet?',
            options: ['Mars', 'Venus', 'Jupiter','earth'],
            answer: 'Mars',
            isselected: 'Mars',
          },
          {
            id: 3,
            question: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Madrid'],
            answer: 'Paris',
            isselected: 'Madrid'
          },
          {
            id: 4,
            question: 'Who painted the Mona Lisa?',
            options: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
            answer: 'Leonardo da Vinci',
            isselected:'Leonardo da Vinci'

          },
    ]
*/
    const handlePrevAns = () =>{
        setCurrentQuestion(currentQuestion -1);
    }
    const handleNextAns = () =>{
        setCurrentQuestion(currentQuestion + 1);
    }

    const handleFinish = () =>{
        setFinish(true);
    }

    const renderResult = () =>{
        const question = userAnswer[currentQuestion];
        const selected = userAnswer[currentQuestion];
        const Answer = selected?.isSelected;
        const isCorrectAnswer = Answer === question?.answer;
    
        return(
            <>
        {!finish ? (
          <div className="main">
            <div className="container">
            <h3 className="head">Quiz Result</h3>
            <div>
              <h4>{question?.id}. {question?.question}</h4>
              <ul>
                {question?.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <label style={{ color: question.answer === option ? 'green' : Answer === option ? 'red' : 'black' }}>
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <p className="answer">
              Your Answer: <span style={{ color: isCorrectAnswer ? 'lime' : 'red' }}>{Answer}</span>
            </p>
          </div>

          </div>
            
        ):(
            <h1>Thanks for participating the quizz.......</h1>
        )}  
            </>
        )
    }

    
    return (
        <>
        <div>
          {renderResult()}
          <div className="btn-container">
            {buttonVisible && (

            <div className="btn">
        {currentQuestion > 0 && <div type="button" onClick={handlePrevAns} className="prev">PREVIEW</div>}
             {
                 currentQuestion === userAnswer.length - 1 ? (             
                     <div onClick={() => {handleFinish(); handleButtonClick();}} className="finish">FINISH QUIZZ</div>
                 ) : (
                     <div onClick={handleNextAns} className="next">NEXT</div>
                 )
             }  
            </div>              
            )
            }
          </div>
        </div>  
    
        </>
    
    )

}



export default Result;