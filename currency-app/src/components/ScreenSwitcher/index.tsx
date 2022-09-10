import { Radio, RadioChangeEvent } from 'antd';
import React, { useEffect, useState } from 'react';
import { useStateParams } from '../../hooks';

export const ScreenSwitcher: React.FC = () => {
  const [radio, setRadio] = useStateParams(
    'a',
    'screen',
    (s) => s.toString(),
    (s) => s
  );

  const onChange = (radioTarget: RadioChangeEvent) => {
    setRadio(radioTarget.target.value);
  };

  return (
    <Radio.Group defaultValue={radio} buttonStyle='solid' onChange={onChange}>
      <Radio.Button value='a'>Курсы валют</Radio.Button>
      <Radio.Button value='b'>Динамика курсов</Radio.Button>
      <Radio.Button value='c'>Валютный калькулятор</Radio.Button>
    </Radio.Group>
  );
};
