import $ from 'jquery';
import { createNewId } from './idGenerator';

// add new plan
// edit plan on hold
// clicking on a plan shows exercises it contains
// lock adding new plans above 10 existing

export const plansInit = () => {
    bindBackButtonOnPlans();
    bindAddNewPlan();
}

const bindBackButtonOnPlans = () => {
    $('#go-back-plans').click((e) => {
        $('#main-menu').attr('data-visibility', 'visible');
        $('#training-plans-menu').attr('data-visibility', 'invisible');
    });
}

const bindAddNewPlan = () => {
    $('#add-plan').click((e) => {
        openAddPlanWindow("", "", "", "add");
        bindAreaAroundPlanForm();
        bindAddPlanButtonOnForm();
    });
}

const openAddPlanWindow = (name, description, id, mode) => {
    $('#training-plans-menu').append($('<div class="popup-window" id="create-new-plan">').html(`
        <div class="popup-window-content" id="new-plan-content" data-item="${id}">
            <p>Plan name</p>
            <input type="text" class="form-input" id="form-plan-name" value=${name}>
            <p>Description</p>
            <textarea class="form-input" id="form-plan-description" value=${description}></textarea>
            <button class="button main-button" id="${mode}-plan-form">${mode}</button>
        </div>
    `));
}

const bindAreaAroundPlanForm = () => {
    $('#create-new-plan').click((e) => {
        if (e.currentTarget === e.target) {
            hidePlanForm();
        }
    });
}

const hidePlanForm = () => {
    $('#create-new-plan').remove();
}

const bindAddPlanButtonOnForm = () => {
    $('#add-plan-form').click((e) => {
        savePlan();
        hidePlanForm();
    });
}

const savePlan = () => {
    const plan = getPlanFormValues();
    createNewPlan(plan.name, plan.description, plan.id);
}

const getPlanFormValues = () => {
    const plan = {
        id: createNewId(),
        name: $('#form-plan-name').val(),
        description: $('#form-plan-description')
    };
    return plan;
}

const createNewPlan = (name, description, id) => {
    $('#go-back-plans').parent().before($(`<div class="button-container" name="${name}" id="${id}">`).html(`
        <button class="button main-button">
            <p class="button-text">${name}</p>
        </button>
    `));
}