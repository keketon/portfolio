import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getOrRegisterUserId(): string {
  const userId = localStorage.getItem('userId');
  if (userId) {
    return userId;
  }

  const newUserId = uuidv4();
  localStorage.setItem('userId', newUserId);
  return newUserId;
}
