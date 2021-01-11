const express = require('express')
const Data = require('../models/data')
const router = new express.Router()


router.post('/', async(req, res) => {
    const data = new Data(req.body)

    try {
       await data.save()
        req.status(201).send({ data })
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/', async(req, res) => {
    const getAllData = await Data.find({})

    try{

        res.send(getAllData)

    }catch(e){
        console.log(e)
    }
})

router.put('/', async(req, res) => {
    const dataToUpdate = req.body
    const data = await Data.findOne({ name: dataToUpdate.name })
    data.address = dataToUpdate.address
    await Data.replaceOne({ name: dataToUpdate.name}, data)
    res.send(data)
})

router.delete('/', async(req, res) => {
    const dataToDelete = req.body
    const data = await Data.findOne({ name: dataToDelete.name })
    await Data.deleteOne({ name: dataToDelete.name })
    res.send(data)
})

module.exports = router