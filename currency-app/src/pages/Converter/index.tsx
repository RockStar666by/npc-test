import React, { useEffect, useState } from 'react';
import { SelectDropdown } from '../../components/Select';
import { requestRates } from '../../services';
import { CurrenciesDataType } from '../../types';
import { StyledConverter } from './Converter.styles';

export const ConverterPage: React.FC = () => {
  const [isSending, setIsSending] = useState(true);
  const [currenciesData, setCurrenciesData] = useState<CurrenciesDataType[]>(
    []
  );

  useEffect(() => {
    setIsSending(true);
    requestRates()
      .then((response) => setCurrenciesData(response.data))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsSending(false));
  }, []);

  return (
    <StyledConverter>
      <SelectDropdown
        data={currenciesData}
        loading={isSending}
        name='currency1'
      />
      <SelectDropdown
        data={currenciesData}
        loading={isSending}
        name='currency2'
      />
    </StyledConverter>
  );
};
