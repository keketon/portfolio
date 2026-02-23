import { Button } from '@/components/ui/button';
import { useTr } from '@/i18n/tr';
import useSearchParams from '@/hooks/useSearchParams';
import { CloudAlert, MoveRight } from 'lucide-react';
import React from 'react';
import { useRouteError } from 'react-router-dom';

const RoutingErrorPage: React.FC = () => {
  const error = useRouteError();
  if (error) {
    console.error(error);
  }

  const { tr } = useTr();
  const { searchParam } = useSearchParams();
  const currentLang = searchParam('hl');
  const langParam = currentLang ? `?hl=${currentLang}` : '';

  return (
    <div className="flex flex-col h-full w-full items-center justify-center pb-10">
      <CloudAlert className="w-24 h-24 m-2 text-red-500" />
      <h2 className="text-3xl font-bold text-center">{tr("The page you want doesn't exist")}</h2>
      <Button variant="link" className="mt-2">
        <a
          href={`/${langParam}`}
          className="flex items-end text-xl font-bold text-center underline hover:text-blue-300"
        >
          {tr('Go back to home')}
          <MoveRight className="ml-1 size-6" />
        </a>
      </Button>
    </div>
  );
};

export default RoutingErrorPage;
