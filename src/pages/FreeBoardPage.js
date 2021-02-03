import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import FreeBoardContainer from 'containers/FreeBoardContainer';

const FreeBoardPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate>
                <FreeBoardContainer />
            </PageTemplate>
        </div>
    );
};

export default FreeBoardPage;
