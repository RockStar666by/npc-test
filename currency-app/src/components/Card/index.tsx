import { WarningOutlined } from '@ant-design/icons';
import React from 'react';
import { getDeviceInfo } from '../../functions/useDevice';
import { StyledCard } from './Card.styles';

export const Card: React.FC = () => {
  return (
    <StyledCard>
      <div>
        <>
          <p>
            <WarningOutlined />
            Browser info:
          </p>
          {Object.entries(getDeviceInfo()).map((prop) => {
            return (
              <p key={prop[0]}>
                {prop[0]}: {String(prop[1])}
              </p>
            );
          })}
        </>
      </div>
    </StyledCard>
  );
};
