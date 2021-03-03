import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import useSelector from 'redux/useSelector';
import { useFetchCauses } from 'redux/Cause/hooks';
import { StyledCauseList, CauseListContainer } from './CauseList.style';
import Loader from 'components/Loader';
import Cause from 'components/Cause';
import { getCauses } from 'redux/Cause/selectors';

const CauseList: React.FunctionComponent = () => {
  const causes = useSelector(getCauses);
  const [{ loading, error }, doFetchCauses] = useFetchCauses();

  useEffect(() => {
    doFetchCauses();
  }, [doFetchCauses]);

  return (
    <StyledCauseList>
      <FormattedMessage id="cause_list.description" />
      {loading && <Loader />}
      {!loading && error !== undefined && <FormattedMessage id="cause_list.error" />}
      {!loading && error === undefined && causes.length === 0 && (
        <FormattedMessage id="cause_list.no_cause" />
      )}
      {causes.length > 0 && (
        <CauseListContainer>
          {causes.map(cause => (
            <Cause key={cause.uuid} cause={cause} />
          ))}
        </CauseListContainer>
      )}
    </StyledCauseList>
  );
};

export default CauseList;
