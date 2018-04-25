import $ from 'jquery';

// clear form after adding exercise
// validate inputs
// attach 'kg' to 'weight' field
// write N/A if 'weight' is left empty
// check for the highest id number at the beginning
// remove the form from html, make it appear solely through JS

export const bindBackButtonOnExercisesMenu = () => {
    $('#go-back-exercises').click((e) => {
        $('#main-menu').attr('data-visibility', 'visible');
        $('#exercises-list').attr('data-visibility', 'invisible');
    });
}

export const bindAddButtonOnExercisesMenu = () => {
    $('#add-exercise-main').click((e) => {
        showExerciseForm();
    });
}

const createNewExercise = (id, name, series, reps, weight) => {
    $('#exercises-list').append($(`<div class="exercise" id="exercise-${id}">`)
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
        <button class="button main-button">
        <img src="img/plus.png">
        </button>
        </div>`))
}

const showExerciseForm = () => {
    $('#new-exercise-form').attr('data-visibility', 'visible');
    bindAreaAroundForm();
    bindAddExerciseButton();
}

const bindAreaAroundForm = () => {
    $('#new-exercise-form').click((e) => {
        if (e.target === e.currentTarget) {
            hideExerciseForm();
        }
    });
}

const hideExerciseForm = () => {
    $('#new-exercise-form').attr('data-visibility', 'invisible');
}

const bindAddExerciseButton = () => {
    $('#add-exercise-form').click((e) => {
        addExercise();
    });
}

const addExercise = () => {
    console.log('your exercise should be added here');
    createNewExercise("10" /*add id-check*/ , $('#exercise-name').val(), $('#exercise-series').val(), $('#exercise-reps').val(), $('#exercise-weight').val());
    hideExerciseForm();
}