import { DatePicker } from 'antd';
import moment from 'moment';
import { Moment } from 'moment';
import React from 'react';
import { useStateParams } from '../../hooks';
import { StyledRangePicker } from './RangePicker.styles';
import { RangePickerProps } from 'antd/es/date-picker';
import { RangeValue } from 'rc-picker/lib/interface.d';

export const RangePicker = () => {
  const [dateRange, setDateRange] = useStateParams(
    [
      moment().subtract(6, 'months').format('YYYY-MM-DD').toString(),
      moment().format('YYYY-MM-DD').toString()
    ],
    'dateRange',
    (s) => s.toString(),
    (s) => s.split(',')
  );

  const onChange = (dates: RangeValue<Moment>, dateString: string[]) => {
    console.log('DATE STRING', dateString, dates, dateRange);
    setDateRange(dateString);
    console.log('DATE STRING AFTER', dateString, dates, dateRange);
  };

  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current > moment().endOf('day');
  };

  return (
    <StyledRangePicker
      onChange={onChange}
      defaultValue={[
        moment(dateRange[0], 'YYYY-MM-DD'),
        moment(dateRange[1], 'YYYY-MM-DD')
      ]}
      disabledDate={disabledDate}
      format='YYYY-MM-DD'
      value={[
        moment(dateRange[0], 'YYYY-MM-DD'),
        moment(dateRange[1], 'YYYY-MM-DD')
      ]}
    />
  );
};
