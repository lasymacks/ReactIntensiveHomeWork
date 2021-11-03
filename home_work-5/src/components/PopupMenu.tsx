import  React, { useCallback, useMemo, useState } from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
 
interface IPropsPopup {
   isOpen: boolean,
   id: number,
   setIsOpen: any,
   children: any
}

// const modalRootElement = document.querySelector("#modal");

// Привет, Макс! Я очень долго боролся с CreatePortal и сдался(на второй день), видимо уже так запутался,
// что распутаться не представляется возможным)) У меня вопрос, ответь пожалуйста когда 
// когда будешь проверять. Почему мой портал не вызывается с обновлением стейта?
// Я пробовал много разных вариантов, но ни один не сработал корректно. Я вроде бы все сделал
// верно, а перерендер не вызывал. В DevTools появлялся компонент, но был пустой.
// Думал обойдусь прост обновлением стейта, но ошибался. Заранее спасибо!
// P.S. Я специально оставил комменты кода от портала, чтобы ты смог посмотреть где я накосячил.

const PopupItem = (props: IPropsPopup) => {

    const isOpen = props.isOpen;
	const element = useMemo(() => document.createElement("div"), []);

	// useEffect(() => {
	// 	if (isOpen) {      
	// 		modalRootElement?.appendChild(element);
	// 	}
	// }, [isOpen]);

    // useEffect(() =>  {
    //     return () => {
    //         modalRootElement?.removeChild(element);
    //     };
    // }, [isOpen])

    const closeHandler = () => {
        props.setIsOpen(() => false)
    }

	if (isOpen) {
        // ReactDOM.createPortal
		return (
            <div className='popup-backgroung' onClick={closeHandler}>
                    {props.children}
            </div>
			// ,
			// element
		);
	}

	return null;
    
}

export default PopupItem;
