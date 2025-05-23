import { I18nProvider } from '@react-aria/i18n';
import type { ReactNode } from 'react';

interface FormProps {
  onSubmit: () => void;
  children: ReactNode;
}

export const FormWrapper = ({ onSubmit, children }: FormProps) => {
  return (
    <form
      className="flex flex-col gap-y-4 p-4 container max-w-lg mx-auto"
      onSubmit={onSubmit}
    >
      <I18nProvider>
        <h1 className="text-3xl py-8 bg-gradient-to-r from-green-700 to-green-900 text-transparent bg-clip-text font-bold">
          Calculador Excesos
        </h1>
        {children}
      </I18nProvider>
    </form>
  );
};
