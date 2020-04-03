const express = require('express');

const Action = require('./actionModel');

const router = express.Router();

router.get('/', (req, res) =>{
    Action.get()
        .then(action =>{
            res.status(200).json(action);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({msg: 'There was an error getting Actions'});
        });
});

router.get('/:id', checkId, (req, res) =>{
    Action.get(req.params.id)
        .then(action =>{
            res.status(200).json(action);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({msg: 'The action with the specified id does not exist'});
        });
});

router.post('/', validateBody, (req, res)=>{
    Action.insert(req.body)
        .then(action =>{
            res.status(201).json(action);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({errMsg: 'There was a problem inserting the action'});
        });
});

router.put('/:id', checkId, validateBody, (req, res)=>{
    Action.update(req.params.id, req.body)
        .then(action =>{
            res.status(201).json(action);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({errMsg: 'There was a problem updating the action'});
        });
});

router.delete('/:id', checkId, (req, res)=>{
    Action.remove(req.params.id)
        .then(action =>{
            res.status(200).json({msg: `action ${req.params.id} was removed`,action});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({errMsg: 'There was a problem removing the action'});
        });
});


function checkId(req, res, next){
    Action.get(req.params.id)
    .then(id =>{
        id ? next() : res.status(400).json({errMsg: 'Invalid Id'});
    });
}

function validateBody(req, res, next){
    const {description, notes, project_id} = req.body;

    if (!notes || !description || !project_id){
        res.status(400).json({errMsg:'Please enter required notes, project_id or description'});
    }else{
        next();
    }
}

module.exports = router;