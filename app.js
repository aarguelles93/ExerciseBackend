const express = require('express');
const {
    getAllExercises,
    getExerciseById,
    addExercise,
    updateExercise,
    deleteExercise,
} = require('./services/exerciseService');

const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.get('/exercises', async (req, res) => {
    try {
        const exercises = await getAllExercises();
        res.json(exercises);
    } catch (error) {
        res.status(500).send('Error reading exercises');
    }
});

app.get('/exercises/:id', async (req, res) => {
    try {
        const exercise = await getExerciseById(req.params.id);
        if (!exercise) return res.status(404).send('Exercise not found');
        res.json(exercise);
    } catch (error) {
        res.status(500).send('Error reading exercises');
    }
});

app.post('/exercises', async (req, res) => {
    const { name, sets, reps, weight, date } = req.body;

    if (!name || !sets || !reps || !weight || !date) {
        return res.status(400).send('Missing required fields');
    }

    try {
        const newExercise = await addExercise({
            name,
            sets,
            reps,
            weight,
            date,
        });
        res.status(201).json(newExercise);
    } catch (error) {
        res.status(500).send('Error saving exercise');
    }
});

app.put('/exercises/:id', async (req, res) => {
    try {
        const updatedExercise = await updateExercise(req.params.id, req.body);
        if (!updatedExercise) return res.status(404).send('Exercise not found');
        res.json(updatedExercise);
    } catch (error) {
        res.status(500).send('Error updating exercise');
    }
});

app.delete('/exercises/:id', async (req, res) => {
    try {
        const deletedExercise = await deleteExercise(req.params.id);
        if (!deletedExercise) return res.status(404).send('Exercise not found');
        res.json(deletedExercise);
    } catch (error) {
        res.status(500).send('Error deleting exercise');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
