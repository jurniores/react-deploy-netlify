import React, { Fragment } from 'react';
import { useSelector} from 'react-redux';
import './index.css'
function Message () {

 const IsMessage = useSelector(state=>state.ativamsg)
 const oi = useSelector(state=>state.fala)
    console.log(oi)

    return ( IsMessage.logado&&(
     <Fragment>
        <div className="message-success">
            {IsMessage.msg}

        </div>
       
     </Fragment>
    )
        
    )
}

export default Message;