import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import FindPwContainer from 'containers/FindPwContainer';

const FindPwPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate>
                <FindPwContainer />
            </PageTemplate>
        </div>
    );
};

export default FindPwPage;
