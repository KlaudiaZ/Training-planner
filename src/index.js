import './css/index.css';
import './css/other.css';
import $ from 'jquery';
import { mainMenuInit } from './mainMenu';
import { plansListInit } from './plansList';
import { exercisesInit } from './exercises';
import { importDataFromStorage } from './storage';
console.log('JavaScript was attached to the page!');

$(() => {
    console.log('Locked and loaded!');
    importDataFromStorage();
    mainMenuInit();
    plansListInit();
    exercisesInit();
});