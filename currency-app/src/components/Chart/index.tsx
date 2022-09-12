import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { requestDynamics } from '../../services';
import { DynamicsDataType } from '../../types';
import { Area } from './Chart.styles';

export const Chart = ({
  dynamicsData
}: {
  dynamicsData: DynamicsDataType[];
}) => {
  const config = {
    data: dynamicsData.map((elem: any) => {
      return {
        ...elem,
        Date: elem.Date.slice(0, 10),
        BYN: elem.Cur_OfficialRate
      };
    }),
    animation: 'off',
    padding: 'auto',
    xField: 'Date',
    yField: 'BYN',
    xAxis: {
      tickCount: 12,
      label: {
        rotate: Math.PI / 6,
        offset: 30,
        style: {
          fill: '#aaa',
          fontSize: 12
        }
      }
    },
    yAxis: {
      tickCount: 5,
      min: Math.floor(
        Math.min(...dynamicsData.map((item) => item.Cur_OfficialRate))
      )
    },
    slider: {
      start: 0,
      end: 1,
      height: 60
    },
    legend: {
      layout: 'horizontal',
      position: 'right'
    },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff'
      };
    }
  };
  // @ts-ignore
  return <Area {...config} />;
};
