import $ from 'jquery';

export const planExercisesListInit = () => {
    bindBackButtonOnPlanExercises();
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
            <p>Plan Name</p>
        </div>
        <div class="exercises-menu">
            <div class="button-container">
                <button class="button" id="add-exercise-plan">
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