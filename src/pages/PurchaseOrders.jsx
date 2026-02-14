import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useUserOrders from '../hooks/useUserOrders';
import { useTopBar } from '../context/TopBarContext';

// This is the 3-dot menu component, extracted for clarity
const FilterMenu = ({ onFilterChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleSelect = (status) => {
    onFilterChange(status);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
        </svg>
      </button>
      {isMenuOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20">
          <button onClick={() => handleSelect('all')} className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">الكل</button>
          <button onClick={() => handleSelect('pending')} className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">قيد المراجعة</button>
          <button onClick={() => handleSelect('completed')} className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">مكتمل</button>
          <button onClick={() => handleSelect('rejected')} className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">مرفوض</button>
        </div>
      )}
    </div>
  );
};

const getStatusComponent = (status) => {
  const statusMap = {
    completed: { text: 'مكتمل', className: 'bg-green-200 text-green-800' },
    rejected: { text: 'مرفوض', className: 'bg-red-200 text-red-800' },
    pending: { text: 'قيد المراجعة', className: 'bg-yellow-200 text-yellow-800' },
  };
  
  const currentStatus = statusMap[status] || statusMap.pending;

  return (
    <span className={`px-2 py-1 text-sm rounded-full ${currentStatus.className}`}>
      {currentStatus.text}
    </span>
  );
};

const PurchaseOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { orders, loading, error } = useUserOrders(user?.uid);
  const [activeFilter, setActiveFilter] = useState('all');
  const { setTitle, setLeftContent, setRightContent } = useTopBar();

  // Set the header content when this page mounts
  useEffect(() => {
    const BackArrow = () => (
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    );

    setTitle('طلبات الشراء');
    setLeftContent(<BackArrow />);
    setRightContent(<FilterMenu onFilterChange={setActiveFilter} />);

    // Cleanup function to reset header when component unmounts
    return () => {
      setTitle('');
      setLeftContent(null);
      setRightContent(null);
    };
  }, [setTitle, setLeftContent, setRightContent, navigate]);

  const filteredOrders = useMemo(() => {
    if (activeFilter === 'all') {
      return orders;
    }
    // Treat undefined or null status as 'pending' for filtering purposes
    if (activeFilter === 'pending') {
        return orders.filter(order => !order.status || order.status === 'pending');
    }
    return orders.filter(order => order.status === activeFilter);
  }, [orders, activeFilter]);

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div dir="rtl">
        {filteredOrders.length === 0 ? (
          <p className="text-right text-gray-500 mt-4">لا توجد طلبات شراء لهذه الحالة.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map(order => (
              <div key={order.id} className="bg-white border rounded-lg shadow-md p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-bold">{order.productName}</h2>
                    {getStatusComponent(order.status)}
                  </div>
                  <p className="text-gray-600">{order.productPrice} نقطة</p>
                  <p className="text-sm text-gray-500 mt-2">رقم الطلب: <span className="font-mono">{order.id}</span></p>
                </div>
                <div className="border-t mt-4 pt-4">
                  <p className="text-sm"><strong>معلومات التواصل:</strong> {order.contactMethod} - {order.phoneNumber}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    تاريخ الطلب: {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString('ar-EG') : 'غير محدد'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default PurchaseOrders;