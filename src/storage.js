import { addSuffixToWeightField, createNewExercise } from './exercises';

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
            createNewExercise("10" /*add id-check*/ , exercise.name, exercise.series, exercise.repetitions, exercise.weight);
        });
    }

}