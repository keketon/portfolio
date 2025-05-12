import { useTr } from '@/i18n/tr';
import React from 'react';

const Home: React.FC = () => {
  const { tr } = useTr();
  return (
    <div className="py-2 px-4">
      <h1 className="text-3xl font-bold text-white mb-6">{tr('Welcome to my Portfolio', 'Home')}</h1>
    </div>
  );
};

export default Home;
