import React, { useState, useEffect } from 'react';
import '../App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../redux';

const Card = (props) => {

    const dispatch = useDispatch();
    const error = useSelector(state => state.card.error);
    const isLoaded = useSelector(state => state.card.isLoaded);
    const card = useSelector(state => state.card.card);
    const bascet = useSelector(state => state.app.bascet);
    const role = useSelector(state => state.app.role);


    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
          .then(res => res.json())
          .then(
            (result) => {
                dispatch({type: 'SET_ISLOADED', payload: true});
                dispatch({type: 'SET_CARD', payload: result});
            },
            (error) => {
                dispatch({type: 'SET_ISLOADED', payload: true});
                dispatch({type: 'SET_ERROR', payload: error});
            }
        )
    }, [])

    const bascetHandler = (event) => {
        const currentCard = card.reduce((acc, item) => {
            if (item.id === Number(event.target.id)) { 
                return Object.assign(acc, item);
            }
            return acc;
        }, {})

        const newBascet = (bascet.bascet += 1);
        let newSum = (bascet.sum += Number(currentCard.price));
        newSum = Number(newSum.toFixed(2));

        dispatch({type: 'SET_BASCET', payload: {...bascet, bascet: newBascet, sum: newSum, goods: [...bascet.goods, event.target.id]}})
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div className='container'>
                {card.map(item => (
                    <div className='cardContainer' key={item.id}>
                        <div className='cardContainer__left'>
                            <img className='img' src={item.image}></img>
                        </div>
                        <div className='cardContainer__right'>
                            <h3 className='header'>{item.title}</h3>
                            <div className='price'>{item.price} $</div>
                            <div className='description'><Link id={item.id} className='link' onClick={(e) => props.listener(e)} to='/more'>Подробнее</Link></div>
                            {role === 'visitor' ?
                                <div className='description description-role'>Авторизуйтесь, чтобы добавить в корзину</div> :
                                <button className='button' id={item.id} onClick={(e) => bascetHandler(e)}>В корзину</button> 
                            }
                        </div>
                        {card.inStock <= 0 && <div className='notAvailable notAvailable--card'>Нет в наличии!</div>}
                    </div>
                ))}

            </div>
        );
    }
}

export default Card;