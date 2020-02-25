const express = require('express')
const router = express.Router()
const Contact = require('../models/contact')


router.get('/',async function(req,res){
    try{
        const contacts = await Contact.find()
        res.json(contacts)
    } catch(err) {
        res.status(500).json({message:err.message})

    }
    
})

router.post('/',async function(req,res){
    const contact = new Contact({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        company: req.body.company
    })
    try{
        const newContact = await contact.save()
        res.status(201).json(newContact)
        
    } catch (err) {
        res.status(400).json({message: err.message})

    }
})

router.get('/:id',getContact, async function(req,res){
    res.json(res.contact)
    
})

router.delete('/:id',getContact,function(req,res){
    try{
        res.contact.remove()
        res.json({message:"Contact has been deleted"})
    } catch (err) {
        res.status(400).json({message: err.message})
    }

    
})

router.patch('/:id', async function(req,res){
    if (req.body.name !=null){
        res.contact.name = req.body.name
    }
    if (req.body.email !=null){
        res.contact.email = req.body.email
    }
    if (req.body.phone !=null){
        res.contact.phone = req.body.phone
    }
    if (req.body.address !=null){
        res.contact.address = req.body.address
    }
    if (req.body.company !=null){
        res.contact.company = req.body.company
    }
    
    try{
        const updateContact = await res.contact.save()
        res.json(updateContact)
    
    } catch(err){
        res.status(400).json({message:err.message})

    }
})

async function getContact(req,res,next){
    let contact
    try{
        contact = await Contact.findById(req.params.id)
        if (contact== null){
            return res.status(404).json({message:"COntact with ID not found"})
        }
    } catch(err){
        return res.status(500).json({message:err.message})


    }
    res.contact = contact
    next()
}

module.exports=router