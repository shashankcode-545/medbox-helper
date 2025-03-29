
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Clock, Calendar, Trash2, CheckCircle2, Pill } from 'lucide-react';
import { Medication, getFrequencyText } from '@/types/medication';

interface MedicationListProps {
  medications: Medication[];
  onRemoveMedication: (id: string) => void;
  onSubmit: () => void;
}

const MedicationList: React.FC<MedicationListProps> = ({ 
  medications, 
  onRemoveMedication,
  onSubmit 
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-medical-dark-blue flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Added Medications
        </h2>
        {medications.length > 0 && (
          <div className="bg-medical-light-blue text-medical-dark-blue px-3 py-1 rounded-full text-sm font-medium">
            {medications.length} {medications.length === 1 ? 'medication' : 'medications'} added
          </div>
        )}
      </div>
      
      <Separator className="bg-slate-200" />
      
      {medications.length === 0 ? (
        <EmptyMedicationState />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {medications.map((med) => (
            <MedicationCard 
              key={med.id} 
              medication={med} 
              onRemove={onRemoveMedication} 
            />
          ))}
        </div>
      )}
      
      {medications.length > 0 && (
        <div className="mt-8 flex justify-end">
          <Button 
            onClick={onSubmit} 
            className="bg-medical-dark-blue hover:bg-blue-900 text-white px-8 shadow-sm"
          >
            Submit Medications
          </Button>
        </div>
      )}
    </div>
  );
};

const EmptyMedicationState: React.FC = () => (
  <div className="text-center p-8 bg-white rounded-lg border border-slate-200 shadow-sm">
    <div className="flex flex-col items-center justify-center text-slate-400">
      <Pill className="h-12 w-12 mb-3 text-slate-300" />
      <p className="text-lg font-medium">No medications added yet</p>
      <p className="text-sm mt-1">Add a new medication using the form above</p>
    </div>
  </div>
);

interface MedicationCardProps {
  medication: Medication;
  onRemove: (id: string) => void;
}

const MedicationCard: React.FC<MedicationCardProps> = ({ medication, onRemove }) => (
  <Card className="overflow-hidden border-l-4 border-l-medical-blue hover:shadow-md transition-shadow duration-200">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-medical-dark-blue">{medication.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            <div className="flex items-center text-slate-700">
              <Clock className="h-4 w-4 mr-2 text-medical-blue" />
              <div>
                <p className="text-sm font-medium text-slate-500">Frequency</p>
                <p className="font-medium">{getFrequencyText(medication.frequency)}</p>
              </div>
            </div>
            <div className="flex items-center text-slate-700">
              <Calendar className="h-4 w-4 mr-2 text-medical-blue" />
              <div>
                <p className="text-sm font-medium text-slate-500">Duration</p>
                <p className="font-medium">{medication.days} {medication.days === 1 ? 'day' : 'days'}</p>
              </div>
            </div>
            {medication.instructions && (
              <div className="md:col-span-1 flex items-start text-slate-700">
                <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-medical-blue" />
                <div>
                  <p className="text-sm font-medium text-slate-500">Instructions</p>
                  <p className="font-medium">{medication.instructions}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => onRemove(medication.id)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="ml-1 hidden sm:inline">Remove</span>
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default MedicationList;
