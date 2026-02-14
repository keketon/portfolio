import type React from 'react';
import { Button } from './ui/button';

type CustomButtonVariant = 'primary' | 'wrong' | 'plain';

const CustomButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  variant?: CustomButtonVariant;
  className?: string;
}> = ({ onClick, children, variant = 'primary', className }) => {
  const classNameVariant = (() => {
    switch (variant) {
      case 'primary':
        return 'bg-green-500 hover:bg-green-600 hover:text-white';
      case 'wrong':
        return 'bg-red-500 hover:bg-red-600 text-white';
      case 'plain':
      default:
        return '';
    }
  })();
  return (
    <Button className={`mt-8 px-4 py-2 rounded ${classNameVariant} hover:text-white ${className}`} onClick={onClick}>
      {children}
    </Button>
  );
};
export default CustomButton;
