const path = require('path');
const fs = require('fs');
const { json2xml, xml2json } = require('../utils/xmlUtils');

const dataFile = path.join(__dirname, '../data/exercises.xml');

// Initialize XML file if it doesn't exist
if (!fs.existsSync(dataFile)) {
    const initialData = {
        exercises: {
            exercise: [],
        },
    };
    fs.writeFileSync(dataFile, json2xml(initialData));
}

async function getAllExercises() {
    try {
        const xml = fs.readFileSync(dataFile, 'utf8');
        const result = await xml2json(xml);
        return result.exercises.exercise || [];
    } catch (error) {
        console.error('Error reading XML file:', error);
        throw error;
    }
}

async function getExerciseById(id) {
    const exercises = await getAllExercises();
    return exercises.find((e) => e.id === id);
}

async function getExerciseByDeviceAndId(deviceId, exerciseId) {
    const exercises = await getAllExercises();
    const asd =  exercises.find(
        (e) => e['device-id'] === deviceId && e.id === exerciseId
    );
    console.log(asd);
    return asd;
}

async function getExerciseByDevice(deviceId) {
    const exercises = await getAllExercises();
    console.log(exercises);
    const asd =  exercises.filter((e) => e['device-id'] === deviceId);
    console.log(asd);
    return asd;
}

async function addExercise(exerciseData) {
    const exercises = await getAllExercises();
    const newExercise = {
        id: Date.now().toString(),
        'device-id': exerciseData.deviceId,
        ...exerciseData,
    };
    exercises.push(newExercise);
    writeExercises(exercises);
    return newExercise;
}

async function updateExercise(id, updatedData) {
    const exercises = await getAllExercises();
    const exerciseIndex = exercises.findIndex((e) => e.id === id);

    if (exerciseIndex === -1) return null;

    const existing = exercises[exerciseIndex];
    const updatedExercise = {
        id: existing.id,
        'device-id': updatedData['device-id'] || existing['device-id'],
        name: updatedData.name || existing.name,
        sets: updatedData.sets || existing.sets,
        reps: updatedData.reps || existing.reps,
        weight: updatedData.weight || existing.weight,
        date: updatedData.date || existing.date,
    };

    exercises[exerciseIndex] = updatedExercise;
    writeExercises(exercises);
    return updatedExercise;
}

async function deleteExercise(id) {
    const exercises = await getAllExercises();
    const exerciseIndex = exercises.findIndex((e) => e.id === id);

    if (exerciseIndex === -1) return null;

    const deletedExercise = exercises.splice(exerciseIndex, 1)[0];
    writeExercises(exercises);
    return deletedExercise;
}

function writeExercises(exercises) {
    try {
        const xmlData = json2xml({ exercises: { exercise: exercises } });
        fs.writeFileSync(dataFile, xmlData);
    } catch (error) {
        console.error('Error writing XML file:', error);
        throw error;
    }
}

module.exports = {
    getAllExercises,
    getExerciseById,
    getExerciseByDeviceAndId,
    getExerciseByDevice,
    addExercise,
    updateExercise,
    deleteExercise,
};
