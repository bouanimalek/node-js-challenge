const express = require('express');
const router = express.Router();
const Tutorial = require('../models/tutorialSchema');

// get all Tutorials
router.get('/tutorials', async(req, res) => {
    const tutorials = await  Tutorial.find({});
    res.json(tutorials);
})

// get tutorial by son id
router.get('/tutorials/:id', async(req, res) => {
    const tutorial = await Tutorial.findById(req.params.id);
    res.json(tutorial);
})

//  ajouter un nouveau tutorial 
router.post('/tutorials', async(req, res) => {
    const newTutorial = await Tutorial.create(req.body);
    res.json(newTutorial);
})

// modifier un tutorial
router.put('/tutorials/:id', async(req, res) => {
    const updatedTutorial = await Tutorial.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updatedTutorial);
})

// delete tutorial
router.delete('/tutorials/:id', async(req, res) => {
    const deletedTutorial = await Tutorial.findByIdAndDelete(req.params.id);
    res.json({message: 'Tutorial deleted successfully'});
})

// Affect tags
router.put('/tutorials/affect/:idTutorial/:idTag', async(req, res) => {
    const updateTutorialTag = await Tutorial.findByIdAndUpdate(req.params.idTutorial, {$push: {tags: req.params.idTag}}, {new: true});
    res.json(updateTutorialTag);
})
// DesAffect tags
router.put('/tutorials/desAffect/:idTutorial/:idTag', async(req, res) => {
    const updateTutorialTag = await Tutorial.findByIdAndUpdate(req.params.idTutorial, {$pull: {tags: req.params.idTag}}, {new: true});
    res.json(updateTutorialTag);
})
// GetAllTutorials with all Tags
router.get('/tutorialsWithTags', async(req, res) => {
    const tutorialsWithTags = await Tutorial.find({}).populate({path: 'tags', select: 'name slug -_id'});
    res.json(tutorialsWithTags);
})
module.exports = router;