import $ from 'jquery';
import { loadExercisesToPick, updatePlanExercises, loadAddedContent } from './storage';

export const planExercisesListInit = (id) => {
    bindBackButtonOnPlanExercises();
    bindAddButton();
    loadAddedContent(id);
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
        <div class="header description">
            <p>Plan's description should be here but...you know. However, this way I can use this hard-coded text to test what's gonna happen when somebody puts a huge description in here.
                Well, actually, nothing bad happens at all. Let's be thankful for the small mercies.
            </p>
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
        <div class="popup-window-content add">
            <button class="button" id="add-selected-exercises" data-id="${id}">Add selected</button>
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

export const showContentToAdd = (exercisesToAdd) => {
    exercisesToAdd.forEach((exercise) => {
        $('#plan-exercises').append(`<button class="button" data-type="exercise" id="${exercise.id}">
                ${exercise.name}
            </button>`)
    });
    handleExerciseSelection();
}

const handleExerciseSelection = () => {
    let selectedExercises = [];

    $('[data-type="exercise"]').click(function() {
        colorSelectedExercises($(this));
        toggleExerciseSelect(selectedExercises, this.id);
        return selectedExercises;
    });

    bindAddSelectedButton(selectedExercises);
}

const colorSelectedExercises = (exercise) => {
    exercise.toggleClass("selected");
}

const toggleExerciseSelect = (arr, id) => {
    const index = arr.indexOf(id);
    index !== -1 ?
        arr.splice(index, 1) :
        arr.push(id);

    return arr;
}

const bindAddSelectedButton = (selectedExercises) => {
    $('#add-selected-exercises').click((e) => {
        updatePlanExercises(selectedExercises, e.currentTarget.dataset.id, "add");
        hidePlanForm();
    });
}

export const manageLoadedContent = (content, plan) => {
    content.forEach((item) => {
        showAddedContent(item.id, item.name, item.series, item.repetitions, item.weight);
    });
    bindExerciseDeleteButton(plan);
}

const showAddedContent = (id, name, series, reps, weight) => {
    $('#plan-exercises-wrapper').append($(`<div class="exercise" id="${id}">`)
        .html(`<div class="name row">
                <p>${name}</p>
            </div>
            <div class="series row">
                <p>${series}</p>
            </div>
            <div class="reps row">
                <p>${reps}</p>
            </div>
            <div class="weight row">
                <p>${weight}</p>
            </div>
            <div class="misc row">
                <button class="button">
                    <img src="img/delete.png">
                </button>
            </div>`));
}

const bindExerciseDeleteButton = (plan) => {
    $('.exercise').click(function() {
        if (event.target.nodeName === "IMG") {
            updatePlanExercises(this.id, plan, "delete");
            this.remove();
        }
    });
}