
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-medical-dark-blue mb-6">Doctor Dashboard</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/add-medication">
              <Button className="w-full bg-medical-blue hover:bg-medical-dark-blue h-24 text-lg">
                Add Medication
              </Button>
            </Link>
            
            <Button className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 h-24 text-lg">
              View Patient Records
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
