import React, {useEffect, useState} from 'react';
import { Link, useParams, Redirect } from 'react-router-dom';
import './ComponentCadastro.css'
import requestAxios from '../util/Hooks/requestAxios';


const cadastroAlunos = {
    nome:'',
    sobrenome:'',
    idade:'',
    peso:'',
    email:"",
    altura:''
}
const configPut = {
    url:"http://35.247.214.192/alunos/",
    method:"POST",
    headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('user')
      },
      data:{}
    
 }


const ComponentCadastro = () => {



    const { id } = useParams()
    const [dadosDoAluno, setDadosDoAluno] = React.useState(cadastroAlunos)
    const [LocalStore, setLocalStore] = useState(localStorage.getItem('user'))
    const [voltaAlunos, setVoltaAlunos] = useState(false)
    const [save, resolve] = requestAxios()
    const [get, resolveGet] = requestAxios()

    
    
    function onChange(e) {
        
        setDadosDoAluno({
            ...dadosDoAluno,
            [e.target.name]:e.target.value
            
        })
        
        

        
    }
    

    function onSubmit(e){
        e.preventDefault()
        setDadosDoAluno(cadastroAlunos)
        
        if(id){
             save({...configPut, data:dadosDoAluno, method:"PUT",
              url:`http://35.247.214.192/alunos/${id}`,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
               'Authorization': 'Bearer ' + LocalStore
             },
            })
    
             return
        }
        save({...configPut, data:dadosDoAluno, 
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
               'Authorization': 'Bearer ' + LocalStore
             },})
        
        
    }
    useEffect(()=>{
       if(resolve.id && id)setVoltaAlunos(!voltaAlunos)
        
        if(id) {
          return   setDadosDoAluno(resolveGet)
        }
        
        setDadosDoAluno(cadastroAlunos)
        /* eslint-disable */
    },[resolveGet,setVoltaAlunos, resolve])


    useEffect(()=>{
        setLocalStore(localStorage.getItem('user'))
        if(id) {
            get({
                ...configPut,
                url:`http://35.247.214.192/alunos/${id}`,
                method:"GET"
            })
            
        }
    /* eslint-disable */
    },[])


    return (
        <div className="component-cadastro" onSubmit={onSubmit}>
            {voltaAlunos===true&&<Redirect to="/alunos"/>}
            
            {id?(
                <form  >
            <div className="div-navigation">
            Cria Aluno <Link to='/'>Home</Link>
             <Link  to="/alunos">Alunos</Link>
             </div>
            <label htmlFor="nome">Nome:</label><input onChange={onChange} name="nome"  defaultValue={dadosDoAluno.nome}  type="text"/>
            <label htmlFor="sobrenome">Sobrenome:</label><input onChange={onChange} name="sobrenome" defaultValue={dadosDoAluno.sobrenome} type="text"/>
            <label htmlFor="idade">Idade:</label><input name="idade" onChange={onChange} defaultValue={dadosDoAluno.idade} type="number" step='any'/>
            <label htmlFor="peso">Peso:</label><input name="peso" onChange={onChange} defaultValue={dadosDoAluno.peso} type="number" step='any'/>
            <label htmlFor="altura">Altura:</label><input name="altura" onChange={onChange} defaultValue={dadosDoAluno.altura} type="number" step='any'/>
            <label htmlFor="altura">email:</label><input name="email" onChange={onChange} disabled={id?true:false} defaultValue={dadosDoAluno.email} type="text"/>
            <label className="component-cadastro-foto" htmlFor="foto">Escolha Foto <small>Opicional</small></label><input id="foto" className="component-cadastro-img" name="foto"type="file"/>
            {resolve.length!=="undefined" && resolve.id && <strong style={{
                color:"blue",
                display:"block",
                marginBottom:"20px"
            }}>Aluno editado com sucesso! Redirecionando...</strong>}
            {resolve.errors&& <small style={{
                color:"red",
                display:"block",
                marginBottom:"20px"
            }}> {resolve.errors}</small>}
            <button type="submit">Enviar</button>
        </form>
            ):(
                <form  >
            <div className="div-navigation">
            Cria Aluno <Link to='/'>Home</Link>
             <Link  to="/alunos">Alunos</Link>
             </div>
            <label htmlFor="nome">Nome:</label><input onChange={onChange} name="nome"  value={dadosDoAluno.nome}  type="text"/>
            <label htmlFor="sobrenome">Sobrenome:</label><input onChange={onChange} name="sobrenome" value={dadosDoAluno.sobrenome} type="text"/>
            <label htmlFor="idade">Idade:</label><input name="idade" onChange={onChange} value={dadosDoAluno.idade} type="number" step='any'/>
            <label htmlFor="peso">Peso:</label><input name="peso" onChange={onChange} value={dadosDoAluno.peso} type="number" step='any'/>
            <label htmlFor="altura">Altura:</label><input name="altura" onChange={onChange} value={dadosDoAluno.altura} type="number" step='any'/>
            <label htmlFor="altura">email:</label><input name="email" onChange={onChange} disabled={id?true:false} value={dadosDoAluno.email} type="text"/>
            <label className="component-cadastro-foto" htmlFor="foto">Escolha Foto <small>Opicional</small></label><input id="foto" className="component-cadastro-img" disabled={true} name="foto"type="file"/>
            {resolve.length!=="undefined" && resolve.id && <small style={{
                color:"blue",
                display:"block",
                marginBottom:"20px"
            }}>Aluno criado com sucesso!</small>}
            {resolve.errors&& <small style={{
                color:"red",
                display:"block",
                marginBottom:"20px"
            }}> {resolve.errors}</small>}
            <button type="submit">Enviar</button>
        </form>
            )}
        
        </div>
    )
}

export default ComponentCadastro;