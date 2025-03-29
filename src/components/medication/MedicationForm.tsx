
import React from 'react';
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
import { Pill } from 'lucide-react';
import { toast } from 'sonner';
import { Medication } from '@/types/medication';

interface MedicationFormProps {
  onAddMedication: (medication: Medication) => void;
}

const MedicationForm: React.FC<MedicationFormProps> = ({ onAddMedication }) => {
  const [name, setName] = React.useState<string>('');
  const [frequency, setFrequency] = React.useState<string>('');
  const [days, setDays] = React.useState<string>('');
  const [instructions, setInstructions] = React.useState<string>('');

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

    onAddMedication(newMedication);
    
    // Reset the form
    setName('');
    setFrequency('');
    setDays('');
    setInstructions('');
    
    toast.success('Medication added successfully.');
  };

  return (
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
  );
};

export default MedicationForm;
