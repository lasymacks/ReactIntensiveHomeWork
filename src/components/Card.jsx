import React, { useState, useEffect } from 'react';
import '../App.css';

import { BrowserRouter as Router, Link } from 'react-router-dom';

const Card = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/goods")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
        )
    }, [])

    const bascetHandler = (event) => {
        const currentCard = items.reduce((acc, item) => {
            if (item.id === Number(event.target.id)) { 
                return Object.assign(acc, item);
            }
            return acc;
        }, {})
        
        currentCard.inStock = Number(currentCard.inStock) - 1;
        setItems(() => items.map((item => {
            if (item.id === Number(event.target.id)) {
                return Object.assign(item, currentCard);
            } else {
                return item;
            }
        })));

        const newBascet = (props.bascet.bascet += 1);
        const newSum = (props.bascet.sum += Number(currentCard.price));
        const newBascetValue = props.bascet;

        newBascetValue.bascet = newBascet;
        newBascetValue.sum = newSum;
        props.bascetListener({...props.bascet, newBascetValue});

        fetch(`http://localhost:3000/goods/${event.target.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(currentCard)
        });

        fetch(`http://localhost:3000/bascet`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newBascetValue)
        });
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div className='container'>
                {items.map(item => (
                    <div className='cardContainer' key={item.id}>
                        <div className='cardContainer__left'>
                            <img className='img' src={item.image}></img>
                        </div>
                        <div className='cardContainer__right'>
                            <h3 className='header'>{item.name}</h3>
                            <div className='price'>{item.price}р / кг</div>
                            <div className='description'><Link id={item.id} className='link' onClick={(e) => props.listener(e)} to={item.title}>Подробнее</Link></div>
                            {props.role === 'visitor' ?
                                <div className='description description-role'>Авторизуйтесь, чтобы добавить в корзину</div> :
                                item.inStock > 0 ? 
                                    <button className='button' id={item.id} onClick={(e) => bascetHandler(e)}>В корзину</button> :
                                    <div className='description notAvailable'>Нет в наличии!</div>
                            }
                        </div>
                        {items.inStock <= 0 && <div className='notAvailable notAvailable--card'>Нет в наличии!</div>}
                    </div>
                ))}

            </div>
        );
    }
}

export default Card;