const express = require('express');
const app = express();
const port = 3000;
const exercises = require('./exercises.json');

let exercises = [
    {
        id: 1,
        name: 'Bench Press',
        sets: 4,
        reps: 8,
        weight: 185,
        date: '2023-09-20'
    },
    {
        id: 2,
        name: 'Squats',
        sets: 5,
        reps: 5,
        weight: 225,
        date: '2023-09-21'
    }
];

app.use(express.json());

app.get('/exercises', (req, res) => {
    res.json(exercises);
});

app.get('/exercises/:id', (req, res) => {
    const exercise = exercises.find(e => e.id === parseInt(req.params.id));
    if (!exercise) return res.status(404).send('Exercise not found');
    res.json(exercise);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});