import React from 'react';
import { MainPage } from '../../pages/Main';
import { CurrencyPage } from '../../pages/Currency';
import { ConverterPage } from '../../pages/Converter';
import { ScreenSwitcher } from '../ScreenSwitcher';
import { useStateParams } from '../../hooks';

export const PageContainer = () => {
  const [screen, setScreen] = useStateParams(
    ' ',
    'screen',
    (s) => s.toString(),
    (s) => s
  );

  const renderSwitch = (param: string) => {
    switch (param) {
      case 'a':
        return <MainPage />;
      case 'b':
        return <CurrencyPage />;
      case 'c':
        return <ConverterPage />;
      default:
        return <MainPage />;
    }
  };

  return (
    <>
      <ScreenSwitcher />
      {renderSwitch(screen)}
    </>
  );
};
