var mongoose=require('mongoose');
var {Schema}=mongoose;

var fileSchema=new Schema({
    fileName:String,
    dataSetName:String,
    filePath:String,
    Date:String,
    userID:String,
});
mongoose.model('files',fileSchema);