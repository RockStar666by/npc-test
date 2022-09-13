import axios from 'axios';

const rates = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';
const dynamics = 'https://www.nbrb.by/api/exrates/rates/dynamics/';

export const requestRates = (onDate = '') =>
  axios.get(`${rates}&onDate=${onDate}`);

export const requestDynamics = (currencyID: string, dates: string[]) =>
  axios.get(
    `${dynamics}${currencyID}${
      dates ? `?startdate=${dates[0]}&enddate=${dates[1]}` : ''
    }`
  );
