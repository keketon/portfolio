import React from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type SupportedLanguageType } from '@/i18n/translations';
import useSearchParams from '@/hooks/useSearchParams';

const items: Record<SupportedLanguageType, string> = { ja: '日本語', en: 'English' };

const LanguageSwitch: React.FC = () => {
  const { searchParam, setSearchParams } = useSearchParams();
  const hlParam = searchParam('hl');
  const lang = !hlParam ? 'ja' : (hlParam as SupportedLanguageType);

  return (
    <Select
      onValueChange={value => {
        console.log('Selected language:', value);
        setSearchParams({ hl: value });
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={items[lang]} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(items).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
export default LanguageSwitch;
