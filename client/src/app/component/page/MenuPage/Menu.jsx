import React, { useState } from 'react';
import Pizza from '../Pizza/Pizzas/pizza';
import Footer from '../../ui/footer/footer';
import GroupList from '../../common/groupList';
import './menu.css';
import { useSelector } from 'react-redux';
import { getDataStatus, getPizzas, getPizzasLoadingStatus } from '../../../store/slices/pizzaSlice';
import Button from '../../common/Button/button';

const Menu = () => {
    const types = ['red', 'white', 'vegetarian'];
    const [selectedPizza, setSelectedPizza] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const pizza = useSelector(getPizzas());
    const pizzasLoading = useSelector(getPizzasLoadingStatus());
    const pizzasStatus = useSelector(getDataStatus());
    const clearFilter = () => {
        setSelectedPizza();
        setSearchQuery('');
    };
    const handleSearchQuery = ({ target }) => {
        setSelectedPizza(undefined);
        setSearchQuery(target.value);
    };
    if (pizza && !pizzasLoading && pizzasStatus) {
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
                            <Button action={myFunction} className="dropbtn" label='Category'></Button>
                            <div id="myDropdown" className="dropdown-content">
                                <GroupList
                                    selectedItem={selectedPizza}
                                    items={types}
                                    onItemSelect={handlePizzaSelect}/>
                            </div>
                        </div>
                        <input className = 'search_bar' onChange={handleSearchQuery} type='text' name='searchQuery' value={searchQuery} placeholder='Search...'/>
                        <Button className='dropbtn' label='Clear' action={clearFilter}/>
                    </div>

                    <div className='main__space'>

                        <div className='cards__placeholder'>

                            {filteredPizza.map((piz) => (
                                <Pizza key={piz._id} pizza ={piz}></Pizza>
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
