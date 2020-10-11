import * as React from 'react'
import {
  BrowserRouter,
  Redirect,
  // HashRouter,
  Route,
  Switch
} from 'react-router-dom';
import asyncComponent from './lazy';
// import { Provider } from 'react-redux'
// import store from '@/store/store'

import Child from '@/App';
const Nav =asyncComponent(()=>import('@/page/nav-page/Nav'));
const Lists =asyncComponent(()=>import('@/page/list-page/Lists'));
const Block =asyncComponent(()=>import('@/page/block-page/Block'));

class RouteMap extends React.Component {
   render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route path='/' render={() => 
              <Child>
                  <Route path='/' exact component={Nav}/>
                  <Route path='/list' component={Lists}/>
                  <Route path='/block' exact component={Block}/>
              </Child>
            } />
            <Redirect from="*" to="/"/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default RouteMap  