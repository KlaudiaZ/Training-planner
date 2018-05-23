import $ from 'jquery';
import { bindBackButtonOnExercisesMenu } from './navigation';
import { saveExerciseToStorage, deleteItemFromStorage, updateModifiedItem, sortExercises } from './storage';
import { createNewId } from './idGenerator';
import { displayAlert } from './manageSectionChange';

export const exercisesInit = () => {
    $(() => {
        bindBackButtonOnExercisesMenu();
        bindAddButtonOnExercisesMenu();
        bindMiscButton();
        bindSortExercisesButton();
    });
}



const bindAddButtonOnExercisesMenu = () => {
    $('#add-exercise-main').click((e) => {
        showExerciseForm("", "", "", "", "add");
    });
}

const bindModifyExerciseButton = () => {
    $('#modify-exercise-form').click((e) => {
        const exercise = getFormInputValues(e.target);
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
    if (target) {
        const id = target.parentElement.dataset.item;
        if (id) {
            return id;
        } else {
            return null;
        }
    } else {
        return null;
    }
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
                parseFloat($(this).children('div')[3].textContent.trim()),
                "modify",
                $(event.currentTarget)[0].id
            );
        }
    });
}

export const createNewExercise = (id, name, series, reps, weight) => {
    $('#exercises-wrapper').append($(`<div class="exercise" id="${id}">`)
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
                    <img src="img/plus.png">
                </button>
            </div>`));
}

const showExerciseForm = (name, series, reps, weight, mode, id) => {
    console.log(name)
    $('#exercises-list').append($('<div class="popup-window" id="new-exercise-form" data-visibility="visible">').html(`
        <div class="popup-window-content" id="exercise-form-content" data-item="${id}">
                <p>Exercise name</p>
            <input class="form-input" type="text" id="exercise-name" value="${name}">
                <p>Number of series</p>
            <input class="form-input" type="number" pattern="[0-9]" id="exercise-series" value="${series}">
                <p>Number of repetitions</p>
            <input class="form-input" type="number" pattern="[0-9]" id="exercise-reps" value="${reps}">
                <p>Weight (kg, optional)</p>
            <input class="form-input" type="number" pattern="[0-9]" id="exercise-weight" value="${weight}">
                <button class="button" id="${mode}-exercise-form">${mode}</button>
        </div>`));
    if (mode === "modify") {
        $('#exercise-form-content').append($('<button class="button" id="delete-exercise-form">Delete</button>'));
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

const getFormInputValues = (target) => {
    const exercise = {
        id: getElementID(target) ? getElementID(target) : createNewId(),
        name: $('#exercise-name').val(),
        series: $('#exercise-series').val(),
        repetitions: $('#exercise-reps').val(),
        weight: $('#exercise-weight').val()
    };
    return exercise;
}

const validateInputs = (exercise) => {
    let validation = true;
    let alertZIndex = 3000;
    Object.entries(exercise).forEach(([key, value]) => {
        if (key !== "weight") {
            if (value.trim() === "") {
                displayAlert(key + " field cannot be empty!",
                    `<button class="button navigation validation-error">OK</button>`,
                    alertZIndex);
                bindOkOnAlert();
                validation = false;
                alertZIndex--;
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
        exercise.weight = "0 kg" :
        exercise.weight += " kg";
    return exercise;
}

const bindSortExercisesButton = () => {
    $('#sort-exercises').click((e) => {
        openSortWindow();
    });
}

const openSortWindow = () => {
    $('#exercises-list').append($('<div class="popup-window" id="sort-options-surrounding" data-visibility="visible">').html(`
    <div class="popup-window-content" id="sort-options">
        <button class="button sort" id="sort-default">Default</button>
        <button class="button sort" id="sort-alphabetically">A - Z</button>
        <button class="button sort" id="sort-alphabetically-reverse">Z - A</button>
        <button class="button sort" id="sort-weight">From lightest</button>
        <button class="button sort" id="sort-weight-reverse">From heaviest</button>
    </div>`))
    bindAreaAroundSort();
    bindSortingWindow();
}

const bindAreaAroundSort = () => {
    $('#sort-options-surrounding').click((e) => {
        if (e.target === e.currentTarget) {
            hideSortingWindow();
        }
    });
}

const hideSortingWindow = () => {
    $('#sort-options-surrounding').remove();
}

const bindSortingWindow = () => {
    $('#sort-options').click((e) => {
        if (e.target.tagName === "BUTTON") {
            sortExercises(e.target.id);
            hideSortingWindow();
        }
    });
}

const bindOkOnAlert = () => {
    $('.validation-error').click((e) => {
        console.log('bye')
        removeAlert();
    });
}

const removeAlert = () => {
    console.log('bye')
    $('.alert').parent().remove();
    $('.alert').remove();
}