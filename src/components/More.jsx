import React, {useState, useEffect} from 'react';
import Form from './Form';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../redux';

const More = () => {

    const dispatch = useDispatch();
    const error = useSelector(state => state.more.error);
    const isLoaded = useSelector(state => state.more.isLoaded);
    const cards = useSelector(state => state.more.cards);
    const count = useSelector(state => state.more.count);
    const edit = useSelector(state => state.more.edit);

    const bascet = useSelector(state => state.app.bascet);
    const role = useSelector(state => state.app.role);
    const id = useSelector(state => state.card.id);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch({type: 'SET_IS_LOADED', payload: true});
                    dispatch({type: 'SET_CARDS', payload: result.reduce((acc, current) => {
                        if (current.id === Number(id)) {
                            Object.assign(acc, current);
                        }
                        return acc;
                    }, {})});
                },
                (error) => {
                    dispatch({type: 'SET_IS_LOADED', payload: true});
                    dispatch({type: 'SET_ERROR', payload: error});
                }
            )
    }, [])

    const buttonBascetCreater = () => {
        if (role === 'visitor') {
            return (
                <div className='description description-role'>
                    Авторизуйтесь, чтобы добавить в корзину
                </div>
            )
        } else {
            return (
                <button className='button button--more' id={cards.id} onClick={(e) => bascetHandler(e)}>В корзину</button>
            )
        }
    }

    const bascetHandler = (event) => {
        const newBascet = (count > 0 ? bascet.bascet += count : bascet.bascet += 1);
        let newSum = (count > 0 ? bascet.sum += (Number(cards.price) * count) : bascet.sum += Number(cards.price));
        newSum = Number(newSum.toFixed(2));

        dispatch({type: 'SET_BASCET', payload: {...bascet, bascet: newBascet, sum: newSum, goods: [...bascet.goods, id]}});

        dispatch({type: 'SET_COUNT', payload: 0});        
    }

    const cardBodyCreater = () => {
        if (edit) {
            return (
                <Form />
            )
        } else {
            return (
                <div className='cardContainer__right cardContainer__right--more'>
                    <h3 className='header header--more'>{cards.title}</h3>
                    <div className='description description--more'>{cards.description}</div>
                    <div className='price price--more'>{cards.price} $</div>
                    <div className='cardContainer__right__buttonsCont'>
                        <div className='counter-container'>
                            <button className='button button--counter' onClick={decrement}>-</button>
                            <span className='count'>{count}</span>
                            <button className='button button--counter'  onClick={increment}>+</button>
                        </div>
                        {buttonBascetCreater()}
                    </div>
                </div>
            )
        }
    }

    const editHandler = () => {
        if (id) {
            dispatch({type: 'SET_EDIT', payload: true});
        }
    }

    const increment = () => {
        dispatch({type: 'SET_COUNT', payload: count + 1});
    }

    const decrement = () => {
        if (count > 0) {
            dispatch({type: 'SET_COUNT', payload: count - 1});
        }
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div className='container'>
                <div className='cardContainer cardContainer--more'>
                    {role === 'admin' && <button className='button button--edit' onClick={editHandler}>Редактировать</button>}
                    <div className='cardContainer__left cardContainer__left--more'>
                        <img className='img img--more' src={cards.image}></img>
                    </div>
                    {cardBodyCreater()}
                </div>
            </div>
        )
    }
}

export default More;