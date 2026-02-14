import React from 'react';
import toast from 'react-hot-toast';
import useSubjects from '../hooks/useSubjects';

const Evaluations = () => {
  const { subjects, loading: subjectsLoading } = useSubjects();

  const handleDownloadClick = () => {
    toast.success('جاري التنزيل...', {
      style: {
        border: '1px solid #007bff',
        padding: '16px',
        color: '#007bff',
        background: '#fff',
      },
      iconTheme: {
        primary: '#007bff',
        secondary: '#fff',
      },
    });
  };





  return (
    <div className="container mx-auto p-4 flex-grow">
      
      <div id="subjects-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">لا توجد مواد متاحة.</p>
        ) : (
          subjects.map((item, index) => (
            <a 
              key={index} 
              href={item.link || '#'} 
              download={item.name} 
              rel="noopener noreferrer" 
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center space-y-4 cursor-pointer no-underline"
              onClick={handleDownloadClick}
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center">{item.name}</h3>
              <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 space-x-reverse">
                <i className="fas fa-download"></i>
                <span>تنزيل</span>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default Evaluations;