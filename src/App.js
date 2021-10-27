import './App.css';
import Card from './components/Card';
import About from './components/About';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import More from './components/More';
import React, { useEffect } from 'react';
import Modale from './components/Modale';
import { useDispatch, useSelector } from 'react-redux';
import ModaleBascet from './components/ModaleBascet';
import RegistrationModale from './components/RegistrationModale';

function App() {

  const dispatch = useDispatch();
  const bascet = useSelector(state => state.app.bascet);
  const role = useSelector(state => state.app.role);
  const modale = useSelector(state => state.app.modale);
  const registrationModale = useSelector(state => state.app.registrationModale);
  const modaleBascet = useSelector(state => state.app.modaleBascet);
  const isLoaded = useSelector(state => state.card.isLoaded);

  const linkListener = (e) => {
    return dispatch({type: "SET_ID", payload: e.target.id})
  };

  useEffect(() => {
    fetch('https://fakestoreapi.com/users')
      .then(res => res.json())
      .then(result => dispatch({type: 'SET_USERS' ,payload: result}))
  }, []);

  const loginHandler = () => {
    modale ? dispatch({type: 'SET_MODALE', payload: false}) : dispatch({type: 'SET_MODALE', payload: true});
  }

  const registrationHandler = () => {
    registrationModale ? dispatch({type: 'SET_REGISTRATION_MODALE', payload: false}) : dispatch({type: 'SET_REGISTRATION_MODALE', payload: true});
  }

  const loginButtonCreater = () => {
    if (!isLoaded) {
      return (
        <div className='login'></div>
      )
    }
    if (role === "visitor" && modale === false) {
      return (
        <div className='login'>
          <button className='button button--modale' onClick={loginHandler}>Войти</button>
          <button className='button button--registration' onClick={registrationHandler}>Регистрация</button>
        </div>
      )
    }
    if (role !== "visitor" && modale === false) {
      return (
        <div className='login'>
          <button className='button button--modale' onClick={logoutHandler}>Выйти</button>
        </div>
      )
    }
    if (modale || isLoaded) {
      return (
        <div className='login'></div>
      )
    }
  }

  const logoutHandler = () => {
    dispatch({type: 'SET_ROLE', payload: 'visitor'})
    const currentRole = {current: 'visitor'}
            fetch(`http://localhost:3000/role`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(currentRole)
            });
  }

  const getNoun = (number, one, two, five) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  }

  const bascetCreater = () => {
      if (role === 'visitor') {
        return (
          <div className='bascet'></div>
        )
      } 
      if (role !== 'visitor') {
        return (
          bascet.bascet > 0 ?
              <div className='bascet' 
                onClick={modaleBascetHandler}>
                В корзине {bascet.bascet} {getNoun(bascet.bascet, 'позиция', 'позиции', 'позиций')} на сумму {bascet.sum} $
                </div> : 
                <div className='bascet'>Корзина пуста</div> 
        )
      }      
  }

  const modaleBascetHandler = () => {
    dispatch({type: 'SET_MODALE_BASCET', payload: true});
  }

  return (
    <Router>
      {modale && <Modale loginHandler={loginHandler} handler={loginHandler}/>} 
      {modaleBascet && <ModaleBascet />}
      {registrationModale && <RegistrationModale />}
      <div className="App">
        {loginButtonCreater()}
        <div className='container container--main'>
        {<div className='role-panel'>Вы вошли как: <span className='role-panel__role'>{role}</span></div>}
          <h1 className='main-header'>Интернет магазин</h1>
          <nav>
            <ul className='list'>
              <li className='list__elem'>
                <Link className='link list__link' to='/'>Главная</Link>
              </li>
              <li className='list__elem'>
                <Link className='link list__link' to='/about'>О магазине</Link>
              </li>
            </ul>
          </nav>
          {bascetCreater()}
        </div>
      
          <Route exact path="/about">
            <About />
          </Route>

          <Route exact path="/" >
            <Card 
              listener={linkListener}
            />
          </Route>

          <Route exact path="/more" >
            <More />
          </Route>

      </div>
    </Router>
  );
}

export default App;
