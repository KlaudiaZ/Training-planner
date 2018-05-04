import $ from 'jquery';

// add new plan
// edit plan on hold
// clicking on a plan shows exercises it contains

export const plansInit = () => {
    bindBackButtonOnPlans();
    bindAddPlanButton();
}

const bindBackButtonOnPlans = () => {
    $('#go-back-plans').click((e) => {
        $('#main-menu').attr('data-visibility', 'visible');
        $('#training-plans-menu').attr('data-visibility', 'invisible');
    });
}

const bindAddPlanButton = () => {
    $('#add-plan').click((e) => {
        openAddPlanWindow("", "", "", "add");
        bindAreaAroundPlanForm();
    });
}

const openAddPlanWindow = (name, description, id, mode) => {
    $('#training-plans-menu').append($('<div class="popup-window" id="create-new-plan">').html(`
        <div class="popup-window-content" id="new-plan-content" data-item="${id}">
            <p>Plan name</p>
            <input type="text" class="form-input" id="form-plan-name" value=${name}>
            <p>Description</p>
            <input type="text" class="form-input" id="form-plan-description" value=${description}>
            <button class="button main-button" id="${mode}-exercise-form">${mode}</button>
        </div>
    `));
}

const bindAreaAroundPlanForm = () => {
    $('#create-new-plan').click((e) => {
        if (e.currentTarget === e.target) {
            e.currentTarget.remove();
        }
    });
}