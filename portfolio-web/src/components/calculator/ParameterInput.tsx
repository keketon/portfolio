import { Input } from '@/components/ui/input';
import React from 'react';

interface ParameterInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const ParameterInput: React.FC<ParameterInputProps> = ({ id, label, value, onChange, placeholder }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-white">
        {label}
      </label>
      <Input
        id={id}
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full"
      />
    </div>
  );
};

export default ParameterInput;
