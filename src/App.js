import React,{useState, useEffect} from 'react';
import {Switch, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';

import Store from './components/store/index'
import Alunos from './pages/PageLunos/PageALunos';
import Error from './pages/Error/PageError'
import Home from './pages/Home/PageHome'
import PageCadastro from './pages/Cadastro/PageCadastro'
import PageLogin from './pages/Login/PageLogin'
import Messages from './components/Message'



let audio

const App = function() {
    const [RouteEdit, setRouteEdit] = useState(false)
    const [play, setPlay] = useState(false)

    
        function desligaAdui (){
            setPlay(!play)
            audio.muted=true
            
        }

        useEffect(()=>{
            
        audio = new Audio('/public/scorpions.mp3');
        audio.load()
        audio.play();
        audio.muted = play
        /*eslint-disable */
        },[play])
    

    
    return(
        <Provider store={Store}>
        <BrowserRouter> 
        
            <button style={{
                width:'200px',
                height:"30px",
                border:'unset',
                borderRadius: "8px",
                background: 'linear-gradient(#8ED9E5,#B7E7EF)',
                fontStyle:'italic',
                fontWeight: 600,
            }} onClick={desligaAdui}>{play?'Ouvir áudio': 'Parar áudio'}</button>
            
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/alunos"  render={props=><Alunos editaRota={()=>{
                    setRouteEdit(true)
                }}/>}  />
                <Route exact path="/cadastro" component={PageCadastro}/>
                {RouteEdit &&  <Route exact path="/edit/:id" component={PageCadastro}/> }
                <Route exact path="/login" component={PageLogin}/>
                <Route path="*" component={Error}/>
            </Switch>
            <Messages />
        </BrowserRouter>
        </Provider>
    )
}

export default App;