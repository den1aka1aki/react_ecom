import React from 'react';
import Header from './app/component/header/header';
import { Route, Switch } from 'react-router-dom';
import Home from './app/component/home/Home';
import Menu from './app/component/Menu';
import Delivery from './app/component/Delivery';
import Manager from './app/component/Manager';
import Login from './app/layouts/login';
import LogOut from './app/component/logOut';
import cart from './app/component/cart';
import PizzaLoader from './app/component/pizzaLoader';

function App () {
    return (
        <>
            <PizzaLoader>
                <Header/>
                <Switch>
                    <Route exact path ='/' component={Home}/>
                    <Route path ='/menu' component={Menu}/>
                    <Route path ='/delivery' component={Delivery}/>
                    <Route path = '/logout' component={LogOut}/>
                    <Route path='/manager' component={Manager}/>
                    <Route path ='/login' component={Login}/>
                    <Route path ='/cart' component={cart}/>
                </Switch>
            </PizzaLoader>
        </>
    );
}

export default App;
