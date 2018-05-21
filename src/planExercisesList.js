import $ from 'jquery';
import { loadExercisesToPick } from './storage';

export const planExercisesListInit = () => {
    bindBackButtonOnPlanExercises();
    bindAddButton();
}

const bindBackButtonOnPlanExercises = () => {
    $('#go-back-exercises-plan').click((e) => {
        $('#training-plan-details').remove();
    });
}

export const showPlanExercises = (plan) => {
    $('body').append(
        $(`<div class="main plan-details" data-visibility="visible" id="training-plan-details">`).html(
            `<div class="header">
            <p>${plan.name}</p>
        </div>
        <div class="exercises-menu">
            <div class="button-container">
                <button class="button" id="add-exercises-plan" data-plan="${plan.id}">
                    <p class="button-text">Add</p>
                </button>
            </div>
            <div class="button-container">
                <button class="button" id="go-back-exercises-plan">
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
        </div>`
        )
    )
}

const bindAddButton = () => {
    $('#add-exercises-plan').click((e) => {
        openAddExercisesWindow(e.currentTarget.dataset.plan);
        bindAreaAroundForm();
    });
}

const openAddExercisesWindow = (id) => {
    $('#training-plan-details').append($('<div class="popup-window" id="add-content">').html(`
        <div class="popup-window-content exercises-no-details" id="plan-exercises">
        </div>
        <div class="popup-window-content>
            <button class="button">Add selected</button>
        </div>
    `));
    loadExercisesToPick(id);
}

const bindAreaAroundForm = () => {
    $('#add-content').click((e) => {
        if (e.currentTarget === e.target) {
            hidePlanForm();
        }
    });
}

const hidePlanForm = () => {
    $('#add-content').remove();
}

const showContentToAdd = () => {

}

const loadAddedContent = () => {

}