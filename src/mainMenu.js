import $ from 'jquery';

export const bindTrainingPlansButton = () => {
    $('#training-plans-button').click((e) => {
        $('#training-plans-menu').attr('data-visibility', 'visible');
        $('#main-menu').attr('data-visibility', 'invisible');
    });
}

export const bindExercisesButton = () => {
    $('#exercises').click((e) => {
        $('#exercises-list').attr('data-visibility', 'visible');
        $('#main-menu').attr('data-visibility', 'invisible');
    });
}