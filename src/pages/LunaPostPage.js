import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import LunaPostContainer from 'containers/LunaPostContainer';

const LunaPostPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate>
                <LunaPostContainer />
            </PageTemplate>
        </div>
    );
};

export default LunaPostPage;
