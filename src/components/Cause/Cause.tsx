import React, { useState, FunctionComponent } from 'react';
import { SmallButton, DefaultButton } from 'components/Button/Button';
import { Cause as CauseType } from 'redux/Cause/types';
import {
  Author,
  ButtonContainer,
  CauseName,
  CoalitionName,
  StyledCard,
  StyledContent,
  StyledMedia,
} from './Cause.style';
import { FormattedMessage } from 'react-intl';
import { DefaultLink as Link } from 'components/Link/Link';
import AuthorAndSupports from 'components/AuthorAndSupports';
import LoginAndSupportModal from 'components/LoginAndSupportModal';

import { PATHS } from 'routes';

interface CauseProps {
  cause: CauseType;
}

const Cause: FunctionComponent<CauseProps> = ({ cause }: CauseProps) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const onSupportClick = () => {
    // TODO check if user is connected
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  return (
    <>
      <StyledCard>
        <StyledMedia image={cause.image_url} title="" />
        <StyledContent>
          <CoalitionName>{cause.coalition.name}</CoalitionName>
          <CauseName>{cause.name}</CauseName>
          <Author>
            <FormattedMessage
              id="cause.author"
              values={{
                firstName: cause.author.first_name,
                lastNameInitial: cause.author.last_name_initial,
              }}
            />
          </Author>
          <AuthorAndSupports cause={cause} />
          <ButtonContainer>
            <SmallButton size="small" variant="contained" color="primary" onClick={onSupportClick}>
              <FormattedMessage id="cause.support-button" />
            </SmallButton>
            <Link to={PATHS.CAUSE.url(cause.uuid)}>
              <DefaultButton size="small" variant="outlined">
                <FormattedMessage id="cause.see-button" />
              </DefaultButton>
            </Link>
          </ButtonContainer>
        </StyledContent>
      </StyledCard>
      <LoginAndSupportModal isOpened={isModalOpened} onClose={closeModal} cause={cause} />
    </>
  );
};

export default Cause;
