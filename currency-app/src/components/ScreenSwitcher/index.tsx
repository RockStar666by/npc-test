import { Segmented } from 'antd';
import React from 'react';
import { useStateParams } from '../../hooks';

export const ScreenSwitcher: React.FC = () => {
  const [value, setValue] = useStateParams(
    'a',
    'screen',
    (s) => s.toString(),
    (s) => s.toString()
  );

  const onChange = (value: any) => {
    setValue(value);
  };

  return (
    <>
      <Segmented
        size='large'
        block
        options={[
          { label: 'Курсы валют', value: 'a' },
          { label: 'Динамика курсов', value: 'b' },
          { label: 'Калькулятор', value: 'c' }
        ]}
        value={value}
        // @ts-ignore
        onChange={onChange}
        style={{
          margin: '0 auto',
          maxWidth: 1400,
          display: 'flex',
          fontWeight: 'bold'
        }}
      />
    </>
  );
};
