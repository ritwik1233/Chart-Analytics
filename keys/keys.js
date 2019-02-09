var keys={}
if(process.env.NODE_ENV=='production'){
    var prod=require('./prod')
    keys=prod
} else{
    var dev=require('./dev')
    keys=dev
}
module.exports=keys