import React,{useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import './Fotos.css'

const tipo = [{
    url:'valida'
},
]


const FotosAlunos = ({ClickAbreFoto, dadosFoto, abreFotos}) => {
    const [valida, setValida] =useState(tipo)
    const {Fotos} = dadosFoto;

    
    useEffect(()=>{

        if(Fotos){
           setValida(Fotos)
        }
        
    },[Fotos])
   
    
    return ReactDOM.createPortal(
        <div className="ContainerFotos">
                
                
                <div className="containerFotos__img">
                <span onClick={()=>{
                    ClickAbreFoto(false)
                }}>X</span>
                {typeof valida[0] !== 'undefined' 
                && 
                valida[0].url!=='valida'?
                (
                     valida.map((valor)=>(

                <ul key={valor.url}>
                    <li><img src={valor.url} alt="Fotos"/></li>
                </ul>
                )))
                :
                <div>
                    {abreFotos===true && typeof valida[0] !== 'undefined'?'Carregando...':<div><h4>Usuário não possui imagens</h4> <a href="/creat/image"> Inserir Imagem</a></div>}
                    
                 </div>}
                
                
                </div>
            
        </div>,
        document.getElementById('FotosAlunos')
    )
}

export default FotosAlunos;