import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import './HomeComponent.css'
import { FaRegIdBadge, FaRegIdCard } from 'react-icons/fa'
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { AiOutlineLogin } from 'react-icons/ai';
import {desativaMSG, deslogaLogin} from '../store/actions'



const user = localStorage.getItem('user')



const ComponentHome = () => {
    const [userSt, setUseSt] = useState(user);
    const [trua, setTrua] = useState(false);
    const dispatch = useDispatch()



    useEffect(()=>{
        setUseSt(localStorage.getItem('user'))
        setTrua(!trua)
        /*eslint-disable */
    },[userSt])

    return (
        <header className="headerHome">
            <div className="headerHome-div"><h1 style={{
                color:"white"
            }}>Home Escolar</h1></div>
            <ul className="headerHome-ul">
                <li><Link title="Cadastrar aluno" to="/cadastro"><FaRegIdCard/></Link></li>
                <li><Link title="Ver alunos cadastrados" to="/alunos"><FaRegIdBadge/></Link></li>
                {userSt!==null?(
                    <li style={{
                        color:'white'
                    }} title="Sair" onClick={()=>{
                        
                        if(!localStorage.getItem('user')){
                            return
                        }
                         
                        localStorage.removeItem('user')
                        setUseSt(null)
    
                        dispatch(deslogaLogin())
                        dispatch({type:'OI'})
                        setTimeout(()=>{
                            dispatch(desativaMSG())
                        },2000)
                    }}><RiLogoutBoxRLine/></li>
                ):(
                    <li><Link title="Fazer login" to="/login"><AiOutlineLogin/></Link></li>
                )}
                
                
                
            </ul>
        </header>
    )
}

export default ComponentHome;