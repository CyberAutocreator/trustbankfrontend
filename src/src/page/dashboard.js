import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, setLogLevel } from 'firebase/firestore';

// Global variables must be accessed this way
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};

// Initialize Firebase once
let app, auth;
try {
    if (Object.keys(firebaseConfig).length > 0) {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        setLogLevel('Debug');
    }
} catch (e) {
    console.error("Firebase initialization failed:", e);
}


function Dashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(true);

  // Use useEffect to manage authentication state and redirection
  useEffect(() => {
    if (!auth) {
        console.error("Firebase Auth not initialized.");
        navigate('/login');
        return;
    }

    // Set up the listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUserEmail(user.email || 'User ID: ' + user.uid);
        setIsLoading(false);
      } else {
        // User is signed out. Redirect to login.
        console.log("User signed out or session expired. Redirecting to login.");
        navigate('/login');
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [navigate]); // navigate is stable, but included for completeness

  const handleLogout = async () => {
    try {
        await signOut(auth);
        // The onAuthStateChanged listener above will handle the navigation to /login
    } catch (error) {
        console.error("Logout Error:", error);
        // Fallback redirection in case of error
        navigate('/login');
    }
  };


  if (isLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex items-center text-indigo-600">
                <svg className="animate-spin h-8 w-8 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-xl font-medium">Loading Dashboard...</span>
            </div>
        </div>
    );
  }

  // Dashboard Content
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-indigo-600 p-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white">
            Dashboard
          </h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-150 ease-in-out"
          >
            Sign Out
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500 shadow-inner">
            <p className="text-lg font-medium text-indigo-800">Welcome back!</p>
            <p className="text-sm text-indigo-600 truncate">Authenticated as: <span className="font-mono text-xs text-gray-700">{userEmail}</span></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: User Profile */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                Account Overview
              </h3>
              <p className="text-gray-600">This section is reserved for fetching and displaying user-specific financial data, transactions, and profile settings using Firestore.</p>
              <button className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium">View Profile Details &rarr;</button>
              <p className="mt-2 text-xs text-red-500">Note: User ID must be displayed for multi-user apps: {auth?.currentUser?.uid || 'Not available'}</p>
            </div>
            
            {/* Card 2: Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                Quick Transactions
              </h3>
              <p className="text-gray-600">Placeholder for features like transferring funds, paying bills, or viewing recent activity feeds.</p>
              <div className="mt-4 flex space-x-3">
                <button className="text-sm px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition">Transfer</button>
                <button className="text-sm px-3 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition">Pay Bill</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

