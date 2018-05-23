import $ from 'jquery';
import { addSuffixToWeightField, createNewExercise } from './exercises';
import { createNewPlan } from './plansList';
import { showContentToAdd, manageLoadedContent } from './planExercisesList';

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

export const savePlanExercisesToStorage = (plan) => {

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

export const findPlan = (id) => {
    const plan =
        JSON.parse(localStorage.getItem('plans'))
        .find(plan => plan.id === id);
    return plan;
}

export const loadExercisesToPick = (id) => {
    const allExercises = JSON.parse(localStorage.getItem('exercises'));
    const plan = findPlan(id);
    const exercisesToAdd =
        allExercises.filter((exercise) => {
            return !plan.exercises.includes(exercise.id)
        });
    showContentToAdd(exercisesToAdd);
}

export const updatePlanExercises = (selected, id, mode) => {
    const plans = JSON.parse(localStorage.getItem('plans'));
    plans.find((plan) => {
        if (plan.id === id) {
            switch (mode) {
                case 'add':
                    selected.forEach((exercise) => {
                        plan.exercises.push(exercise);
                    });
                    break;
                case 'delete':
                    const index = plan.exercises.indexOf(selected);
                    plan.exercises.splice(index, 1);
                    console.log(plan);
                    break;
            }
        }
    });
    localStorage.setItem('plans', JSON.stringify(plans));
}

export const loadAddedContent = (id) => {
    const allExercises = JSON.parse(localStorage.getItem('exercises'));
    const plan = findPlan(id);
    const exercisesToLoad =
        allExercises.filter((exercise) => {
            return plan.exercises.includes(exercise.id)
        });
    manageLoadedContent(exercisesToLoad, id);
}

export const updatePlanProperties = (id, newName, newDescription) => {
    const plans = JSON.parse(localStorage.getItem('plans'));
    plans.find((plan, index) => {
        if (plan.id === id) {
            plan.name = newName;
            plan.description = newDescription;
            plans.splice(index, 0, plan);
        }
    });
    localStorage.setItem('plans', JSON.stringify(plans));
}