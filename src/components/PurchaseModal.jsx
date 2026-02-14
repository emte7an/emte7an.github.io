import React, { useState } from 'react';

const PurchaseModal = ({ isOpen, onClose, product, onSubmit }) => {
  const [contactMethod, setContactMethod] = useState('whatsapp');
  const [phoneNumber, setPhoneNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      alert('يرجى إدخال رقم الهاتف');
      return;
    }
    onSubmit({ contactMethod, phoneNumber });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-4 text-right">شراء {product.name}</h2>
        <p className="mb-6 text-right">سعر المنتج: {product.price} نقاط</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-right mb-2 font-bold">طريقة التواصل</label>
            <div className="flex justify-end gap-4">
              <label className="flex items-center gap-2">
                <span>Telegram</span>
                <input
                  type="radio"
                  name="contactMethod"
                  value="telegram"
                  checked={contactMethod === 'telegram'}
                  onChange={(e) => setContactMethod(e.target.value)}
                  className="form-radio"
                />
              </label>
              <label className="flex items-center gap-2">
                <span>WhatsApp</span>
                <input
                  type="radio"
                  name="contactMethod"
                  value="whatsapp"
                  checked={contactMethod === 'whatsapp'}
                  onChange={(e) => setContactMethod(e.target.value)}
                  className="form-radio"
                />
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="phoneNumber" className="block text-right mb-2 font-bold">رقم الهاتف</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-right"
              placeholder="مثال: 966512345678+"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg">إلغاء</button>
            <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">إرسال الطلب</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseModal;