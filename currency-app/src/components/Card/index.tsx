import { WarningOutlined } from '@ant-design/icons';
import React from 'react';
import { useDevice } from '../../functions/useDevice';
import { StyledCard } from './Card.styles';

export const Card: React.FC = () => {
  console.log(useDevice());
  return (
    <StyledCard>
      <div>
        <>
          <p>
            <WarningOutlined />
            Browser info:
          </p>
          {Object.entries(useDevice()).map((prop) => {
            return (
              <>
                <span>
                  {prop[0]}: {String(prop[1])}
                </span>
                <br></br>
              </>
            );
          })}
        </>
      </div>
    </StyledCard>
  );
};
