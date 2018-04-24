import './css/index.css';
import './css/other.css';
import $ from 'jquery';
import { bindTrainingPlansButton, bindExercisesButton } from './mainMenu';
import { bindBackButtonOnPlans } from './plans';
import { bindBackButtonOnExercises, bindAddButtonOnExercises } from './exercises';
console.log('JavaScript was attached to the page!');

$(() => {
    console.log('Locked and loaded!');
    bindTrainingPlansButton();
    bindExercisesButton();
    bindBackButtonOnPlans();
    bindBackButtonOnExercises();
    bindAddButtonOnExercises();
});