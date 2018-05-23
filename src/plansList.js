import $ from 'jquery';
import { bindBackButtonOnPlans, bindPlanClick } from './navigation';
import { createNewId } from './idGenerator';
import { savePlanToStorage, findPlan, updatePlanProperties } from './storage';
import { planExercisesListInit, showPlanExercises } from './planExercisesList';

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
        hidePlanForm();
    });
}



const openAddPlanWindow = (name, description, id, mode) => {
    $('#training-plans-menu').append($('<div class="popup-window" id="create-new-plan">').html(`
        <div class="popup-window-content" id="new-plan-content" data-item="${id}">
            <p>Plan name</p>
            <input type="text" class="form-input" id="form-plan-name" value=${name}>
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
    console.log(plan);
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
            alert('You have reached the maximum amount of training plans!');
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
        updatePlanProperties(id, plan.name, plan.description);
    })
}