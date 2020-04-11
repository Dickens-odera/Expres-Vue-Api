const User = require('../../models/Users')


module.exports = function(router){
    router.get('/user/:id', function(req, res){
        User.findById(req.params.id).exec()
        .then(docs => res.status(200)
            .json(docs))
        .catch(err => res.status(500)
            .json({
                message:'Error Finding Useer with the specified id',
                error:err
            }))
    })

    router.get('/user/email/:email', function(req, res){
        User.find({'email':req.params.email}).exec()
        .then(docs => res.status(200)
            .json(docs))
        .catch(err => res.status(500)
            .json({
                message:'Error Finding User',
                error:err
            }))
    })

    router.post('/user', function(req, res){
        let user = new User(req.body)
        user.save(function(err, user){
            if(err) return console.log(err)
            res.status(200).json(user)
        })
    })

    router.put('/user/:id', function(req, res){
        console.log(req.body)
        let qry = {_id : req.params.id}
        let doc  = {
            first:req.body.firstName,
            last:req.body.lastName,
            email:req.body.email,
            isActive:req.body.isActive
        }
        console.log(doc)
        User.update(qry, doc, function(err, respRaw){
            if(err) return console.log(err)
            res.status(200).json(respRaw)
        })
    })
}