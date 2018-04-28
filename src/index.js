import './css/index.css';
import './css/other.css';
import $ from 'jquery';
import { bindTrainingPlansButton, bindExercisesButton } from './mainMenu';
import { bindBackButtonOnPlans } from './plans';
import { bindBackButtonOnExercisesMenu, bindAddButtonOnExercisesMenu } from './exercises';
import { importDataFromStorage } from './storage';
console.log('JavaScript was attached to the page!');

$(() => {
    console.log('Locked and loaded!');
    importDataFromStorage();
    bindTrainingPlansButton();
    bindExercisesButton();
    bindBackButtonOnPlans();
    bindBackButtonOnExercisesMenu();
    bindAddButtonOnExercisesMenu();
});