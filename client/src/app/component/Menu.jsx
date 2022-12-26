import React, { useState, useEffect } from 'react';
import Pizza from './pizza';
import Footer from './footer/footer';
import GroupList from './common/groupList';
import './home/home.css';
import api from '../api';

const Menu = () => {
    const types = ['red', 'white', 'vegetarian'];
    const [selectedPizza, setSelectedPizza] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [pizza, setPizza] = useState([]);
    const clearFilter = () => {
        setSelectedPizza();
        setSearchQuery('');
    };
    useEffect(() => {
        api.pizzas.fetchAll().then((data) => setPizza(data));
    }, []);
    const handleSearchQuery = ({ target }) => {
        setSelectedPizza(undefined);
        setSearchQuery(target.value);
    };
    if (pizza) {
        function filterPizza (data) {
            const filteredPizza = searchQuery
                ? data.filter(
                    (pizza) =>
                        pizza.name
                            .toLowerCase()
                            .indexOf(searchQuery.toLowerCase()) !== -1
                )
                : selectedPizza
                    ? data.filter(
                        (pizza) =>
                            JSON.stringify(pizza.type) ===
                            JSON.stringify(selectedPizza)
                    )
                    : data;
            return filteredPizza.filter((u) => u._id !== pizza._id);
        }

        const filteredPizza = filterPizza(pizza);

        const handlePizzaSelect = (item) => {
            if (searchQuery !== '') setSearchQuery('');
            setSelectedPizza(item);
        };
        function myFunction () {
            document.getElementById('myDropdown').classList.toggle('show');
        }

        // Close the dropdown if the user clicks outside of it
        window.onclick = function (event) {
            if (!event.target.matches('.dropbtn')) {
                const dropdowns = document.getElementsByClassName('dropdown-content');
                let i;
                for (i = 0; i < dropdowns.length; i++) {
                    const openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        };

        return (
            <>
                <div className='container'>
                    <div className='search_space'>
                        <div className="dropdown">
                            <button onClick={myFunction} className="dropbtn">Category</button>
                            <div id="myDropdown" className="dropdown-content">
                                <GroupList
                                    selectedItem={selectedPizza}
                                    items={types}
                                    onItemSelect={handlePizzaSelect}/>
                            </div>
                        </div>
                        <input className = 'search_bar' onChange={handleSearchQuery} type='text' name='searchQuery' value={searchQuery} placeholder='Search...'/>
                        <button
                            className='card__pizza__cart__btn__search_space'
                            onClick={clearFilter}>
                        Clear
                        </button>
                    </div>

                    <div className='main__space'>

                        <div className='cards__placeholder'>

                            {filteredPizza.map((piz) => (
                                <Pizza key={piz._id} pizza ={piz}/>
                            ))}
                        </div>
                    </div>
                    <Footer/>
                </div>
            </>
        );
    }
    return 'Loading...';
};

export default Menu;
