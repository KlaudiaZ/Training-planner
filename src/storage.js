import $ from 'jquery';
import { addSuffixToWeightField, createNewExercise } from './exercises';
import { createNewPlan } from './plansList';

// preserve ID of a modified item

export const saveExerciseToStorage = (exercise) => {
    let exercises = JSON.parse(localStorage.getItem('exercises'));
    if (!exercises) {
        exercises = [];
    }
    exercises.push(exercise);
    localStorage.setItem('exercises', JSON.stringify(exercises));
}

export const savePlanToStorage = (plan) => {
    let plans = JSON.parse(localStorage.getItem('plans'));
    if (!plans) {
        plans = [];
    }
    plans.push(plan);
    localStorage.setItem('plans', JSON.stringify(plans));
}

export const importDataFromStorage = () => {
    let exercises = JSON.parse(localStorage.getItem('exercises'));
    if (exercises) {
        exercises.forEach((exercise) => {
            createNewExercise(exercise.id, exercise.name, exercise.series, exercise.repetitions, exercise.weight);
        });
    }
    let plans = JSON.parse(localStorage.getItem('plans'));
    if (plans) {
        plans.forEach((plan) => {
            createNewPlan(plan);
        });
    }
}

export const deleteItemFromStorage = (id) => {
    let exercises = JSON.parse(localStorage.getItem('exercises'));
    for (let i = 0; i < exercises.length; i++) {
        if (exercises[i].id === id) {
            exercises.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('exercises', JSON.stringify(exercises));
}

export const updateModifiedItem = (id, exercise) => {
    let exercises = JSON.parse(localStorage.getItem('exercises'));
    for (let i = 0; i < exercises.length; i++) {
        if (exercises[i].id === id) {
            exercises.splice(i, 1, exercise);
            break;
        }
    }
    localStorage.setItem('exercises', JSON.stringify(exercises));
}

export const sortExercises = (mode) => {
    let exercises = JSON.parse(localStorage.getItem('exercises'));
    console.log(mode);
    exercises.sort((a, b) => {
        switch (mode) {
            case 'sort-default':
                return 0;
                break;
            case 'sort-alphabetically':
                return a.name > b.name;
                break;
            case 'sort-alphabetically-reverse':
                return a.name < b.name;
                break;
            case 'sort-weight':
                return a.weight < b.weight;
                break;
            case 'sort-weight-reverse':
                return a.weight > b.weight;
                break;
        }
    });
    refreshList(exercises);
}

const refreshList = (exercises) => {
    $('#exercises-wrapper').html("");
    exercises.forEach((exercise) => {
        createNewExercise(exercise.id, exercise.name, exercise.series, exercise.repetitions, exercise.weight);
    });
}