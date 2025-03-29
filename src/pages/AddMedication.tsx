
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import { toast } from 'sonner';

interface Medication {
  id: string;
  name: string;
  frequency: string;
  days: number;
  instructions: string;
}

const AddMedication: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('');
  const [days, setDays] = useState<string>('');
  const [instructions, setInstructions] = useState<string>('');
  const [medications, setMedications] = useState<Medication[]>([]);

  const handleAddMedication = () => {
    // Form validation
    if (!name.trim() || !frequency || !days) {
      toast.error('Please fill all required fields.');
      return;
    }

    if (isNaN(Number(days)) || Number(days) <= 0) {
      toast.error('Days must be a positive number.');
      return;
    }

    const newMedication: Medication = {
      id: Date.now().toString(),
      name: name.trim(),
      frequency,
      days: Number(days),
      instructions: instructions.trim(),
    };

    setMedications([...medications, newMedication]);
    
    // Reset the form
    setName('');
    setFrequency('');
    setDays('');
    setInstructions('');
    
    toast.success('Medication added successfully.');
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

  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
    toast.info('Medication removed.');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-medical-dark-blue mb-8">Add Medication</h1>
        
        {/* Input Section - Horizontal Layout */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Medicine Name*</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter medicine name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="frequency">Dosage Frequency*</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once-daily">Once Daily</SelectItem>
                    <SelectItem value="twice-daily">Twice Daily</SelectItem>
                    <SelectItem value="three-times-daily">Three Times Daily</SelectItem>
                    <SelectItem value="four-times-daily">Four Times Daily</SelectItem>
                    <SelectItem value="as-needed">As Needed</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="days">Total Days*</Label>
                <Input 
                  id="days" 
                  type="number"
                  min="1"
                  value={days} 
                  onChange={(e) => setDays(e.target.value)} 
                  placeholder="Enter number of days"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instructions">Special Instructions</Label>
                <Textarea 
                  id="instructions" 
                  value={instructions} 
                  onChange={(e) => setInstructions(e.target.value)} 
                  placeholder="Enter any special instructions"
                  className="h-24"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button onClick={handleAddMedication} className="bg-medical-blue hover:bg-medical-dark-blue">
                Add Medication
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Medications Display - Vertical Layout */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-medical-dark-blue mb-4">Added Medications</h2>
          
          {medications.length === 0 ? (
            <div className="text-center p-8 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">No medications added yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {medications.map((med) => (
                <Card key={med.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-medical-blue">{med.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Frequency</p>
                            <p className="text-gray-700">
                              {med.frequency === 'once-daily' && 'Once Daily'}
                              {med.frequency === 'twice-daily' && 'Twice Daily'}
                              {med.frequency === 'three-times-daily' && 'Three Times Daily'}
                              {med.frequency === 'four-times-daily' && 'Four Times Daily'}
                              {med.frequency === 'as-needed' && 'As Needed'}
                              {med.frequency === 'weekly' && 'Weekly'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Duration</p>
                            <p className="text-gray-700">{med.days} {med.days === 1 ? 'day' : 'days'}</p>
                          </div>
                          {med.instructions && (
                            <div className="md:col-span-2">
                              <p className="text-sm font-medium text-gray-500">Special Instructions</p>
                              <p className="text-gray-700">{med.instructions}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveMedication(med.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {medications.length > 0 && (
            <div className="mt-8 flex justify-end">
              <Button onClick={handleSubmit} className="bg-medical-dark-blue hover:bg-blue-900 px-8">
                Submit Medications
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMedication;
