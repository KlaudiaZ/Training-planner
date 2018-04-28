import $ from 'jquery';

export const mainMenuInit = () => {
    bindTrainingPlansButton();
    bindExercisesButton();
}

const bindTrainingPlansButton = () => {
    $('#training-plans-button').click((e) => {
        $('#training-plans-menu').attr('data-visibility', 'visible');
        $('#main-menu').attr('data-visibility', 'invisible');
    });
}

const bindExercisesButton = () => {
    $('#exercises').click((e) => {
        $('#exercises-list').attr('data-visibility', 'visible');
        $('#main-menu').attr('data-visibility', 'invisible');
    });
}