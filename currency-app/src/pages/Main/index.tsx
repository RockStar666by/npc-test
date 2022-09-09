import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import {
  StyledMain,
  MainWrapper,
  SearchInput,
  MainHeader
} from './Main.styles';
import { DatePicker } from '../../components/DatePicker';
import { myTheme } from '../../themes/DefaultTheme';
import { Table } from '../../components/Table';
import { CurrenciesDataType } from '../../types';
import { requestRates } from '../../services';

export const MainPage: React.FC = () => {
  const [currenciesData, setCurrenciesData] = useState<CurrenciesDataType[]>(
    []
  );
  useEffect(() => {
    requestRates()
      .then((response) => setCurrenciesData(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(currenciesData);

  return (
    <StyledMain>
      <MainWrapper>
        <MainHeader>Курсы валют Нацбанка РБ на сегодня</MainHeader>
        <SearchInput>
          <DatePicker></DatePicker>
          <Button type='primary'>Найти</Button>
        </SearchInput>
        <Table currencies={currenciesData}></Table>
      </MainWrapper>
    </StyledMain>
  );
};
