import './App.css';
import Card from './components/Card';
import About from './components/About';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import More from './components/More';
import React, { useEffect, useState } from 'react';
import Modale from './components/Modale';

function App() {
  
  const [id, setId] = useState(null);
  const [bascet, setBascet] = useState({
    bascet: null,
    sum: null
  });
  const [role, setRole] = useState("visitor");
  const [modale, setModale] = useState(false);
  // Логины и пароли для авторизации
  const users = {
    admin: {
      login: 'admin',
      password: 'admin'
    },
    user: {
      login: 'user',
      password: 'user'
    },
  }

  const linkListener = (e) => {
    return setId(() => e.target.id);
  };

  useEffect(() => {
    fetch("http://localhost:3000/bascet")
      .then(res => res.json())
      .then(result => {
        const bas = Object.assign(bascet, {bascet: result.bascet},{sum: result.sum});
        bascetSetter(bas);
      })

    fetch("http://localhost:3000/role")
      .then(res => res.json())
      .then(result => {
        setRole(() => 
        String(Object.values(result)).length > 0 ? 
        String(Object.values(result)) : 
        role);
      })
  }, []);

  const bascetSetter = (bas) => {
    setBascet(bas)
  }

  const loginHandler = () => {
    modale ? setModale(() => false) : setModale(() => true);
  }

  const loginButtonCreater = () => {
    if (role === "visitor" && modale === false) {
      return (
        <div className='login'>
          <button className='button button--modale' onClick={loginHandler}>Войти</button>
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
    if (modale) {
      return (
        <div className='login'></div>
      )
    }
  }

  const logoutHandler = () => {
    setRole(() => 'visitor');
    const currentRole = {current: 'visitor'}
            fetch(`http://localhost:3000/role`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(currentRole)
            });
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
              <div className='bascet'>В корзине {bascet.bascet}кг фруктов на сумму {bascet.sum} рублей</div> : 
              <div className='bascet'>Корзина пуста</div> 
        )
      }      
  }

  return (
    <Router>
      {modale && <Modale loginHandler={loginHandler} roleSetter={setRole} users={users} handler={loginHandler}/>} 
      <div className="App">
        {loginButtonCreater()}
        <div className='container container--main'>
        {<div className='role-panel'>Вы вошли как: <span className='role-panel__role'>{role}</span></div>}
          <h1 className='main-header'>Фруктовая лавка</h1>
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
                role={role}
                roleSetter={setRole}
                listener={linkListener}
                bascet={bascet}
                bascetListener={setBascet}
              />
            </Route>

            <Route exact path="/more" >
              <More
                role={role}
                roleSetter={setRole}
                thisId={id}
                bascet={bascet}
                bascetListener={setBascet}
              />
            </Route>


      </div>
    </Router>
  );
}

export default App;
