
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Pill, Clock, Calendar, Trash2, CheckCircle2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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

  const getFrequencyText = (freq: string) => {
    const frequencyMap: Record<string, string> = {
      'once-daily': 'Once Daily',
      'twice-daily': 'Twice Daily',
      'three-times-daily': 'Three Times Daily',
      'four-times-daily': 'Four Times Daily',
      'as-needed': 'As Needed',
      'weekly': 'Weekly',
    };
    return frequencyMap[freq] || freq;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-medical-dark-blue">Add Medication</h1>
          <p className="text-slate-500 mt-2">Enter medication details for the patient's prescription</p>
        </div>
        
        {/* Input Section - Card with improved styling */}
        <Card className="mb-8 shadow-sm border-medical-light-blue">
          <CardHeader className="bg-gradient-to-r from-medical-light-blue to-slate-50 pb-2">
            <CardTitle className="text-xl text-medical-dark-blue flex items-center">
              <Pill className="mr-2 h-5 w-5" />
              New Medication Entry
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-medical-dark-blue">Medicine Name*</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter medicine name"
                  className="border-slate-300 focus:border-medical-blue focus:ring-medical-light-blue"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="frequency" className="text-medical-dark-blue">Dosage Frequency*</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger id="frequency" className="border-slate-300 focus:border-medical-blue">
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
                <Label htmlFor="days" className="text-medical-dark-blue">Total Days*</Label>
                <Input 
                  id="days" 
                  type="number"
                  min="1"
                  value={days} 
                  onChange={(e) => setDays(e.target.value)} 
                  placeholder="Enter number of days"
                  className="border-slate-300 focus:border-medical-blue focus:ring-medical-light-blue"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instructions" className="text-medical-dark-blue">Special Instructions</Label>
                <Textarea 
                  id="instructions" 
                  value={instructions} 
                  onChange={(e) => setInstructions(e.target.value)} 
                  placeholder="Enter any special instructions"
                  className="h-24 border-slate-300 focus:border-medical-blue focus:ring-medical-light-blue"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={handleAddMedication} 
                className="bg-medical-blue hover:bg-medical-dark-blue text-white shadow-sm"
              >
                <Pill className="mr-2 h-4 w-4" />
                Add Medication
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Medications Display - Improved card design */}
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
            <div className="text-center p-8 bg-white rounded-lg border border-slate-200 shadow-sm">
              <div className="flex flex-col items-center justify-center text-slate-400">
                <Pill className="h-12 w-12 mb-3 text-slate-300" />
                <p className="text-lg font-medium">No medications added yet</p>
                <p className="text-sm mt-1">Add a new medication using the form above</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {medications.map((med) => (
                <Card key={med.id} className="overflow-hidden border-l-4 border-l-medical-blue hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-medical-dark-blue">{med.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                          <div className="flex items-center text-slate-700">
                            <Clock className="h-4 w-4 mr-2 text-medical-blue" />
                            <div>
                              <p className="text-sm font-medium text-slate-500">Frequency</p>
                              <p className="font-medium">{getFrequencyText(med.frequency)}</p>
                            </div>
                          </div>
                          <div className="flex items-center text-slate-700">
                            <Calendar className="h-4 w-4 mr-2 text-medical-blue" />
                            <div>
                              <p className="text-sm font-medium text-slate-500">Duration</p>
                              <p className="font-medium">{med.days} {med.days === 1 ? 'day' : 'days'}</p>
                            </div>
                          </div>
                          {med.instructions && (
                            <div className="md:col-span-1 flex items-start text-slate-700">
                              <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-medical-blue" />
                              <div>
                                <p className="text-sm font-medium text-slate-500">Instructions</p>
                                <p className="font-medium">{med.instructions}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveMedication(med.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="ml-1 hidden sm:inline">Remove</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {medications.length > 0 && (
            <div className="mt-8 flex justify-end">
              <Button 
                onClick={handleSubmit} 
                className="bg-medical-dark-blue hover:bg-blue-900 text-white px-8 shadow-sm"
              >
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
