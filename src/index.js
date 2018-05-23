import './css/index.css';
import $ from 'jquery';
import { loadMainMenu } from './manageSectionChange';



console.log('JavaScript was attached to the page!');

$(() => {
    console.log('Locked and loaded!');
    loadMainMenu();
});