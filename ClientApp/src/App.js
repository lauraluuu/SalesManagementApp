import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import CustomerComponent from './components/CustomerComponent';
import ProductComponent from './components/ProductComponent';
import StoreComponent from './components/StoreComponent';
import SalesComponent from './components/SalesComponent';
import 'semantic-ui-css/semantic.min.css'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={CustomerComponent} />
        <Route path='/product' component={ProductComponent} />
        <Route path='/store' component={StoreComponent} />
        <Route path='/sales' component={SalesComponent} />
      </Layout>
    );
  }
}
