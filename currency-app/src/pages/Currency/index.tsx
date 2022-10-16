import React, { useEffect, useState } from 'react';
import {
  CurrencyHeader,
  CurrencyWrapper,
  SearchInput,
  StyledCurrency
} from './Currency.styles';
import { Button, Spin } from 'antd';
import { CurrenciesDataType, DynamicsDataType } from '../../types';
import { requestDynamics, requestRates } from '../../services';
import { useStateParams } from '../../hooks';
import { ShareLinkModal } from '../../components/Modal';
import { Chart } from '../../components/Chart';
import { RangePicker } from '../../components/RangePicker';
import { SelectDropdown } from '../../components/Select';
import moment from 'moment';
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
        requestDynamics(
          urlState.currency !== undefined ? urlState.currency : '431',
          dateRange
        )
      )
      .then((response) => setDynamicsData(response.data))

      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsSending(false));
    console.log(urlState);
  }, []);

  useEffect(() => {
    setIsSending(true);
    requestDynamics(
      urlState.currency !== undefined ? urlState.currency : '431',
      dateRange
    )
      .then((response) => setDynamicsData(response.data))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsSending(false));
  }, [urlState, dateRange]);

  const handleGetName = () => {
    if (!isSending) {
      let currency: CurrenciesDataType | undefined;
      if (urlState.currency) {
        currency = currenciesData.find(
          (cur) => cur.Cur_ID === Number(urlState.currency)
        );
      } else {
        currency = currenciesData.find((cur) => cur.Cur_ID === 431);
      }
      return `${currency?.Cur_Scale} ${currency?.Cur_Name}`;
    }
  };

  return (
    <StyledCurrency>
      <CurrencyWrapper>
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
                defaultValue='431'
              ></SelectDropdown>
              <RangePicker></RangePicker>
            </SearchInput>
            <Chart dynamicsData={dynamicsData}></Chart>
          </>
        ) : (
          <Spin />
        )}
      </CurrencyWrapper>
    </StyledCurrency>
  );
};
