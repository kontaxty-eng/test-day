const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');

// GET all medicines
router.get('/', async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.json(medicines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET single medicine by ID
router.get('/:id', async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }
        res.json(medicine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST create new medicine
router.post('/', async (req, res) => {
    const medicine = new Medicine({
        name: req.body.name,
        time: req.body.time,
        dose: req.body.dose,
        day: req.body.day
    });

    try {
        const newMedicine = await medicine.save();
        res.status(201).json(newMedicine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update medicine
router.put('/:id', async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        if (req.body.name) medicine.name = req.body.name;
        if (req.body.time) medicine.time = req.body.time;
        if (req.body.dose) medicine.dose = req.body.dose;
        if (req.body.day) medicine.day = req.body.day;

        const updatedMedicine = await medicine.save();
        res.json(updatedMedicine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE medicine
router.delete('/:id', async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        await medicine.deleteOne();
        res.json({ message: 'Medicine deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
