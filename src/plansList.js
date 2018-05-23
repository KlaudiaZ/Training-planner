import $ from 'jquery';
import { loadPlansList } from './manageSectionChange';
import { bindBackButtonOnPlans, bindPlanClick } from './navigation';
import { createNewId } from './idGenerator';
import { savePlanToStorage, findPlan, updatePlanProperties } from './storage';
import { planExercisesListInit, showPlanExercises } from './planExercisesList';
import { displayAlert } from './manageSectionChange';

// add input validation

export const plansListInit = () => {
    $(() => {
        bindBackButtonOnPlans();
        bindAddNewPlan();
        bindPlanClick();
    });
}

const bindAddNewPlan = () => {
    $('#add-plan').click((e) => {
        setPlanNumberLimit();
    });
}

const bindAreaAroundPlanForm = () => {
    $('#create-new-plan').click((e) => {
        if (e.currentTarget === e.target) {
            hidePlanForm();
        }
    });
}

const bindAddPlanButtonOnForm = () => {
    $('#add-plan-form').click((e) => {
        addPlan();
        loadPlansList();
    });
}


export const openAddPlanWindow = (name, description, id, mode) => {
    console.log(name)
    $('#training-plans-menu').append($('<div class="popup-window" id="create-new-plan">').html(`
        <div class="popup-window-content" id="new-plan-content" data-item="${id}">
            <p>Plan name</p>
            <input type="text" class="form-input" id="form-plan-name" value="${name}">
            <p>Description</p>
            <textarea class="form-input" id="form-plan-description">${description}</textarea>
            <button class="button" id="${mode}-plan-form">${mode}</button>
        </div>
    `));
    if (mode === "edit") {
        $('#new-plan-content').append($(`
            <button class="button" id="delete-plan-form">Delete plan</button>
        `));
        bindPlanEdit(id);
        bindPlanDelete(id);
    }
    bindAreaAroundPlanForm();
    bindAddPlanButtonOnForm();
}

const hidePlanForm = () => {
    $('#create-new-plan').remove();
}

const addPlan = () => {
    const plan = getPlanFormValues();
    createNewPlan(plan);
    savePlanToStorage(plan);
    bindPlanClick();
}

const getPlanFormValues = (id) => {
    const plan = {
        id: id ? id : createNewId(),
        name: $('#form-plan-name').val(),
        description: $('#form-plan-description').val(),
        exercises: [],
    };
    //console.log(plan);
    return plan;
}

export const createNewPlan = (plan) => {
    $('#go-back-plans').parent().before($(`<div class="button-container">`).html(`
        <button class="button plan" name="${plan.name}" id="${plan.id}">
            <p class="button-text">${plan.name}</p>
        </button>
    `));
}

const showPlanPropertiesWindow = () => {
    openAddPlanWindow("", "", "", "add");
}

const setPlanNumberLimit = () => {
    let plans = JSON.parse(localStorage.getItem('plans'));
    if (plans) {
        if (plans.length === 10) {
            displayAlert('You have reached the maximum amount of training plans!',
                `<button class="button navigation" id="max-plans">OK</button>`,
                3000);
            bindOkOnAlert();
        } else {
            showPlanPropertiesWindow();
        }
    } else {
        showPlanPropertiesWindow();
    }
}

const bindPlanEdit = (id) => {
    $('#edit-plan-form').click((e) => {
        const plan = getPlanFormValues(id);
        updatePlanProperties(id, plan.name, plan.description, "edit");
    });
}

const bindPlanDelete = (id) => {
    $('#delete-plan-form').click((e) => {
        displayAlert('Do you really want to delete this plan?',
            `<button class="button navigation" id="delete">Delete</button>
                 <button class="button navigation" id="cancel">Cancel</button>`,
            3000);
        bindRemoveOnAlert(id);
        bindCancelOnAlert();
    });
}

const bindOkOnAlert = () => {
    $('#max-plans').click((e) => {
        removeAlert();
    });
}

const removeAlert = () => {
    $('.alert').parent().remove();
    $('.alert').remove();
}

const bindRemoveOnAlert = (id) => {
    $('#delete').click((e) => {
        updatePlanProperties(id, "", "", "delete");
        removeAlert();
    });
}

const bindCancelOnAlert = () => {
    $('#cancel').click((e) => {
        removeAlert();
    });
}