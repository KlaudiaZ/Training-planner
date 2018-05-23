import $ from 'jquery';
import { mainMenuInit } from './mainMenu';
import { plansListInit } from './plansList';
import { planExercisesListInit } from './planExercisesList';
import { exercisesInit } from './exercises';
import { importDataFromStorage } from './storage';

export const loadMainMenu = () => {
    $('body').html(`
        <div class="main menu" id="main-menu">
            <div class="button-container top">
                <button class="button navigation" name="training-plans" id="training-plans-button">
                    <p class="button-text">Training Plans</p>
                </button>
            </div>
            <div class="button-container bottom">
                <button class="button navigation" name="exercises" id="exercises">
                    <p class="button-text">Exercises</p>
                </button>
            </div>
        </div>
    `);
    mainMenuInit();
}

export const loadPlansList = () => {
    $('body').html(`
        <div class="main plans" id="training-plans-menu">
            <div class="button-container">
                <button class="button navigation" name="add-plan" id="add-plan">
                    <p class="button-text">Add plan</p>
                </button>
            </div>
            <div class="button-container">
                <button class="button navigation" name="go-back" id="go-back-plans">
                    <p class="button-text">Back</p>
                </button>
            </div>
            <div class="pop-up">

            </div>
        </div>
    `);
    plansListInit();
    importDataFromStorage();
}

export const loadExerciseList = () => {
    $('body').html(`
        <div class="main exercises" id="exercises-list">
            <div class="exercises-menu">
                <div class="button-container">
                    <button class="button navigation" id="add-exercise-main">
                        <p class="button-text">Add</p>
                    </button>
                </div>
                <div class="button-container">
                    <button class="button navigation" id="sort-exercises">
                        <p class="button-text">Sort</p>
                    </button>
                </div>
                <div class="button-container">
                    <button class="button navigation" id="go-back-exercises">
                        <p class="button-text">Back</p>
                    </button>
                </div>
            </div>
            <div class="exercise exercise-legend">
                <div class="name row">
                    <p>Name</p>
                </div>
                <div class="series row">
                    <p>Series</p>
                </div>
                <div class="reps row">
                    <p>Reps</p>
                </div>
                <div class="weight row">
                    <p>Weight</p>
                </div>
                <div class="misc row">
                    <p>Misc</p>
                </div>
            </div>
            <div id="exercises-wrapper">
            </div>
        </div>
    `);
    exercisesInit();
    importDataFromStorage();
}

export const showPlanExercises = (plan) => {
    $('body').html(`
        <div class="main plan-details" data-visibility="visible" id="training-plan-details">
            <div class="header">
                <p>${plan.name}</p>
            </div>
            <div class="header description">
                <p>
                    ${plan.description}
                </p>
            </div>
            <div class="exercises-menu">
                <div class="button-container">
                    <button class="button navigation" id="add-exercises-plan" data-plan="${plan.id}">
                        <p class="button-text">Add exercises</p>
                    </button>
                </div>
                <div class="button-container">
                    <button class="button navigation" id="edit-plan" data-plan="${plan.id}">
                        <p class="button-text">Edit plan</p>
                    </button>
                </div>
                <div class="button-container">
                    <button class="button navigation" id="go-back-exercises-plan">
                        <p class="button-text">Back</p>
                    </button>
                </div>
            </div>
            <div class="exercise exercise-legend">
                <div class="name row">
                    <p>Name</p>
                </div>
                <div class="series row">
                    <p>Series</p>
                </div>
                <div class="reps row">
                    <p>Reps</p>
                </div>
                <div class="weight row">
                    <p>Weight</p>
                </div>
                <div class="misc row">
                    <p>Misc</p>
                </div>
            </div>
            <div id="plan-exercises-wrapper">
            </div>
        </div>
    `);
    planExercisesListInit(plan);
}