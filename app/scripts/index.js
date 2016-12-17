import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';

import { Router, Route, Redirect, browserHistory } from 'react-router';

import { StoreTools } from './flux';
StoreTools.startLoadingComments();

import '../css/base.css';

import CommentBox from './CommentBox.js';
import CommentEdit from './CommentEdit.js'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={CommentBox}/>
    <Route path="/:id" component={CommentEdit}/>
  </Router>
), document.getElementById('content'));
