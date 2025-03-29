
export interface Medication {
  id: string;
  name: string;
  frequency: string;
  days: number;
  instructions: string;
}

export const frequencyOptions = {
  'once-daily': 'Once Daily',
  'twice-daily': 'Twice Daily',
  'three-times-daily': 'Three Times Daily',
  'four-times-daily': 'Four Times Daily',
  'as-needed': 'As Needed',
  'weekly': 'Weekly',
};

export const getFrequencyText = (freq: string): string => {
  return frequencyOptions[freq as keyof typeof frequencyOptions] || freq;
};
