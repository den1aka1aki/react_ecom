import React, { useEffect, useState } from 'react';
import mainImg from '../../img/pizza-margherita.svg';
import './home.css';
import Footer from '../footer/footer';
import Pizza from '../pizza';
import api from '../../api';
const Home = () => {
    const [pizza, setPizza] = useState([]);
    useEffect(() => {
        api.pizzas.fetchAll().then((data) => setPizza(data));
    }, []);
    return (
        <>
            <div className='container'>
                <div className='main__space'>
                    <div className='main__text'>
                        <h1 className='title__main__page'>We Have The <b>Best pizza!</b></h1>
                        <p className='subTitle__main__page'>Time to enjoy our delicious pizza.</p>
                        <button className='btn__main__order'>Order Online</button>
                    </div>
                    <div className='main__img'>
                        <img className='main__photo' src={mainImg} alt=""/>
                    </div>
                </div>
                <div className='main__top__text'>Trending Recipes</div>
                <div className='cards__placeholder'>
                    {pizza.map((piz) => (
                        piz.vote >= 4
                            ? <Pizza key={piz._id} pizza ={piz}/>
                            : null
                    ))}
                </div>
                <Footer/>
            </div>
        </>
    );
};

export default Home;
