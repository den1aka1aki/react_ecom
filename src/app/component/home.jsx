import React from 'react';
import mainImg from '../img/pizza-margherita.svg';
import pizzaImg from '../img/pizza.jpg';
import './home.css';

const Home = () => {
    return (
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
                <div className='card__pizza'>
                    <img className='card__pizza__img' alt='' src={pizzaImg}/>
                    <h4 className='card__pizza__title'>Cheese Lovers</h4>
                    <p className='card__pizza__discription'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    <h5 className='card__pizza__price__tag'>25$</h5>
                    <button className='card__pizza__cart__btn'>ADD TO CARD</button>
                </div>
                <div className='card__pizza'>
                    <img className='card__pizza__img' alt='' src={pizzaImg}/>
                    <h4 className='card__pizza__title'>Cheese Lovers</h4>
                    <p className='card__pizza__discription'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    <h5 className='card__pizza__price__tag'>25$</h5>
                    <button className='card__pizza__cart__btn'>ADD TO CARD</button>
                </div>
                <div className='card__pizza'>
                    <img className='card__pizza__img' alt='' src={pizzaImg}/>
                    <h4 className='card__pizza__title'>Cheese Lovers</h4>
                    <p className='card__pizza__discription'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    <h5 className='card__pizza__price__tag'>25$</h5>
                    <button className='card__pizza__cart__btn'>ADD TO CART</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
