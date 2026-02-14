import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const useExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 500); // Only show loader if loading takes more than 500ms

    const examsCollection = collection(db, 'exams');
    const q = query(examsCollection, orderBy('createdAt', 'desc')); // Assuming exams have a createdAt field

    const unsubscribe = onSnapshot(q, (snapshot) => {
      clearTimeout(timer); // Clear timer if data loads quickly
      const examsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setExams(examsData);
      setLoading(false);
    }, (error) => {
      clearTimeout(timer); // Also clear on error
      console.error("Error fetching exams:", error);
      setLoading(false);
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  return { exams, loading };
};

export default useExams;
