
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-md px-4">
        <h1 className="text-4xl font-bold mb-6 text-medical-dark-blue">MedBox Helper</h1>
        <p className="text-xl text-gray-600 mb-8">A modern solution for managing patient medications</p>
        
        <div className="space-y-4">
          <Link to="/dashboard">
            <Button className="w-full bg-medical-blue hover:bg-medical-dark-blue h-12 text-lg">
              Go to Doctor Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
