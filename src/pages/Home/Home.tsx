import * as React from 'react';
import {
  Block,
  MobileCreateCauseButtonContainer,
  TopPartContainer,
  TopPartSubContainer,
  Title,
  Content,
  DesktopCreateCauseButton,
  Image,
  CoalitionCardsWrapper,
  CauseCardsWrapper,
  CausesHeader,
  SeeAllButton,
} from './Home.style';
import { CauseDefinition } from 'components/Definition/CauseDefinition';
import Cause from 'components/Cause';
import { CoalitionDefinition } from 'components/Definition/CoalitionDefinition';
import { DefaultLink } from 'components/Link/Link';
import { FormattedMessage } from 'react-intl';
import { PATHS } from 'routes';
import { MediumLargeButton } from 'components/Button/Button';
import CoalitionCards from 'components/CoalitionCards';
import { Coalition } from 'redux/Coalition/types';
import { useSelector } from 'react-redux';
import { useFetchCauses } from 'redux/Cause/hooks/useFetchCauses';
import { getAllCauses } from 'redux/Cause/selectors';
import { isUserLogged } from 'redux/Login';
import Loader from 'components/Loader';
import { CreateCauseCTA } from 'pages/CauseList/CreateCauseCTA/CreateCauseCTA';
import { useHistory } from 'react-router';

const Home: React.FunctionComponent = () => {
  const history = useHistory();
  const onCoalitionClick = (coalition: Coalition) => {
    history.push({ pathname: PATHS.CAUSE_LIST.url(), search: `?coalitionId=${coalition.uuid}` });
  };
  const causes = useSelector(getAllCauses);
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const { loading, fetchFirstPage } = useFetchCauses(10);

  React.useEffect(() => {
    fetchFirstPage([], isUserLoggedIn);
  }, [fetchFirstPage, isUserLoggedIn]);

  return (
    <>
      <TopPartContainer>
        <TopPartSubContainer>
          <Title>
            <FormattedMessage id="our_mission.title" />
          </Title>
          <h3>
            <FormattedMessage id="our_mission.our-mission" />
          </h3>
          <Content>
            <FormattedMessage id="our_mission.explanation" />
          </Content>
          <DefaultLink to={PATHS.OUR_MISSION.url()}>
            <DesktopCreateCauseButton size="small" variant="contained" color="primary">
              <FormattedMessage id="cause-cta.cause-creation" />
            </DesktopCreateCauseButton>
          </DefaultLink>
        </TopPartSubContainer>
        <Image />
      </TopPartContainer>
      <MobileCreateCauseButtonContainer>
        <DefaultLink to={PATHS.OUR_MISSION.url()}>
          <MediumLargeButton variant="contained" color="primary">
            <FormattedMessage id="cause-cta.cause-creation" />
          </MediumLargeButton>
        </DefaultLink>
      </MobileCreateCauseButtonContainer>
      <CauseDefinition />
      <Block>
        <CausesHeader>
          <h3>
            <FormattedMessage id="home.support-causes" />
          </h3>
          <DefaultLink to={PATHS.CAUSE_LIST.url()}>
            <SeeAllButton>Voir tout</SeeAllButton>
          </DefaultLink>
        </CausesHeader>
        {loading && causes === [] ? (
          <Loader />
        ) : (
          <CauseCardsWrapper>
            {causes.map(cause => (
              <Cause key={cause.uuid} cause={cause} />
            ))}
          </CauseCardsWrapper>
        )}
      </Block>
      <CoalitionDefinition />
      <Block>
        <h3 id="coalitions">
          <FormattedMessage id="coalition.title" />
        </h3>
        <CoalitionCardsWrapper>
          <CoalitionCards onCoalitionClick={onCoalitionClick} responsiveNbOfCardsByLine />
        </CoalitionCardsWrapper>
      </Block>
      <CreateCauseCTA displayLinkToCauseList />
    </>
  );
};

export default Home;
