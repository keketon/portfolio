import React from 'react';
import { cn } from '@/lib/utils';

const TextLink: React.FC<{
  href: string;
  children: React.ReactNode;
  className?: string;
}> = ({ href, children, className }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('text-blue-300 hover:text-blue-500 font-bold underline', className)}
    >
      {children}
    </a>
  );
};

export default TextLink;
