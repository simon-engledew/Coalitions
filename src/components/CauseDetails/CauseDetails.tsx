import React, { useState, ChangeEvent, FunctionComponent } from 'react';
import {
  Container,
  HeaderContainer,
  CauseImage,
  TabsWrapper,
  StyledTab,
  Supported,
} from './CauseDetails.style';
import { FormattedMessage, useIntl } from 'react-intl';
import { colorPalette } from 'stylesheet';
import { Tabs } from '@material-ui/core';
import AboutThisCause from './components/AboutThisCause';
import FixedBottomButton from 'components/FixedBottomButton';
import { CreateCauseCTA } from 'pages/CauseList/CreateCauseCTA/CreateCauseCTA';
import { InCreationCause, Cause } from 'redux/Cause/types';
import Header from './components/Header';

interface CauseDetailsProps {
  cause: Cause | InCreationCause;
  onSupport?: () => void;
  isSupporting?: boolean;
}

const TAB_INDICATOR_PROPS = {
  style: {
    backgroundColor: colorPalette.mintGreen2,
  },
};

const CauseDetails: FunctionComponent<CauseDetailsProps> = ({ cause, onSupport, isSupporting }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const isPreview = Boolean(!onSupport);
  const isSupported = Boolean(cause.supported);
  const intl = useIntl();

  const onTabIndexChange = (_: ChangeEvent<{}>, value: number) => {
    setTabIndex(value);
  };

  const renderTabPanel = () => {
    switch (tabIndex) {
      case 0:
        return <AboutThisCause cause={cause} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Container>
        <HeaderContainer>
          <CauseImage backgroundImage={cause.image_url} />
          {Boolean(cause.supported) ? (
            <Supported>
              <FormattedMessage id="cause.supported" />
            </Supported>
          ) : null}
          <Header cause={cause} onSupport={onSupport} isSupporting={isSupporting} />
        </HeaderContainer>
        <TabsWrapper>
          <Tabs
            value={tabIndex}
            onChange={onTabIndexChange}
            TabIndicatorProps={TAB_INDICATOR_PROPS}
          >
            <StyledTab label={<FormattedMessage id="cause.about.title" />} />
            <StyledTab label={<FormattedMessage id="cause.events.title" />} />
            <StyledTab label={<FormattedMessage id="cause.discussions.title" />} />
          </Tabs>
          {renderTabPanel()}
        </TabsWrapper>
        {!isPreview ? <CreateCauseCTA displayLinkToCauseList /> : null}
      </Container>
    </>
  );
};

export default CauseDetails;
