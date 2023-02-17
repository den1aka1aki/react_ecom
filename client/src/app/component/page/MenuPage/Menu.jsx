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
    const [isOpen, setOpen] = useState(false);
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
        const toggleMenu = () => {
            setOpen(prevState => !prevState);
        };
        const handlePizzaSelect = (item) => {
            if (searchQuery !== '') setSearchQuery('');
            setSelectedPizza(item);
        };
        return (
            <>
                <div className='container'>
                    <div className='search_space'>
                        <div className="dropdown w-25" onClick={toggleMenu}>
                            <button className="btn btn_rectangular w-100 dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Category
                            </button>
                            <div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')} aria-labelledby="dropdownMenuButton">
                                <GroupList
                                    selectedItem={selectedPizza}
                                    items={types}
                                    onItemSelect={handlePizzaSelect}/>
                            </div>
                        </div>
                        <input className = 'search_bar' onChange={handleSearchQuery} type='text' name='searchQuery' value={searchQuery} placeholder='Search...'/>
                        <Button className='btn btn_rectangular w-25' label='Clear' action={clearFilter}/>
                    </div>

                    <div className='container m-1'>

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
