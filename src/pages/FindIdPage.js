import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import FindIdContainer from 'containers/FindIdContainer';

const FindIdPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate>
                <FindIdContainer />
            </PageTemplate>
        </div>
    );
};

export default FindIdPage;
