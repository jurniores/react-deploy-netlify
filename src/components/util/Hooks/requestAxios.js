import axios from 'axios';
import { useState } from 'react';






export default function ControlaDados() {
    const [resolveDados, setResolveDados] = useState({})
  

    async function get(config){
        
        try{
            const Aw = await axios(config)
        setResolveDados(Aw.data)
        
    } catch (e) {
        if(e.response.data){
            const error  =e.response.data
            return setResolveDados(error)
        }
        
        return e
            
        }
        
          

            
            
       
        
    }
    
    return [get, resolveDados]
}

