import axios from 'axios';

const rates = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';

export const requestRates = (onDate = '') =>
  axios.get(`${rates}&onDate=${onDate}`);
export const requestCurrency = (currencyID = '') =>
  axios.get(`${rates}${currencyID}`);
