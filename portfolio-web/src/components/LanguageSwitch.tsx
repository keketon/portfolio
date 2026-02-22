import React from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useSearchParams from '@/hooks/useSearchParams';
import { languages } from '@/i18n/tr';

const items: Record<string, string> = Object.fromEntries(languages.map(lang => [lang.code, lang.nativeName]));

const LanguageSwitch: React.FC = () => {
  const { searchParam, setSearchParams } = useSearchParams();
  const hlParam = searchParam('hl');
  const lang = !hlParam ? 'ja' : hlParam;

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
