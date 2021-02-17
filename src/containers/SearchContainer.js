import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import Home from 'components/Home';

class SearchContainer extends Component {
    render() {
        return (
            <Fragment>
                <Home />
            </Fragment>
        );
    }
}

export default SearchContainer;
