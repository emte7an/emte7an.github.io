import React from 'react';
import { Link } from 'react-router-dom';
import useExams from '../hooks/useExams';

const Exams = () => {
  const { exams, loading } = useExams();

  const ExamCard = ({ exam }) => {
    const totalPoints = exam.questions.reduce((sum, q) => sum + (q.points || 1), 0);
    return (
      <Link to={`/exam/${exam.id}`} state={{ exam }} className="bg-white p-6 md:p-8 rounded-xl shadow-lg cursor-pointer flex flex-col justify-between no-underline">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center">{exam.name || `امتحان ${exam.id}`}</h3>
          <p className="text-center text-gray-500 mt-4 text-base md:text-lg">{exam.questions.length} أسئلة</p>
          <p className="text-center text-blue-600 font-bold mt-2 text-base md:text-lg">إجمالي النقاط: {totalPoints}</p>
        </div>
      </Link>
    );
  };

  return (
    <div className="container mx-auto p-4 flex-grow">
      
      <div id="exams-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          null
        ) : exams.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">لا توجد امتحانات متاحة حالياً.</p>
        ) : (
          exams.map(exam => <ExamCard key={exam.id} exam={exam} />)
        )}
      </div>
    </div>
  );
};

export default Exams;
