import React from 'react';
import Header from './app/component/ui/header/header';
import { Route, Switch } from 'react-router-dom';
import Home from './app/component/page/HomePage/Home';
import Menu from './app/component/page/MenuPage/Menu';
import Delivery from './app/component/page/DeliveryPage/Delivery';
import Admin from './app/component/page/AdminPage/Admin';
import Login from './app/layouts/login';
import LogOut from './app/component/logOut';
import cart from './app/component/page/CartPage/cart';
import PizzaLoader from './app/component/ui/hoc/pizzaLoader';
import PizzaCard from './app/component/page/Pizza/PizzaCard/pizzaCard';
import ProtectedRoute from './app/component/common/protectedRoute';
import About from './app/component/page/AboutPage/About';
import UsersLoader from './app/component/ui/hoc/userLoader';
import EditPizzaPage from './app/component/page/Pizza/EditPizzaPage/EditPizzaPage';
import AddNewPizzaForm from './app/component/page/Pizza/AddNewPizza/addNewPizzaForm';
import AdminProtectedRouter from './app/component/common/adminProtectedRouter';
import { ToastContainer } from 'react-toastify';

function App () {
    return (
        <>
            <div>
                <PizzaLoader>
                    <UsersLoader>
                        <Header/>
                        <Switch>
                            <Route exact path ='/' component={Home}/>
                            <Route path ='/menu' component={Menu}/>
                            <Route path = '/pizza/:pizzaId?' component={PizzaCard}/>
                            <Route path ='/delivery' component={Delivery}/>
                            <Route path ='/about' component={About}/>
                            <Route path = '/logout' component={LogOut}/>
                            <Route path ='/login' component={Login}/>
                            <Route path ='/cart' component={cart}/>

                            <ProtectedRoute>
                                <AdminProtectedRouter path='/admin' component = {Admin}/>
                                <AdminProtectedRouter path='/addNewPizza' component = {AddNewPizzaForm}/>
                                <AdminProtectedRouter path='/edit/:pizzaId?' component={EditPizzaPage}/>
                            </ProtectedRoute>

                        </Switch>
                    </UsersLoader>
                </PizzaLoader>
                <ToastContainer/>
            </div>
        </>
    );
}

export default App;
