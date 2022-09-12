import { Radio, RadioChangeEvent, Segmented } from 'antd';
import React, { useEffect, useState } from 'react';
import { useStateParams } from '../../hooks';

export const ScreenSwitcher: React.FC = () => {
  const [value, setValue] = useStateParams(
    'a',
    'screen',
    (s) => s.toString(),
    (s) => s.toString()
  );

  // const onChange = (radioTarget: RadioChangeEvent) => {
  //   setRadio(radioTarget.target.value);
  // };

  return (
    <>
      <Segmented
        block
        options={[
          { label: 'Курсы валют', value: 'a' },
          { label: 'Динамика курсов', value: 'b' },
          { label: 'Калькулятор', value: 'c' }
        ]}
        value={value}
        // @ts-ignore
        onChange={setValue}
      />
    </>
  );
};
