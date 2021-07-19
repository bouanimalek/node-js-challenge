const express = require('express');
const router = express.Router();
const Tag = require('../models/tagSchema');

// get all Tags
router.get('/tags', async(req, res) => {
    const tags = await  Tag.find({});
    res.json(tags);
})

// get tag by son id
router.get('/tags/:id', async(req, res) => {
    const tag = await Tag.findById(req.params.id);
    res.json(tag);
})

//  ajouter un nouveau Tag 
router.post('/tags', async(req, res) => {
    const newTag = await Tag.create(req.body);
    res.json(newTag);
})

// modifier un Tag
router.put('/tags/:id', async(req, res) => {
    const updatedTag = await Tag.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updatedTag);
})

// delete Tag
router.delete('/tags/:id', async(req, res) => {
    const deletedTag = await Tag.findByIdAndDelete(req.params.id);
    res.json({message: 'Tag deleted successfully'});
})

// Affect Tutorials
router.put('/tags/affect/:idTag/:idTutorial', async(req, res) => {
    const updateTagTutorial = await Tag.findByIdAndUpdate(req.params.idTag, {$push: {tutorials: req.params.idTutorial}}, {new: true});
    res.json(updateTagTutorial);
})
// DesAffect Tutorial
router.put('/tags/desAffect/:idTag/:idTtutorial', async(req, res) => {
    const updateTagTutorial = await Tag.findByIdAndUpdate(req.params.idTag, {$pull: {tutorials: req.params.idTutorial}}, {new: true});
    res.json(updateTagTutorial);
})
// GetAllTags with all Tutorials
router.get('/tagsWithTutorials', async(req, res) => {
    const tagsWithTutorials = await Tag.find({}).populate({path: 'tutorials', select: 'title author -_id'});
    res.json(tagsWithTutorials);
})
module.exports = router;