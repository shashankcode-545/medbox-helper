
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, you would handle actual logout logic here
    console.log('User logged out');
    
    // Redirect to home after a brief delay
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Logging out...</h1>
        <p className="text-gray-600">You will be redirected shortly.</p>
      </div>
    </div>
  );
};

export default Logout;
