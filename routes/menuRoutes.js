const express = require('express')
const router = express.Router();
const Menu = require('./../models/menu')

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newMenu = new Menu(data)
        const savedMenu = await newMenu.save()
        console.log('data stored successfully', savedMenu)
        res.status(200).json(savedMenu)
    } catch (err) {
        console.log('Error while saving data', err)
        res.status(500).json({ err: 'Internal Server Error' })
    }
})
router.get('/', async (req, res) => {
    try {
        const menus = await Menu.find()
        console.log('Data Fetched successfully')
        res.status(200).json(menus)
    } catch (err) {
        console.log('Error while fetching the data')
        res.status(500).json({ err: 'Internal server error' })
    }
})

router.get('/:taste', async(req, res)=>{
    try{
        const taste = req.params.taste;
        if(taste == "Spicy" || taste == "Sour" || taste == "Sweet"){
            const response = await Menu.find({taste : taste})
            console.log('Data Fetched Successfully')
            res.status(200).json(response)
        }
        else{
            res.status(404).json('Page Not Found')
        }
    }catch(err){
        console.log('Error while Fetching the data')
        res.status(500).json({err : 'Internal server error'})
    }
})

//: Create a PUT Method API to update the MenuItem Records 
router.put('/:id', async(req, res) =>{
    try{
        const _id = req.params.id;
        const data_to_update = req.body;
        const response = await Menu.findByIdAndUpdate(_id, data_to_update);
        if(!response) res.status(404).json('Invalid Request')
        console.log('Data Updated Successfully')
        res.status(200).json(response)
    }catch(err){
        console.log('Error while updating data')
        res.status(500).json({err : 'Internal server error'})
    }
})
//Create a DELETE Method API to delete the MenuItem Records  

router.delete('/:id', async(req, res) =>{
    try{
        const _id = req.params.id;
        const response = await Menu.findByIdAndDelete(_id);
        if(!response) res.status(404).json('Page Not Found')
        console.log('Data deleted successfully')
        res.status(200).json(response)
    }catch(err){
        console.log('Error while deleting data')
        res.status(500).json({err : 'Internal server error'})
    }
})

module.exports = router;



