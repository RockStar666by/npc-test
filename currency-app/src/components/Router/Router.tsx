import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from '../../pages/Main';
import { CurrencyPage } from '../../pages/Currency';
import { ConverterPage } from '../../pages/Converter';

export const AppRouting = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/currencies/:currencyId' element={<CurrencyPage />} />
      <Route path='/converter' element={<ConverterPage />} />
    </Routes>
  );
};
