import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import FreePostContainer from 'containers/FreePostContainer';

const FreePostPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate>
                <FreePostContainer />
            </PageTemplate>
        </div>
    );
};

export default FreePostPage;
