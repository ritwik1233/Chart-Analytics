import axios from 'axios';

export function allFileData() {
    return function(dispatch){
    axios.get('/api/getDataSet').then(res=>{
        dispatch({
            type:"ALL_DATA",
            payload:res.data
        })
    }
    )}
};


export function selectData(data) {
    return{       
            type:"SELECT_DATA",
            payload:data
        
    }
};
export function removeSelectData() {
    return{       
            type:"REMOVE_SELECT_DATA"
    }
};