const fileReducer=function(state={selectedData:{},allData:[],jsonData:[]},action){
    switch(action.type){
        case 'SELECT_DATA':
        return {...state,selectedData:action.payload}
        case 'REMOVE_SELECT_DATA':
        return {...state,selectedData:{}}
        case 'ALL_DATA':
        return {...state,allData:[...action.payload]}
        default:
        return state;
    }
}
export default fileReducer;