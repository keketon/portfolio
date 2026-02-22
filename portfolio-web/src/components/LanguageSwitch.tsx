import React from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type SupportedLanguageType } from '@/i18n/tr';
import useSearchParams from '@/hooks/useSearchParams';

const items: Record<SupportedLanguageType, string> = { ja: '日本語', en: 'English' };

const LanguageSwitch: React.FC = () => {
  const { searchParam, setSearchParams } = useSearchParams();
  const hlParam = searchParam('hl');
  const lang = !hlParam ? 'ja' : (hlParam as SupportedLanguageType);

  return (
    <Select
      onValueChange={value => {
        document.getElementsByTagName('html')[0].lang = value;
        setSearchParams({ hl: value });
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={items[lang]} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem key={lang} value={lang}>
          {items[lang]}
        </SelectItem>
        {Object.entries(items)
          .filter(([value]) => value !== lang)
          .map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
export default LanguageSwitch;
