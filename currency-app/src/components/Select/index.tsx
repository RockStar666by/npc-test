import { Select } from 'antd';
import React, { useEffect } from 'react';
import { useStateParams } from '../../hooks';
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
  name?: string;
  onChange?: () => void;
}) => {
  const [dropdownList, setDropdownList] = useStateParams(
    data[0]?.Cur_ID,
    name || 'dropdown',
    (s) => s.toString(),
    (s) => s
  );

  useEffect(() => {
    setDropdownList(dropdownList);
  }, []);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    if (onChange) onChange();
    setDropdownList(value);
  };

  return (
    <Select
      defaultValue={
        dropdownList
          ? data.find((elem) => elem.Cur_ID == dropdownList)?.Cur_Scale +
            ' ' +
            data.find((elem) => elem.Cur_ID == dropdownList)?.Cur_Name
          : data[0]?.Cur_Scale + ' ' + data[0]?.Cur_Name
      }
      style={{ minWidth: 200 }}
      onChange={handleChange}
      loading={loading}
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
