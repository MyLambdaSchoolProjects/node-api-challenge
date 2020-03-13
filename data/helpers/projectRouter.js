const express = require('express');
const Project = require('./projectModel');

const router = express.Router();

router.get('/', (req, res) =>{
    Project.get()
        .then(project =>{
            res.status(200).json(project);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({msg: 'There was an error getting Pojects'});
        });
});

router.get('/:id', checkId, (req, res) =>{
    Project.get(req.params.id)
        .then(project =>{
            res.status(200).json(project);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({msg: 'The project with the specified id does not exist'});
        });
});

router.get('/:id/actions', checkId, (req, res) =>{
    Project.getProjectActions(req.params.id)
        .then(project =>{
            res.status(200).json(project);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({msg: 'The project with the specified id does not exist'});
        });
});

router.post('/', validateBody, (req, res)=>{
    Project.insert(req.body)
        .then(post =>{
            res.status(201).json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({errMsg: 'There was a problem inserting the post'});
        });
});

router.put('/:id', checkId, validateBody, (req, res)=>{
    Project.update(req.params.id, req.body)
        .then(post =>{
            res.status(201).json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({errMsg: 'There was a problem updating the post'});
        });
});

router.delete('/:id', checkId, (req, res)=>{
    Project.remove(req.params.id)
        .then(post =>{
            res.status(200).json({msg: `post ${req.params.id} was removed`,post});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({errMsg: 'There was a problem removing the post'});
        });
});

function checkId(req, res, next){
    Project.get(req.params.id)
    .then(id =>{
        id ? next() : res.status(400).json({errMsg: 'Invalid Id'});
    });
}

function validateBody(req, res, next){
    const {name, description} = req.body;

    if (!name || !description){
        res.status(400).json({errMsg:'Please enter required name or description'});
    }else{
        next();
    }
}



module.exports = router;