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
import { ScreenSwitcher } from '../../components/ScreenSwitcher';
import { useStateParams } from '../../hooks';
import { ShareAltOutlined } from '@ant-design/icons';

export const MainPage: React.FC = () => {
  const [isSending, setIsSending] = useState(false);
  const [currenciesData, setCurrenciesData] = useState<CurrenciesDataType[]>(
    []
  );

  const [date, setDate] = useStateParams(
    '',
    'date',
    (s) => s.toString(),
    (s) => s
  );

  useEffect(() => {
    setIsSending(true);
    requestRates(date)
      .then((response) => setCurrenciesData(response.data))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsSending(false));
  }, [date]);

  const handleOnClick = () => {
    setIsSending(true);
    requestRates(date)
      .then((response) => setCurrenciesData(response.data))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsSending(false));
  };

  return (
    <StyledMain>
      <MainWrapper>
        <ScreenSwitcher />
        <MainHeader>Курсы валют Нацбанка РБ на {date}</MainHeader>
        <SearchInput>
          <Button type='default'>
            <ShareAltOutlined />
            Поделиться
          </Button>
          <DatePicker></DatePicker>
          <Button type='primary' onClick={handleOnClick}>
            Найти
          </Button>
        </SearchInput>
        <Table currencies={currenciesData} loading={isSending}></Table>
      </MainWrapper>
    </StyledMain>
  );
};
