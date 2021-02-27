import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import ArticleList from 'components/ArticleList';

class ArticleListContainer extends Component {
    render() {
        console.log('home container');
        return (
            <Fragment>
                <ArticleList />
            </Fragment>
        );
    }
}

export default ArticleListContainer;
