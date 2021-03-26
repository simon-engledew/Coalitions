import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import styled from 'styled-components';
import { colorPalette, media, getSpacing, styledTags } from 'stylesheet';

export const StyledDialog = styled(Dialog)`
  ${styledTags}
`;

export const Title = styled.h3`
  color: ${colorPalette.greyDark};
  margin-top: ${getSpacing(5)};
`;

export const StyledCloseButton = styled(IconButton)`
  align-self: flex-end;
  padding: ${getSpacing(3)};
  ${media.desktop(`
    padding: ${getSpacing(5)} ${getSpacing(8)};
  `)}
`;

const CLOSE_ICON_FONT_SIZE = '24px';

export const StyledCloseIcon = styled(Close)`
  font-size: ${CLOSE_ICON_FONT_SIZE};
  color: ${colorPalette.greyDark};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 ${getSpacing(3)} ${getSpacing(3)} ${getSpacing(3)};
  ${media.desktop(`
    width: ${getSpacing(74)};
    padding: 0 ${getSpacing(8)} ${getSpacing(8)} ${getSpacing(8)};
  `)}
`;

export const ValidateButtonContainer = styled.div`
  ${media.desktop(`
    margin-top: ${getSpacing(10)};
  `)}
`;
