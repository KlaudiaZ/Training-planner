import $ from 'jquery';
import { loadMainMenu, loadPlansList, showPlanExercises, loadExerciseList } from './manageSectionChange';
import { findPlan } from './storage';

// Main Menu

export const bindTrainingPlansButton = () => {
    $('#training-plans-button').click((e) => {
        loadPlansList();
    });
}

export const bindExercisesButton = () => {
    $('#exercises').click((e) => {
        loadExerciseList();
    });
}

// Plans list

export const bindBackButtonOnPlans = () => {
    $('#go-back-plans').click((e) => {
        loadMainMenu();
    });
}

// Plan Exercises

export const bindBackButtonOnPlanExercises = () => {
    $('#go-back-exercises-plan').click((e) => {
        loadPlansList();
    });
}


// Exercises List

export const bindBackButtonOnExercisesMenu = () => {
    $('#go-back-exercises').click((e) => {
        loadMainMenu();
    });
}

export const bindPlanClick = () => {
    let clickCount = 0;
    let timer = null;

    $('.plan').click((e) => {
        clickCount++;
        if (clickCount === 1) {
            timer = setTimeout(() => {

                showPlanExercises(findPlan(e.currentTarget.id));

                clickCount = 0;
            }, 200);
        } else {
            clearInterval(timer);

            const plan = findPlan(e.currentTarget.id);
            openAddPlanWindow(plan.name, plan.description, plan.id, "edit", plan);

            clickCount = 0;
        }
    });
}