import React from 'react';
import useUrlState from '@ahooksjs/use-url-state';
import { Select } from 'antd';
import { CurrenciesDataType } from '../../types';
import { flags } from './../../assets/country-flags';

const { Option } = Select;

export const SelectDropdown = ({
  data,
  loading,
  name,
  defaultValue,
  onChange
}: {
  data: CurrenciesDataType[];
  loading: boolean;
  name: string;
  defaultValue: string;
  onChange?: () => void;
}) => {
  const [state, setState] = useUrlState({ [name]: defaultValue });

  const handleChange = (value: {
    value: string | undefined | number;
    label: React.ReactNode;
  }) => {
    if (onChange) onChange();
    setState({ [name]: value.value });
  };

  const handleValue = () => {
    if (state[name] !== undefined) {
      const currency = data.find((elem) => elem.Cur_ID == state[name]);
      return {
        value: currency?.Cur_ID,
        label: (
          <>
            <img
              src={flags[currency?.Cur_Abbreviation as keyof typeof flags]}
            />
            {'  '}
            {currency?.Cur_Abbreviation}
          </>
        )
      };
    } else {
      return { value: 431, label: 'usd' };
    }
  };

  return (
    <Select
      size='large'
      labelInValue
      // @ts-ignore
      defaultValue={handleValue()}
      style={{ minWidth: 110 }}
      onChange={handleChange}
      loading={loading}
    >
      {data.map(({ Cur_Name, Cur_ID, Cur_Scale, Cur_Abbreviation }) => {
        return (
          <Option key={Cur_ID} value={Cur_ID} label={Cur_Abbreviation}>
            <img src={flags[Cur_Abbreviation as keyof typeof flags]} />
            {'  '}
            {Cur_Abbreviation}
          </Option>
        );
      })}
    </Select>
  );
};
