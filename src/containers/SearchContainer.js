import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import Search from 'components/Search';

class SearchContainer extends Component {
    render() {
        return (
            <Fragment>
                <Search />
            </Fragment>
        );
    }
}

export default SearchContainer;
