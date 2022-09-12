import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  CurrencyHeader,
  CurrencyWrapper,
  SearchInput,
  StyledCurrency
} from './Currency.styles';
import { Button } from 'antd';

import { myTheme } from '../../themes/DefaultTheme';
import { CurrenciesDataType, DynamicsDataType } from '../../types';
import { requestDynamics, requestRates } from '../../services';
import { ScreenSwitcher } from '../../components/ScreenSwitcher';
import { useStateParams } from '../../hooks';
import { ShareLinkModal } from '../../components/Modal';
import { Chart } from '../../components/Chart';
import { RangePicker } from '../../components/RangePicker';
import { SelectDropdown } from '../../components/Select';
import moment from 'moment';

export const CurrencyPage: React.FC = () => {
  const [isSending, setIsSending] = useState(true);
  const [currenciesData, setCurrenciesData] = useState<CurrenciesDataType[]>(
    []
  );
  const [dynamicsData, setDynamicsData] = useState<DynamicsDataType[]>([]);

  const [dateRange, setDateRange] = useStateParams(
    [
      moment().subtract(6, 'months').format('YYYY-MM-DD').toString(),
      moment().format('YYYY-MM-DD').toString()
    ],
    'dateRange',
    (s) => s + s.toString(),
    (s) => s.split(',')
  );

  const [currency, setCurrency] = useStateParams(
    '431',
    'currency',
    (s) => s.toString(),
    (s) => s
  );

  useEffect(() => {
    setIsSending(true);
    requestRates()
      .then((response) => setCurrenciesData(response.data))
      .catch((error) => {
        console.log(error);
      });
    requestDynamics(currency, dateRange)
      .then((response) => setDynamicsData(response.data))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsSending(false));
  }, []);

  const handleOnClick = () => {
    setIsSending(true);
    requestDynamics(currency, dateRange)
      .then((response) => setDynamicsData(response.data))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsSending(false));
  };

  console.log('1', currenciesData, isSending, dynamicsData);

  const handleGetName = () => {
    const cur: CurrenciesDataType | undefined = currenciesData.find(
      (cur) => cur.Cur_ID == currency
    );

    return `${cur?.Cur_Scale} ${cur?.Cur_Name}`;
  };

  return (
    <StyledCurrency>
      <CurrencyWrapper>
        <ScreenSwitcher />
        {!isSending ? (
          <>
            <CurrencyHeader>
              <>Динамика курса {handleGetName()}</>
            </CurrencyHeader>
            <SearchInput>
              <ShareLinkModal />
              <SelectDropdown
                data={currenciesData}
                loading={isSending}
                name='currency'
              ></SelectDropdown>
              <RangePicker></RangePicker>
              <Button type='primary' onClick={handleOnClick}>
                Найти
              </Button>
            </SearchInput>
            <Chart dynamicsData={dynamicsData}></Chart>
          </>
        ) : (
          ''
        )}
      </CurrencyWrapper>
    </StyledCurrency>
  );
};
