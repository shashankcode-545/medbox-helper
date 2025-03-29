
import React, { useState } from 'react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import MedicationForm from '@/components/medication/MedicationForm';
import MedicationList from '@/components/medication/MedicationList';
import { Medication } from '@/types/medication';

const AddMedication: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);

  const handleAddMedication = (newMedication: Medication) => {
    setMedications([...medications, newMedication]);
  };

  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
    toast.info('Medication removed.');
  };

  const handleSubmit = () => {
    if (medications.length === 0) {
      toast.error('Please add at least one medication.');
      return;
    }
    
    // Here we would normally send the data to a backend
    console.log('Submitting medications:', medications);
    toast.success('Medications submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-medical-dark-blue">Add Medication</h1>
          <p className="text-slate-500 mt-2">Enter medication details for the patient's prescription</p>
        </div>
        
        <MedicationForm onAddMedication={handleAddMedication} />
        
        <MedicationList 
          medications={medications}
          onRemoveMedication={handleRemoveMedication}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddMedication;
