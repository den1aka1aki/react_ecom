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
import PizzaSpecification from './app/component/pizzaPage/pizzaSpecification';
import ProtectedRoute from './app/component/common/protectedRoute';
import About from './app/component/About';
import UsersLoader from './app/component/userLoader';

function App () {
    return (
        <>
            <PizzaLoader>
                <Header/>
                <Switch>
                    <Route exact path ='/' component={Home}/>
                    <Route path ='/menu' component={Menu}/>
                    <Route path = '/pizza/:pizzaId?' component={PizzaSpecification}/>
                    <Route path ='/delivery' component={Delivery}/>
                    <Route path ='/about' component={About}/>
                    <Route path = '/logout' component={LogOut}/>
                    <Route path='/manager' component={Manager}/>
                    <Route path ='/login' component={Login}/>
                    <Route path ='/cart' component={cart}/>
                    <UsersLoader>
                        <ProtectedRoute isAdmin={true} path='/admin' component = {Manager}/>
                    </UsersLoader>

                </Switch>
            </PizzaLoader>
        </>
    );
}

export default App;
