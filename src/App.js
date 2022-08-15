import React from 'react';
import Header from './app/component/header';
import { Route, Switch } from 'react-router-dom';
import Home from './app/component/home';
import Menu from './app/component/menu';
import Delivery from './app/component/delivery';
import About from './app/component/about';
import Blog from './app/component/blog';

function App () {
    return (
        <>
            <Header/>
            <Switch>
                <Route exact path ='/' component={Home}/>
                <Route exact path ='/menu' component={Menu}/>
                <Route path ='/delivery' component={Delivery}/>
                <Route path='/about' component={About}/>
                <Route path='/blog' component={Blog}/>
            </Switch>
        </>
    );
}

export default App;
