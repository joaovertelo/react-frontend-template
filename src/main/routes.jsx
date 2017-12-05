import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'

import App from './app'
import Inicio from '../inicio/inicio'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Inicio} />
            <Route path='' />
        </Route>
        <Redirect from='*' to='/' />
    </Router>
)