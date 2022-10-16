import styled from 'styled-components';

export const StyledCurrency = styled.main`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 224px);
`;

export const CurrencyWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 16px 80px;
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-width: 1400px;
`;

export const CurrencyHeader = styled.h1``;

export const SearchInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin-bottom: 20px;
  gap: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
