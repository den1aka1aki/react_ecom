import React from 'react';
import mainImg from '../../../img/pizza-margherita.JPG';
import './home.css';
import Footer from '../../ui/footer/footer';
import Pizza from '../Pizza/Pizzas/pizza';
import { useSelector } from 'react-redux';
import { getPizzas } from '../../../store/slices/pizzaSlice';
import { Link } from 'react-router-dom';

const Home = () => {
    const pizza = useSelector(getPizzas());
    return (
        <>
            {pizza && mainImg && (
                <div className='container'>
                    <div className='main__space'>
                        <div className='main__text'>
                            <h2 className='title__main__page'>We Have The <b>Best pizza!</b></h2>
                            <p className='subTitle__main__page'>Time to enjoy our delicious pizza.</p>
                            <Link to="/menu">
                                <button className='btn'>Order Online</button>
                            </Link>
                        </div>
                        <div className='main__img'>
                            <img className='main__photo' src={mainImg} alt="Loading"/>
                        </div>
                    </div>
                    <div className='main__top__text'>Trending Recipes</div>
                    <div className='cards__placeholder'>
                        {pizza.map((piz) => (
                            piz.vote >= 4
                                ? <Pizza key={piz._id} pizza ={piz}></Pizza>
                                : null
                        ))}
                    </div>
                    <Footer/>
                </div>
            )}
        </>

    );
};

export default Home;
