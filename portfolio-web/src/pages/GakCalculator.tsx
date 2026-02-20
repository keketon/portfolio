import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CalculatorTab from '@/components/calculator/CalculatorTab';
import { senseConfig } from '@/components/calculator/configs/senseConfig';
import { anomalyConfig } from '@/components/calculator/configs/anomalyConfig';
import { useTr } from '@/i18n/tr';
import React, { useState } from 'react';

type TabValue = 'sense' | 'anomaly';

const GakCalculator: React.FC = () => {
  const { tr } = useTr();
  const [activeTab, setActiveTab] = useState<TabValue>('sense');

  return (
    <div className="py-2 px-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">{tr('Score Calculator', 'ScoreCalculator')}</h1>

      <Tabs defaultValue="sense" className="w-full" onValueChange={value => setActiveTab(value as TabValue)}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="sense">{tr('Sense', 'ScoreCalculator')}</TabsTrigger>
          <TabsTrigger value="anomaly">{tr('Anomaly', 'ScoreCalculator')}</TabsTrigger>
        </TabsList>

        <TabsContent value="sense" forceMount className={activeTab !== 'sense' ? 'hidden' : ''}>
          <CalculatorTab config={senseConfig} />
        </TabsContent>

        <TabsContent value="anomaly" forceMount className={activeTab !== 'anomaly' ? 'hidden' : ''}>
          <CalculatorTab config={anomalyConfig} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GakCalculator;
