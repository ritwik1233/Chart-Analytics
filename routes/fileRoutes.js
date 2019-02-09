const mongoose=require('mongoose');
const files=mongoose.model('files');
const path=require('path')
const csv=require("csvtojson");
const fs=require('fs');
module.exports=(app)=>{
    app.post('/api/fileupload',(req,res)=>{
        let uploadFile = req.files.file
        const dir=path.join(__dirname+'/../'+'/data')
        const fileName=Date.now().toString()
        let Files=new files({
            fileName:fileName+'.csv',
            dataSetName:req.files.file.name,
            filePath:dir,
            Date:Date.now().toString(),
            userID:req.session.userID
        })
        Files.save()
        .then(data=>{
            uploadFile.mv(`${dir}/${fileName}.csv`,(err)=>{
            if (err) {
                return res.status(500)
            }
                return res.sendStatus(200)
            })
            }).catch(err=>{
                  return res.sendStatus(500)
            })        
    })
    app.get('/api/deleteDataSet',(req,res)=>{
        files.findByIdAndDelete(req.query._id)
        .then(data=>{
            const filePath=data.filePath+'/'+data.fileName
            fs.unlink(filePath,(err)=>{
                if(!err){  
                    res.sendStatus(200)
                } else {
                    res.sendStatus(500)
                }
            })
        })
        .catch(err=>{
            console.log(err)
            res.send(err)
        })
    })
    app.get('/api/getDataSet',(req,res)=>{
          
        files.find({userID:req.session.userID},{filePath:0,userID:0}).then(response=>{
            return res.send(response)
        }).catch(err=>{
            return res.sendStatus(500)
        })        
    })
    app.get('/api/getEachData',(req,res)=>{   
        files.find({$and:[{fileName:req.query.fileName},{userID:req.session.userID}]})
        .then(data=>{
            const filePath=data[0].filePath+'/'+data[0].fileName
            csv().fromFile(filePath)
            .then(jsonData=>{
                return res.send(jsonData)
            }).catch(err=>{
                return res.sendStatus(500)
            })
        }).catch(err=>{
            return res.sendStatus(500)
        })
        
    })   
} 
