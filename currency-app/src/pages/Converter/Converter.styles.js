import styled from 'styled-components';
import { myTheme } from '../../themes/DefaultTheme';

export const StyledConverter = styled.main`
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

export const CurrencyInputWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 20px;
`;

export const ConverterWrapper = styled.div`
position: relative;
display: flex;
flex-direction: column;
padding: 20px 16px 0;
box-sizing: border-box;
margin: 0 auto;
width: 100%;
height 400px;
max-width: 1400px;
`;

export const ModalWrapper = styled.div`
  display: flex;
  justify-content: right;
  padding: 20px 0;
`;

export const Equation = styled.p`
  display: flex;
  margin: 0 auto;
  font-size: 80px;
`;
