import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, addDoc, serverTimestamp, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import useUserPoints from '../hooks/useUserPoints';
import PurchaseModal from '../components/PurchaseModal';

const Store = () => {
  const { user } = useAuth();
  const { points, loading: pointsLoading } = useUserPoints();
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const productsRef = collection(db, "products");
    const q = query(productsRef, orderBy('createdAt', 'desc')); // Sort by createdAt in descending order
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
      setProductsLoading(false);
    }, (error) => {
      console.error("Error fetching products:", error);
      setProductsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleProductClick = (product) => {
    if (product.quantity <= 0) {
      alert("نفدت الكمية من هذا المنتج.");
      return;
    }
    if (points < product.price) {
      alert("ليس لديك نقاط كافية");
    } else {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handlePurchaseSubmit = async (formData) => {
    if (!user || !selectedProduct) return;

    try {
      // Create the order
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        userEmail: user.email,
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        productPrice: selectedProduct.price,
        contactMethod: formData.contactMethod,
        phoneNumber: formData.phoneNumber,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      // Decrement product quantity (if it's not managed by an admin accept)
      const productRef = doc(db, "products", selectedProduct.id);
      await updateDoc(productRef, {
        quantity: selectedProduct.quantity - 1
      });


      alert("تم إرسال طلبك بنجاح!");
    } catch (error) {
      console.error("Error creating order or updating quantity:", error);
      alert("حدث خطأ أثناء إرسال طلبك.");
    } finally {
      handleCloseModal();
    }
  };
  
  const loading = pointsLoading || productsLoading;

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex-grow flex justify-center items-center">
        <div className="spinner"></div>
      </div>
    );
  }

    return (
    <div className="container mx-auto p-4 flex-grow">
      {!user && ( // Display message if not logged in
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-6" role="alert">
          <p className="font-bold">ملاحظة:</p>
          <p>لن تتمكن من الشراء الا عند تسجيل الدخول من صفحة البروفايل.</p>
        </div>
      )}
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {products.map(product => (
          <div 
            key={product.id} 
            className={`bg-white rounded-lg shadow-md p-4 transition-transform 
                        ${!user ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer hover:scale-105'}`} // Dim, disable cursor, and prevent clicks if not logged in
            onClick={() => handleProductClick(product)}
          >
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="text-gray-700 text-lg mb-2">{product.price} نقطة</p>
            {product.quantity > 0 ? (
              <p className="text-gray-500 text-sm">الكمية المتاحة: {product.quantity}</p>
            ) : (
              <p className="text-red-500 font-bold text-sm">نفدت الكمية</p>
            )}
          </div>
        ))}
      </div>

      {/* Purchase Modal */}
      {selectedProduct && (
        <PurchaseModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
          onSubmit={handlePurchaseSubmit}
        />
      )}
    </div>
  );
};

export default Store;
