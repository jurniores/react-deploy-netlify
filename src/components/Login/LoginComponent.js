import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import Axius from '../util/Hooks/requestAxios';
import { Link, Redirect} from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import './LoginComponent.css'

import { ativaMSG, desativaMSG } from '../store/actions'




const configLogin = {
    email:'',
    password:''
}
const configRequest= {
    url:"http://35.247.214.192/tokens/",
    method:"POST",
    headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      data:{}
}

const Login = () =>{
    const [Login, resolveLogin] = Axius();
    const [dadosLogin, setDadosLogin] = useState(configLogin)
    
    const dispatch = useDispatch()



    function recebe(e){
        setDadosLogin({
            ...dadosLogin,
            [e.target.name]:e.target.value,
             
            
        })
        
        
    }

    

    function loga(e){
        e.preventDefault()
        Login({
            ...configRequest, data:{...dadosLogin}
        })
        
        
    }

    useEffect(()=>{
        if(resolveLogin.token) {
            localStorage.setItem('user',resolveLogin.token)
            dispatch(ativaMSG())
            setTimeout(()=>{
                dispatch(desativaMSG())
            },2000)
        }
        /*eslint-disable */
    },[resolveLogin])

    return (
        <div className="component-login">
            <Link to="/" title="Home" style={{
                color:"white"
            }}><AiFillHome/></Link>
            {resolveLogin.token&&<Redirect to="/" />}
            {/*Usando redux na pagina de login*/} <div>Login</div>
            <form>
                <input  onChange={recebe} name="email" value={dadosLogin.email} type="text"/>
                <input  onChange={recebe} name="password" value={dadosLogin.password} type="password"/>
                <input  onChange={recebe} onClick={loga} type="submit"/>
                
            </form>
        </div>
    )

}

export default Login;