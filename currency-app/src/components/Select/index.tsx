import { Select } from 'antd';
import React, { useEffect } from 'react';
import { useStateParams } from '../../hooks';
import { CurrenciesDataType } from '../../types';

const { Option } = Select;

export const SelectDropdown = ({
  data,
  loading,
  name
}: {
  data: CurrenciesDataType[];
  loading: boolean;
  name?: string;
}) => {
  const [dropdownList, setDropdownList] = useStateParams(
    data[0]?.Cur_ID,
    name || 'dropdown',
    (s) => s.toString(),
    (s) => s
  );

  useEffect(() => {}, [dropdownList]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setDropdownList(value);
  };

  return (
    <Select
      defaultValue={
        dropdownList
          ? data.find((elem) => elem.Cur_ID == dropdownList)?.Cur_Name
          : data[0]?.Cur_Name
      }
      style={{ width: 200 }}
      onChange={handleChange}
      loading={loading}
    >
      {data.map(({ Cur_Name, Cur_ID }) => {
        return (
          <Option key={Cur_ID} value={Cur_ID}>
            {Cur_Name}
          </Option>
        );
      })}
    </Select>
  );
};
