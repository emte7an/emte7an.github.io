import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

const useUserOrders = (userId) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      setOrders([]);
      return;
    }

    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(userOrders);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching real-time orders:", err);
      setError(err);
      setLoading(false);
    });

    // Cleanup the listener when the component unmounts or userId changes
    return () => unsubscribe();

  }, [userId]);

  return { orders, loading, error };
};

export default useUserOrders;