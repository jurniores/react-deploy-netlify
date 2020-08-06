import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import './AlunosContainer.css'
import Axius from  '../util/Hooks/requestAxios';

const configPut = {
    method:"",
    headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('user')
      },
      data:{}
    
 }

const HomeAlunos =  ({valor, ClickAbreFoto, alteraAluno, editaRota})=>{
    const [redirect, setRedirect] = useState('');
    const [get, resolve] = Axius();

    function altera(id) {

        if(id==="edit") {
            editaRota()
            return setRedirect('EDIT')
        }

        if(id!=='edit'){
            configPut.method = "DELETE"
            
            setRedirect(configPut.method)
             get({
                ...configPut,
                url:`http://35.247.214.192/alunos/${id}`,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                   'Authorization': 'Bearer ' + localStorage.getItem('user')
                 },
            })
               
           
        }

       
     return
            
    }
    
    useEffect(()=>{
        if(resolve.apagado){
            alteraAluno()
        } 
        if(resolve.errors) alert('Faça login' + resolve.errors)   
        
        /* eslint-disable */
    },[resolve])


    return (
        
    
        <div className="ContainerAlunos">
            
            {redirect==="EDIT" && <Redirect to={`/edit/${valor.id}`}/>}
            <h4>Nome: {` ${valor.nome}  ${valor.sobrenome}`}</h4>
            <ul>
            <li>Idade: {Number(valor.idade).toFixed(0)}</li>
            <li>Peso: {Number(valor.peso).toFixed(0)}</li>
            <li>Altura: {Number(valor.altura).toFixed(2)}</li>
            <li><button onClick={()=>ClickAbreFoto(valor.id)}>Fotos</button></li>
            </ul>
            {localStorage.getItem('user') && localStorage.getItem('user')!== 'undefined' && (
                    <div className="ContainerAlunos-botoes">
               
                    <button onClick={()=>{
                        
                        altera(valor.id)
                    }}>Deletar </button>
        
                    <button onClick={()=>(
                        altera('edit'))}>Editar</button>
                    </div>
                    )}
            
           
            
        </div>
        
    )
}

export default HomeAlunos;