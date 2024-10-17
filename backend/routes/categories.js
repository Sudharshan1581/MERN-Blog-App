const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get All Categories
router.get('/', async(req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Get Single Category by ID
router.get('/:id', async(req, res) => {
    try {
        const post = await Category.findById(req.params.id);
        if (!post) {
            return res.status(404).json({message: "Category not found"});
        }
        res.json(category);
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Create a New Category
router.post('/', async(req, res) => {
    const category = new Category ({
       name: req.body.name,
       slug: req.body.slug,
       description: req.body.description,
    });
    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Update Existing Category
router.put('/:id', async(req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!post) {
            return res.status(404).json({message: "Category not found"});
        }
        
        category.name = req.body.name || category.name;
        category.slug = req.body.slug || category.slug;
        category.description = req.body.description || category.description;
        post.updatedAt = Date.now();

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
})

// Deleting a Category
router.delete('/:id', async(req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({message: "Category not found"});
        }
       await Category.findByIdAndDelete(category._id)
       res.json({message: "Category Deleted"})
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router;