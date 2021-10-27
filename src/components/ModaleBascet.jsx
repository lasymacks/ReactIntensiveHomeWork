import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../redux';

const ModaleBascet = () => {

    const dispatch = useDispatch();
    const bascet = useSelector(state => state.app.bascet);
    const card = useSelector(state => state.card.card);

    const closeHandler = () => {
        dispatch({type: 'SET_MODALE_BASCET', payload: false});
    }

    const createBascetItem = (id) => {
        const currentCard = card.reduce((acc, item) => {
            if (item.id === Number(id)) { 
                return Object.assign(acc, item);
            }
            return acc;
        }, {})

        const countTheAmount = () => {
            const count = bascet.goods.filter(elem => elem === String(id));
            return count.length;
        }

        return (
            <div className='bascet-container' id={currentCard.id}>
                <div className='bascet-container__left'>
                    <img className='img' src={currentCard.image}></img>
                </div>
                <div className='bascet-container__right'>
                    <h4 className='header header--bascet'>{currentCard.title}</h4>
                    <div className='price price--bascet'>{currentCard.price} $</div>
                </div>
                <div className='bascet-container__right__number'>{countTheAmount()} шт.</div>
            </div>
        )
    }

    const filteredBascet = Array.from(new Set(bascet.goods));

    return (
        <div className='modale-container modale-container--bascet'>
            <div className='modale-container__bascet'>
                {filteredBascet.map(item => createBascetItem(item))}
                <div className='modale-container__total'>Итого: {bascet.sum} $</div>
                <button className='modale-container__button' type='button' onClick={closeHandler}> X </button>
            </div>
            
        </div>
    )
}

export default ModaleBascet;