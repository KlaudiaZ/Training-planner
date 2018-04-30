import $ from 'jquery';
import { saveExerciseToStorage, deleteItemFromStorage, updateModifiedItem } from './storage';
import { createNewId } from './idGenerator';

// bind Sort button
// allow '/' in inputs

export const exercisesInit = () => {
    bindBackButtonOnExercisesMenu();
    bindAddButtonOnExercisesMenu();
    bindMiscButton();
}

const bindBackButtonOnExercisesMenu = () => {
    $('#go-back-exercises').click((e) => {
        $('#main-menu').attr('data-visibility', 'visible');
        $('#exercises-list').attr('data-visibility', 'invisible');
    });
}

const bindAddButtonOnExercisesMenu = () => {
    $('#add-exercise-main').click((e) => {
        showExerciseForm("", "", "", "", "add");
    });
}

const bindModifyExerciseButton = () => {
    $('#modify-exercise-form').click((e) => {
        const exercise = getFormInputValues();
        if (validateInputs(exercise)) {
            modifyExercise(getElementID(e.target), exercise);
            hideExerciseForm();
            updateModifiedItem(getElementID(e.target), exercise);
        }
    });
}

const bindDeleteExerciseButton = () => {
    $('#delete-exercise-form').click((e) => {
        deleteExercise(getElementID(e.target));
        hideExerciseForm();
        deleteItemFromStorage(getElementID(e.target));
    });
}

const getElementID = (target) => {
    const id = target.parentElement.dataset.item;
    return id;
}

const deleteExercise = (id) => {
    $(`#${id}`).remove();
}

const modifyExercise = (id, exercise) => {
    $(`#${id}`).children().each(function(entryIndex) {
        Object.entries(exercise).forEach(([key, value], exerciseIndex) => {
            if ((entryIndex + 1) === exerciseIndex) {
                this.textContent = value;
            }
        });
    });
}


const bindMiscButton = () => {
    $('.exercise').bind('click', function() {
        if (event.target.nodeName === "IMG" || event.target.nodeName === "BUTTON") {
            showExerciseForm($(this).children('div')[0].textContent.trim(),
                $(this).children('div')[1].textContent.trim(),
                $(this).children('div')[2].textContent.trim(),
                parseInt($(this).children('div')[3].textContent.trim()),
                "modify",
                $(event.currentTarget)[0].id
            );
        }
    });
}

export const createNewExercise = (id, name, series, reps, weight) => {
    $('#exercises-list').append($(`<div class="exercise" id="${id}">`)
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

const showExerciseForm = (name, series, reps, weight, mode, id) => {
    $('#exercises-list').append($('<div id="new-exercise-form" data-visibility="visible">').html(`
            <div id="exercise-form-content" data-item="${id}">
            <p>Exercise name</p>
            <input class="form-input" type="text" id="exercise-name" value="${name}">
            <p>Number of series</p>
            <input class="form-input" type="number" pattern="[0-9]" id="exercise-series" value="${series}">
            <p>Number of repetitions</p>
            <input class="form-input" type="number" pattern="[0-9]" id="exercise-reps" value="${reps}">
            <p>Weight (kg, optional)</p>
            <input class="form-input" type="number" pattern="[0-9]" id="exercise-weight" value="${weight}">
            <button class="button main-button" id="${mode}-exercise-form">${mode}</button>
        </div>`));
    if (mode === "modify") {
        $('#exercise-form-content').append($('<button class="button main-button" id="delete-exercise-form">Delete</button>'));
        bindModifyExerciseButton();
        bindDeleteExerciseButton();
    }
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
    saveExercise(validateInputs(exercise), exercise);

}

const getFormInputValues = (id, name, series, repetitions, weight) => {
    const exercise = {
        id: createNewId(),
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
            addSuffixToWeightField(value, exercise);
        }
    });
    return validation;
}

const saveExercise = (validation, exercise) => {
    if (validation === true) {
        createNewExercise(exercise.id, exercise.name, exercise.series, exercise.repetitions, exercise.weight);
        hideExerciseForm();
        saveExerciseToStorage(exercise);
        bindMiscButton();
    }
}

export const addSuffixToWeightField = (val, exercise) => {
    val.trim() === "" ?
        exercise.weight = "N/A" :
        exercise.weight += "kg";
    return exercise;
}