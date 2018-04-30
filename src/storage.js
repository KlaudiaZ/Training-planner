import { addSuffixToWeightField, createNewExercise } from './exercises';

// delete and modify items in storage

export const saveExerciseToStorage = (exercise) => {
    let exercises = JSON.parse(localStorage.getItem('exercises'));
    if (!exercises) {
        exercises = [];
    }
    exercises.push(exercise);
    localStorage.setItem('exercises', JSON.stringify(exercises));
}

export const importDataFromStorage = () => {
    let exercises = JSON.parse(localStorage.getItem('exercises'));
    if (exercises) {
        exercises.forEach((exercise) => {
            createNewExercise(exercise.id, exercise.name, exercise.series, exercise.repetitions, exercise.weight);
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