import { Input, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { ShareLinkModal } from '../../components/Modal';
import { SelectDropdown } from '../../components/Select';
import { useStateParams } from '../../hooks';
import { requestRates } from '../../services';
import { CurrenciesDataType } from '../../types';
import { CurrencyHeader } from '../Currency/Currency.styles';
import {
  ConverterWrapper,
  CurrencyInputWrapper,
  Equation,
  ModalWrapper,
  StyledConverter
} from './Converter.styles';

export const ConverterPage: React.FC = () => {
  const [isSending, setIsSending] = useState(true);
  const [currenciesData, setCurrenciesData] = useState<CurrenciesDataType[]>(
    []
  );
  const [rate, setRate] = useState(1);

  const [amount, setAmount] = useStateParams(
    ['', ''],
    'amount',
    (s) => s.toString(),
    (s) => s.split(',')
  );

  const [currencyOne, setCurrencyOne] = useStateParams(
    431,
    'currencyOne',
    (s) => s.toString(),
    (s) => Number(s)
  );

  const [currencyTwo, setCurrencyTwo] = useStateParams(
    666,
    'currencyTwo',
    (s) => s.toString(),
    (s) => Number(s)
  );

  useEffect(() => {
    setIsSending(true);
    requestRates()
      .then((response) => {
        const data = response.data;
        console.log(data);
        data.push({
          Cur_Abbreviation: 'BYN',
          Cur_ID: 666,
          Cur_Name: 'Белорусский рубль',
          Cur_OfficialRate: 1,
          Cur_Scale: 1
        });
        setCurrenciesData(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsSending(false));
  }, []);

  const handleRateChange = () => {
    let curFrom = currenciesData.find((elem) => elem.Cur_ID == currencyOne);
    let curTo = currenciesData.find((elem) => elem.Cur_ID == currencyTwo);
    console.log(curFrom, curTo);
    if (curFrom && curTo) {
      const rateTotal =
        Number(curFrom.Cur_OfficialRate) /
        Number(curTo.Cur_OfficialRate) /
        (curFrom.Cur_Scale / curTo.Cur_Scale);
      setRate(rateTotal);
      console.log('RATE', rate);
    }
  };

  useEffect(() => {
    handleRateChange();
  }, [currencyOne, currencyTwo]);

  const handleChangeAmountOne = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const quantity = event.target.value;
    setAmount([quantity, String((+quantity * rate).toFixed(2))]);
  };

  const handleChangeAmountTwo = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const quantity = event.target.value;
    setAmount([String((+quantity / rate).toFixed(2)), quantity]);
  };

  const handleChangeCurrency = () => {
    setAmount(['0', '0']);
  };

  return (
    <StyledConverter>
      <ConverterWrapper>
        {!isSending ? (
          <>
            <CurrencyHeader>
              <>Калькулятор</>
            </CurrencyHeader>
            <ModalWrapper>
              <ShareLinkModal />
            </ModalWrapper>
            <CurrencyInputWrapper>
              <p style={{ margin: 0, fontWeight: 'bold' }}>ИЗ:</p>
              <SelectDropdown
                data={currenciesData}
                loading={isSending}
                name='currencyOne'
                onChange={handleChangeCurrency}
                defaultValue='431'
              />
              <Input
                size='large'
                type='number'
                min={0}
                defaultValue={amount[0]}
                onChange={handleChangeAmountOne}
                value={amount[0]}
                style={{ width: 160 }}
                onFocus={handleRateChange}
              ></Input>
            </CurrencyInputWrapper>
            <Equation>=</Equation>
            <CurrencyInputWrapper>
              <p style={{ margin: 0, fontWeight: 'bold' }}>В:</p>
              <SelectDropdown
                data={currenciesData}
                loading={isSending}
                name='currencyTwo'
                onChange={handleChangeCurrency}
                defaultValue='666'
              />
              <Input
                size='large'
                type='number'
                min={0}
                defaultValue={amount[1]}
                onChange={handleChangeAmountTwo}
                value={amount[1]}
                style={{ width: 160 }}
                onFocus={handleRateChange}
              ></Input>
            </CurrencyInputWrapper>
          </>
        ) : (
          <Spin />
        )}
      </ConverterWrapper>
    </StyledConverter>
  );
};
