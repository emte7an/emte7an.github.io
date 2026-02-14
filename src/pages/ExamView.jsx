import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const ExamView = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the exam data passed from the Link component state
  const { exam } = location.state || {};

  // Initialize state directly from the passed exam object
  const [userAnswers, setUserAnswers] = useState(() => exam ? new Array(exam.questions.length).fill(null) : []);
  const [timeLeft, setTimeLeft] = useState(() => exam ? (exam.duration || 30) * 60 : 0);
  const [showWarning, setShowWarning] = useState(false);

  const proceedToSubmit = () => {
    navigate(`/results/${examId}`, { state: { userAnswers, exam } });
  };

  useEffect(() => {
    if (timeLeft === 0 && exam) {
      proceedToSubmit();
    }
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleAnswerChange = (questionIndex, option) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = option;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const allAnswered = userAnswers.every(answer => answer !== null);
    if (allAnswered) {
      proceedToSubmit();
    } else {
      setShowWarning(true);
    }
  };

  if (!exam) {
    return <div>Exam not found. Please go back and try again.</div>;
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="py-4 flex-grow">
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center w-11/12 md:w-auto">
            <h3 className="text-xl font-bold mb-4">تحذير</h3>
            <p className="mb-6">لم تقم بالإجابة على جميع الأسئلة. هل أنت متأكد أنك تريد تسليم الامتحان؟</p>
            <div className="flex justify-center space-x-4 space-x-reverse">
              <button onClick={proceedToSubmit} className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg">نعم، قم بالتسليم</button>
              <button onClick={() => setShowWarning(false)} className="bg-gray-500 text-white font-bold py-2 px-6 rounded-lg">لا، ارجع للأسئلة</button>
            </div>
          </div>
        </div>
      )}
      <div id="exam-timer" className="fixed top-4 left-4 bg-red-500 text-white p-2 rounded-lg shadow-lg">
        {formatTime(timeLeft)}
      </div>
      <h2 id="exam-title" className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6">{exam.name}</h2>
      <div id="questions-container" className="space-y-8">
        {exam.questions.map((question, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-md relative w-full md:h-[80vh]">
            <div className="question-number-box">
              <span>{index + 1}</span>
            </div>
            <div className="question-points-box">
              <span>{question.points || 1} نقطة</span>
            </div>
            <p className="text-lg md:text-3xl text-gray-800 mb-4 break-words pt-16">{question.text}</p>
            <div className="space-y-3 md:space-y-8">
              {question.options.map((option, optIndex) => {
                const optionText = typeof option === 'string' ? option : option.text;
                const optionId = `option-${index}-${optIndex}`;
                return (
                  <div key={optIndex} className="custom-radio p-2 rounded-lg">
                    <input
                      type="radio"
                      id={optionId}
                      name={`question-${index}`}
                      value={optionText}
                      onChange={() => handleAnswerChange(index, optionText)}
                      className="form-radio"
                    />
                    <label htmlFor={optionId} className="text-gray-700 text-base md:text-2xl">{optionText}</label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button onClick={handleSubmit} className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform">
          تسليم
        </button>
      </div>
    </div>
  );
};

export default ExamView;