import React from 'react';
import Header from './app/component/ui/header/header';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './app/component/page/HomePage/Home';
import Menu from './app/component/page/MenuPage/Menu';
import Admin from './app/component/page/AdminPage/Admin';
import Login from './app/layouts/login';
import LogOut from './app/component/logOut';
import cart from './app/component/page/CartPage/cart';
import PizzaLoader from './app/component/ui/hoc/pizzaLoader';
import PizzaCard from './app/component/page/Pizza/PizzaCard/pizzaCard';
import ProtectedRoute from './app/component/common/protectedRoute';
import UsersLoader from './app/component/ui/hoc/userLoader';
import EditPizzaPage from './app/component/page/Pizza/EditPizzaPage/EditPizzaPage';
import AddNewPizzaForm from './app/component/page/Pizza/AddNewPizza/addNewPizzaForm';
import AdminProtectedRouter from './app/component/common/adminProtectedRouter';
import { ToastContainer } from 'react-toastify';
import MissingPage from './app/component/page/404Page/missingPage';
import About from './app/component/page/AboutPage/About';

function App () {
    return (
        <>
            <div>
                <PizzaLoader>
                    <UsersLoader>
                        <Header/>
                        <Switch>
                            <Route exact path ='/' component={Home}/>
                            <Route exact path ='/menu' component={Menu}/>
                            <Route exact path = '/pizza/:pizzaId?' component={PizzaCard}/>
                            <Route exact path ='/delivery' component={MissingPage}/>
                            <Route exact path ='/about' component={About}/>
                            <Route exact path = '/logout' component={LogOut}/>
                            <Route exact path ='/login' component={Login}/>
                            <Route exact path ='/cart' component={cart}/>
                            <ProtectedRoute >
                                <AdminProtectedRouter>
                                    <Route exact path='/admin' component = {Admin}/>
                                    <Route exact path='/addNewPizza' component = {AddNewPizzaForm}/>
                                    <Route exact path='/edit/:pizzaId?' component={EditPizzaPage}/>
                                </AdminProtectedRouter>
                            </ProtectedRoute>
                            <Redirect to='/'/>
                        </Switch>
                    </UsersLoader>
                </PizzaLoader>
                <ToastContainer/>
            </div>
        </>
    );
}

export default App;
