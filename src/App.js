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
  const [loaded, setLoaded] = useState(false);
  const [role, setRole] = useState('visitor');
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
  const [modale, setModale] = useState(false);


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

  }, [bascet]);

  const bascetSetter = (bas) => {
    setLoaded(() => true);
    setBascet(bas)
    setLoaded(() => false);
  }

  const loginHandler = () => {
    modale ? setModale(() => false) : setModale(() => true);
  }

  return (
    <Router>
      {modale && <Modale users={users} handler={loginHandler}/>} 
      <div className="App">
        {!modale && 
          <div className='login'>
            <button className='button button--modale' onClick={loginHandler}>LogIn</button>
          </div>
        }
        <div className='container container--main'>
          <h1 className='header main-header'>Фруктовая лавка</h1>
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

          {bascet.bascet > 0 ? <div className='bascet'>В корзине {bascet.bascet} товаров на сумму {bascet.sum} рублей</div> : <div className='bascet'>Корзина пуста</div>}
          
        </div>
      

          <Route exact path="/about">
            <About />
          </Route>

            <Route exact path="/" >
              <Card
                listener={linkListener}
                bascet={bascet}
                bascetListener={setBascet}
              />
            </Route>

            <Route exact path="/more" >
              <More
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
