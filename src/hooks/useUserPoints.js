import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from './useAuth';

const useUserPoints = () => {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        setLoading(true);
      }, 500); // Only show loader if loading takes more than 500ms

      const userRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(userRef, (doc) => {
        clearTimeout(timer); // Clear timer if data loads quickly
        if (doc.exists()) {
          setPoints(doc.data().points || 0);
        } else {
          setPoints(0);
        }
        setLoading(false);
      }, (error) => {
        clearTimeout(timer); // Also clear on error
        console.error("Error fetching user points:", error);
        setLoading(false);
      });

      return () => {
        clearTimeout(timer);
        unsubscribe();
      };
    } else {
      setPoints(0);
      setLoading(false);
    }
  }, [user]);

  return { points, loading };
};

export default useUserPoints;
