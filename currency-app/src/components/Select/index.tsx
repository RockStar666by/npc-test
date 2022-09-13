import useUrlState from '@ahooksjs/use-url-state';
import { Select } from 'antd';
import React from 'react';
import { CurrenciesDataType } from '../../types';

const { Option } = Select;

export const SelectDropdown = ({
  data,
  loading,
  name,
  onChange
}: {
  data: CurrenciesDataType[];
  loading: boolean;
  name: string;
  onChange?: () => void;
}) => {
  const [state, setState] = useUrlState({ [name]: undefined });

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    if (onChange) onChange();
    setState({ [name]: value });
  };

  const handleValue = () =>
    state[name] !== undefined
      ? data.find((elem) => elem.Cur_ID == state[name])?.Cur_Scale +
        ' ' +
        data.find((elem) => elem.Cur_ID == state[name])?.Cur_Name
      : 'Выберите валюту';

  return (
    <Select
      defaultValue={handleValue()}
      style={{ minWidth: 200 }}
      onChange={handleChange}
      loading={loading}
      value={handleValue()}
    >
      {data.map(({ Cur_Name, Cur_ID, Cur_Scale }) => {
        return (
          <Option key={Cur_ID} value={Cur_ID}>
            {Cur_Scale + ' ' + Cur_Name}
          </Option>
        );
      })}
    </Select>
  );
};
