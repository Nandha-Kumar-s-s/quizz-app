import { useState } from "react";
import './result.scss'
// create a Result component
// passing the array parameter from the parent component
const Result =  (props) =>{
  // using the useState hooks for managing the state
    const [currentQuestion , setCurrentQuestion] = useState(0)

  // once the finish state is to true it move to the greeting page
    const [finish, setFinish] = useState(false)

  // once the finish button is clicked it remove the all button from the component
    const [buttonVisible, setButtonVisible] = useState(true);

    const handleButtonClick = () => {
      setButtonVisible(false);
      console.log("hi");
    };

  // object destructuring from the props
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

    // this handlePrevAns() is used to handle the preview answer intially the currentQuestion value is zero
    const handlePrevAns = () =>{
        setCurrentQuestion(currentQuestion -1);
    }

    // this handleNextAns() is used to handle the preview answer intially the currentQuestion value is zero
    const handleNextAns = () =>{
        setCurrentQuestion(currentQuestion + 1);
    }
    // handleFinish() is used to finish the entire quizz app
    const handleFinish = () =>{
        setFinish(true);
    }

   // create a renderResult function to display the question obj 
    const renderResult = () =>{
      // assign the currentQuestion value to the question
        const question = userAnswer[currentQuestion];
      
        const selected = userAnswer[currentQuestion];

      // assign the user selected value in the Answer for the currentQuestion 
        const Answer = selected?.isSelected;
        
      // assign the isCorrectAnswer to the Answer value only the answer keyword is relevant to that
        const isCorrectAnswer = Answer === question?.answer;
    
        return(
            <>
        {/* Render the result data */}
        {!finish ? (
          <div className="res-main">
            <div className="res-container">
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

   // calling the renderResult() in the main parent result component 
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