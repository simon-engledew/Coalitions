import styled, { css } from 'styled-components';

import { getSpacing, colorPalette } from 'stylesheet';

export const CoalitionFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: space-between;
`;

export const StyledChip = styled.p<{ isSelected?: boolean }>`
  min-width: ${getSpacing(10)};
  text-align: center;
  width: fit-content;
  border-radius: 20px;
  padding: ${getSpacing(2)} ${getSpacing(3)};
  margin-right: ${getSpacing(3)};
  margin-bottom: ${getSpacing(2)};
  ${({ isSelected }) =>
    isSelected === false || isSelected === undefined
      ? css`
          color: ${colorPalette.mintGreen2};
          background-color: ${colorPalette.white};
          border: 1px solid ${colorPalette.mintGreen2};
        `
      : css`
          color: ${colorPalette.blueCoalition};
          background-color: ${colorPalette.mintGreen};
          border: 1px solid ${colorPalette.white};
        `};
`;
StyledChip.displayName = 'StyledChip';
