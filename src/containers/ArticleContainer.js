import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import Article from 'components/Article';

class ArticleContainer extends Component {
    render() {
        console.log('home container');
        return (
            <Fragment>
                <Article />
            </Fragment>
        );
    }
}

export default ArticleContainer;
