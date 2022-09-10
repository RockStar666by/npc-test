import React from 'react';
import { StyledDatePicker } from './DatePicker.styles';
import { useStateParams } from '../../hooks';
import moment, { Moment } from 'moment';
import { RangePickerProps } from 'antd/es/date-picker';

export const DatePicker: React.FC = () => {
  const [date, setDate] = useStateParams(
    '',
    'date',
    (s) => s.toString(),
    (s) => s
  );

  const onChange = (value: Moment | null, dateString: string) => {
    setDate(dateString);
  };

  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current > moment().endOf('day');
  };

  return (
    <StyledDatePicker
      onChange={onChange}
      defaultValue={moment()}
      disabledDate={disabledDate}
    />
  );
};
