
const mongoose=require('mongoose');
const users=mongoose.model('users');
module.exports=(app)=>{
    app.get('/api/current_user',(req,res)=>{
        const id={_id:req.session.userID}
        users.findOne(id,{password:0,_id:0}).then(data=>{
                return res.send(data);
        }).catch(err=>{
                return res.sendStatus(500);
        })
    });
    app.get('/api/logout',(req,res)=>{
        req.session.destroy(err=>{
            if(err) {
               return res.sendStatus(500);
            } else {
               return res.sendStatus(200);
            }
        });
      })
    app.post('/api/login',(req,res)=>{
        if(req.session.userID!==undefined){
            req.session.destroy(err=>{
                if(err){
                   return res.sendStatus(500);
                }else {
                    users.findOne({email:req.body.email,password:req.body.password})
                    .then(data=>{
                        req.session.userID=data.id;
                        return  res.sendStatus(200)
                    }).catch(err=>{
                        return res.sendStatus(500); })
                }
            });
        } else {
            users.findOne({email:req.body.email,password:req.body.password})
                    .then(data=>{
                        req.session.userID=data.id;
                        return res.sendStatus(200)
                    }).catch(err=>{
                    return res.sendStatus(500);
                })
        }
    })
    app.post('/api/register',(req,res)=>{
        const data=req.body
        const User =new users({
            ...data,
        })
        users.find({email:req.body.email})
        .then(response=>{
            if(response.length===0) {
                User.save()
                .then(data=>{
                    return res.sendStatus(200)
                })        
            } else {
                return res.sendStatus(500)
            } 
        }).catch(err=>{
            res.sendStatus(400);
        })
    })
}