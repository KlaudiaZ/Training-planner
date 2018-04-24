import $ from 'jquery';

export const bindBackButtonOnExercises = () => {
    $('#go-back-exercises').click((e) => {
        $('#main-menu').attr('data-visibility', 'visible');
        $('#exercises-menu').attr('data-visibility', 'invisible');
    });
}

export const bindAddButtonOnExercises = () => {
    $('#add-exercise').click((e) => {

    });
}

const createNewExercise = (id, name, series, reps, weight) => {
    $('#exercises-list').append($(`<div class="exercise" id="exercise-"${id}`))
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
        </div>`)
}