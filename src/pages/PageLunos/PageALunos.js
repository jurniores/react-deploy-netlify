import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ComponentHome from '../../components/Alunos/AlunosContainer';
import CorpoHome from '../../components/util/corpoHome/corpoHome';
import { AiFillHome } from 'react-icons/ai';
import FotosALunos from '../../components/Alunos/Fotos/Fotos';
import axios from 'axios'



const PageHome = ({editaRota}) => {
    const [alteraAluno, setAlteraAluno] = useState(false);
    const [carregaPagina, setCarregapagina] = useState(9);
    const [dadosAlunos, setDadosAlunos] = useState({});
    const [abreFotos, setAbreFotos] = useState(false);
    const [fotosId, setFotosId] = useState([]);
    

    function DadosAlunos () {
       return setTimeout(() => {
        axios.get('http://35.247.214.192/alunos')
        .then(res => setDadosAlunos(res.data))
       }, 300); 
    }
    
    function ClickAbreFoto(id){
        setAbreFotos(!abreFotos)
        setFotosId(['validation'])
        
        if(typeof id === 'number'){
        
            setTimeout(()=>{
            axios.get(`http://35.247.214.192/alunos/${id}`)
        .then(res=>{

             setFotosId(res.data)
            
            })

        },300)    
        
        
        }
    }
    

   
    useEffect(()=>{
        DadosAlunos()
        setAlteraAluno(false)
        setDadosAlunos({})
        
    },[alteraAluno])
    

    return (
        <CorpoHome>
            <Link to="/" style={{
                marginBottom:'10px',
                display:"block",
                color:"white",
                fontSize:"30pt",
                
            }}><AiFillHome/></Link>
            {abreFotos?<FotosALunos dadosFoto={fotosId} abreFotos={abreFotos} ClickAbreFoto={ClickAbreFoto}/>:<></>}


            { dadosAlunos.length===0 && <strong>Não existem alunos cadastrados!</strong>}
            

            { typeof dadosAlunos.length === "undefined"?
            (<div>Carregando...</div>)
            :(
            dadosAlunos.map((valor) => {

             return (<ComponentHome editaRota={editaRota} alteraAluno={()=>{
                setAlteraAluno(true)
            }} ClickAbreFoto={ClickAbreFoto} key={valor.id} valor={valor}/>) 
             }
            
            )
            )}


            { dadosAlunos.length>7 && !abreFotos
                    &&
            <button onClick={()=>setCarregapagina(carregaPagina-4)}>Carregar mais</button>
            }
            
         
        </CorpoHome>
    )
}

export default PageHome;