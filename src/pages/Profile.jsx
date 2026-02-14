import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import ProfileButton from '../components/ProfileButton';

const Profile = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userRef = doc(db, "users", user.uid);
        setDoc(userRef, { 
            name: user.displayName,
            uid: user.uid
        }, { merge: true });
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error.message);
        // You might want to show an alert to the user here
      });
  };

  const handleSignOut = () => {
    setTimeout(() => {
      signOut(auth).catch((error) => {
        console.error("Sign-Out Error:", error);
      });
    }, 100);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="flex-grow bg-white">
      <div className="pt-16 pb-12 sm:pt-20 sm:pb-14 md:pt-24 md:pb-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-b-[20px]">
        <div className="px-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8 text-right">بروفايل</h1>
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gray-200 flex items-center justify-center ml-4">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 text-right">{user.displayName}</h2>
                  <div className="flex items-center justify-end mt-1">
                    {copied ? (
                      <span className="text-green-500 text-xs">تم النسخ!</span>
                    ) : (
                      <p className="text-[10px] sm:text-xs text-black break-all text-right flex items-center">
                        <button onClick={() => copyToClipboard(user.uid)} className="mr-2 text-black hover:text-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                        {user.uid} :ID
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-white p-8 rounded-2xl shadow-lg inline-block">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">انضم إلينا</h2>
                  <p className="text-gray-600 mb-6">سجل دخولك للمشاركة في الامتحانات وتتبع تقدمك.</p>
                  <button onClick={handleSignIn} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105">
                      <i className="fab fa-google mr-3"></i> تسجيل الدخول باستخدام جوجل
                  </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {user && (
        <div className="p-4">
          <ProfileButton 
            path="/purchase-orders"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>}
            text="طلبات الشراء"
          />
          <ProfileButton 
            path="/contact-us"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500">
                    <path d="M2 5H22V19H2V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 5L12 12L2 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>}
            text="تواصل معنا"
          />
          <ProfileButton
            onClick={handleSignOut}
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                  </svg>}
            text="تسجيل الخروج"
          />
        </div>
      )}
    </div>
  );
};

export default Profile;