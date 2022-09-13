import { Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { ShareLinkModal } from '../../components/Modal';
import { SelectDropdown } from '../../components/Select';
import { useStateParams } from '../../hooks';
import { requestRates } from '../../services';
import { CurrenciesDataType } from '../../types';
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

  const [currency, setCurrency] = useStateParams(
    currenciesData[0]?.Cur_ID,
    'currency',
    (s) => s.toString(),
    (s) => s
  );

  const [currencyTwo, setCurrencyTwo] = useStateParams(
    currenciesData[0]?.Cur_ID,
    'currencyTwo',
    (s) => s.toString(),
    (s) => s
  );

  useEffect(() => {
    setIsSending(true);
    requestRates()
      .then((response) => {
        const data = response.data;
        setCurrenciesData(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsSending(false));
  }, []);

  const handleRateChange = () => {
    let rateX = currenciesData.find((elem) => elem.Cur_ID == currency);
    let rateY = currenciesData.find((elem) => elem.Cur_ID == currencyTwo);
    console.log(rateX, rateY);
    if (rateX && rateY) {
      const rateTotal =
        Number(rateX.Cur_OfficialRate) / Number(rateY.Cur_OfficialRate);
      setRate(rateTotal);
      console.log('RATE', rate);
    }
  };

  useEffect(() => handleRateChange(), [amount, currency, currencyTwo]);

  const handleChangeAmountOne = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const quantity = event.target.value;
    console.log(rate);
    setAmount([quantity, String((+quantity * rate).toFixed(2))]);
  };

  const handleChangeAmountTwo = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(rate);

    const quantity = event.target.value;
    setAmount([String((+quantity / rate).toFixed(2)), quantity]);
  };

  const handleChangeCurrency = () => {
    setAmount(['0', '0']);
  };

  return (
    <StyledConverter>
      <ConverterWrapper>
        <Card />
        {!isSending ? (
          <>
            <ModalWrapper>
              <ShareLinkModal />
            </ModalWrapper>
            <CurrencyInputWrapper>
              <SelectDropdown
                data={currenciesData}
                loading={isSending}
                name='currency'
                onChange={handleChangeCurrency}
              />
              <Input
                type='number'
                defaultValue={amount[0]}
                onChange={handleChangeAmountOne}
                value={amount[0]}
                style={{ width: 200 }}
                onFocus={handleRateChange}
              ></Input>
            </CurrencyInputWrapper>
            <Equation>=</Equation>
            <CurrencyInputWrapper>
              <SelectDropdown
                data={currenciesData}
                loading={isSending}
                name='currencyTwo'
                onChange={handleChangeCurrency}
              />
              <Input
                type='number'
                defaultValue={amount[1]}
                onChange={handleChangeAmountTwo}
                value={amount[1]}
                style={{ width: 200 }}
              ></Input>
            </CurrencyInputWrapper>
          </>
        ) : (
          ''
        )}
      </ConverterWrapper>
    </StyledConverter>
  );
};
