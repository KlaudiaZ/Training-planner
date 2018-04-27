import $ from 'jquery';

// check for the highest id number at the beginning
// bind Sort button
// bind Plus button (open form with filled in fields)

export const bindBackButtonOnExercisesMenu = () => {
    $('#go-back-exercises').click((e) => {
        $('#main-menu').attr('data-visibility', 'visible');
        $('#exercises-list').attr('data-visibility', 'invisible');
    });
}

export const bindAddButtonOnExercisesMenu = () => {
    $('#add-exercise-main').click((e) => {
        showExerciseForm("", "", "", "");
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
        </div>`));
}

const showExerciseForm = (name, series, reps, weight) => {
    $('#exercises-list').append($('<div id="new-exercise-form" data-visibility="visible">').html(`
            <div id="exercise-form-content">
            <p>Exercise name</p>
            <input class="form-input" type="text" id="exercise-name" value="${name}">
            <p>Number of series</p>
            <input class="form-input" type="number" pattern="[0-9]" id="exercise-series" value="${series}">
            <p>Number of repetitions</p>
            <input class="form-input" type="number" pattern="[0-9]" id="exercise-reps" value="${reps}">
            <p>Weight (kg, optional)</p>
            <input class="form-input" type="number" pattern="[0-9]" id="exercise-weight" value="${weight}">
            <button class="button main-button" id="add-exercise-form">Add</button>
        </div>`));
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
    $('#new-exercise-form').remove();
}

const bindAddExerciseButton = () => {
    $('#add-exercise-form').click((e) => {
        addExercise();
    });
}

const addExercise = () => {
    const exercise = getFormInputValues();
    validateInputs(exercise);

}

const getFormInputValues = () => {
    const exercise = {
        id: "1",
        name: $('#exercise-name').val(),
        series: $('#exercise-series').val(),
        repetitions: $('#exercise-reps').val(),
        weight: $('#exercise-weight').val()
    };
    return exercise;
}

const validateInputs = (exercise) => {
    let validation = true;
    Object.entries(exercise).forEach(([key, value]) => {
        if (key !== "weight") {
            if (value.trim() === "") {
                alert(key + " cannot be empty!");
                validation = false;
            }
        } else {
            console.log(key + value);
            value.trim() === "" ?
                exercise.weight = "N/A" :
                exercise.weight += "kg";
        }
    });
    if (validation === true) {
        createNewExercise("10" /*add id-check*/ , exercise.name, exercise.series, exercise.repetitions, exercise.weight);
        hideExerciseForm();
    }
}