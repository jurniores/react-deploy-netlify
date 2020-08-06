import { combineReducers, createStore } from 'redux';

const dados = {
    logado: false,
    msg:''
}

function reducer (state=dados, action) {
    switch(action.type) {
        case 'LOGADO_SUCCESS':
              return {
                  ...dados, logado:true,
                  msg:"LOGADO COM SUCESSO!"
              }
    
        case 'DESLOGADO_SUCCESS': 
              return {
                  ...dados, logado:false
              }
        case 'DESLOGADO_LOGIN': 
              return {
                  ...dados, logado:true,
                  msg:"DESLOGADO COM SUCESSO!"
              }     
        default: return state
    }
}
function digaOi (state='OI', action) {
    if(action.type==='OI'){
        return 'EU DISSE OI'
    }
    return state
}


const rootReducer = combineReducers({
    ativamsg: reducer,
    fala: digaOi
})

export default createStore(rootReducer)