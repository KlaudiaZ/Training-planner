import $ from 'jquery';
import { createNewId } from './idGenerator';
import { savePlanToStorage } from './storage';
import { planExercisesListInit, showPlanExercises } from './planExercisesList';

// add input validation
// edit plan on hold
// clicking on a plan shows exercises it contains

export const plansListInit = () => {
    bindBackButtonOnPlans();
    bindAddNewPlan();
    bindPlanClick();
    //bindAddNewPlanOnHold();
}

const bindBackButtonOnPlans = () => {
    $('#go-back-plans').click((e) => {
        $('#main-menu').attr('data-visibility', 'visible');
        $('#training-plans-menu').attr('data-visibility', 'invisible');
    });
}

const bindAddNewPlan = () => {
    $('#add-plan').click((e) => {
        setPlanNumberLimit();
    });
}

// const bindPlanOnHold = () => {
//     $('.plan').mousedown((e) => {
//         const interval = setInterval(() => {
//                 console.log("you're choking me bro!")
//             },
//             500);
//     });
//     $('.plan').mouseup((e) => {
//         clearInterval(interval);
//     });
// }

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

const bindPlanClick = () => {
    $('.plan').click((e) => {
        showPlanExercises(e.currentTarget);
        planExercisesListInit(e.currentTarget.id);
    });
}

const openAddPlanWindow = (name, description, id, mode) => {
    $('#training-plans-menu').append($('<div class="popup-window" id="create-new-plan">').html(`
        <div class="popup-window-content" id="new-plan-content" data-item="${id}">
            <p>Plan name</p>
            <input type="text" class="form-input" id="form-plan-name" value=${name}>
            <p>Description</p>
            <textarea class="form-input" id="form-plan-description" value=${description}></textarea>
            <button class="button" id="${mode}-plan-form">${mode}</button>
        </div>
    `));
}

const hidePlanForm = () => {
    $('#create-new-plan').remove();
}

const addPlan = () => {
    const plan = getPlanFormValues();
    createNewPlan(plan);
    savePlanToStorage(plan);
}

const getPlanFormValues = () => {
    const plan = {
        id: createNewId(),
        name: $('#form-plan-name').val(),
        description: $('#form-plan-description').val(),
        exercises: [],
    };
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
    bindAreaAroundPlanForm();
    bindAddPlanButtonOnForm();
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

const editPlanProperties = () => {

}