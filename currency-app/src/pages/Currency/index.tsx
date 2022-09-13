import React, { useEffect, useState } from 'react';
import {
  CurrencyHeader,
  CurrencyWrapper,
  SearchInput,
  StyledCurrency
} from './Currency.styles';
import { Button } from 'antd';
import { CurrenciesDataType, DynamicsDataType } from '../../types';
import { requestDynamics, requestRates } from '../../services';
import { useStateParams } from '../../hooks';
import { ShareLinkModal } from '../../components/Modal';
import { Chart } from '../../components/Chart';
import { RangePicker } from '../../components/RangePicker';
import { SelectDropdown } from '../../components/Select';
import moment from 'moment';
import { Card } from '../../components/Card';
import useUrlState from '@ahooksjs/use-url-state';

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

  const [urlState, setUrlStat] = useUrlState();

  useEffect(() => {
    setIsSending(true);
    console.log(urlState);
    requestRates()
      .then((response) => {
        const responseData = response.data;
        setCurrenciesData(responseData);
        return responseData;
      })
      .then((responseData) =>
        requestDynamics(responseData[0].Cur_ID, dateRange)
      )
      .then((response) => setDynamicsData(response.data))

      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsSending(false));
    console.log(urlState);
  }, []);

  const handleOnClick = () => {
    setIsSending(true);
    requestDynamics(urlState.currency, dateRange)
      .then((response) => setDynamicsData(response.data))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsSending(false));
  };

  const handleGetName = () => {
    const cur: CurrenciesDataType | undefined = currenciesData.find(
      (cur) => cur.Cur_ID == urlState.currency
    );
    if (cur !== undefined) {
      return `${cur?.Cur_Scale} ${cur?.Cur_Name}`;
    }
  };

  return (
    <StyledCurrency>
      <CurrencyWrapper>
        <Card />
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
