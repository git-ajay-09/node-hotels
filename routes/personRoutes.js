const express = require('express')
const router = express.Router()
const Person = require('./../models/person')

router.get('/', async (req, res) => {
    try {
        const data = await Person.find()
        console.log('data fetched')
        res.status(200).json(data)
    } catch (err) {
        console.log('Error while fetching the data', err)
        res.status(500).json({ err: 'Internal server Error' })
    }
})

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newPerson = new Person(data)
        const savedPerson = await newPerson.save()
        console.log('Data saved successfully')
        res.status(200).json(savedPerson)
    } catch (err) {
        console.log('Error while Saving the data', err)
        if (err.code === 11000) {   // 11000 → duplicate key error code
            res.status(400).json({ error: 'Email already exists!' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
})

//parameterised urls
router.get('/:worktype', async (req, res) => {
    try {
        const work = req.params.worktype;
        if (work == 'chef' || work == 'waiter' || work == 'manager') {
            const response = await Person.find({ work: work });   // ✅ DB se data fetch
            res.status(200).json(response);                       // ✅ HTTP response bhej raha hai

        }
        else {
            res.status(404).json('Page not Found')
        }
    } catch (err) {
        console.log('Error while fetching data')
        res.status(500).json({ err: 'Internal Server Error' })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const updated_Data = req.body
        const response = await Person.findByIdAndUpdate(_id, updated_Data, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        });
        if (!response) {
            res.status(404).json('Page not Found')
        }
        res.status(200).json(response)
    } catch (err) {
        console.log('Error while fetching and updating Data')
        res.status(500).json({ err: 'Internal Server Error' })
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const _id = req.params.id;
        const response = await Person.findOneAndDelete(_id);
        if (!response) {
            res.status(404).json('page not found')
        }
        console.log('Person deleted successfully')
        res.status(200).json(response)
    }catch(err){
        console.log('Error While deleting the data')
        res.status(500).json({err : 'Internal server error'})
    }
})


module.exports = router;