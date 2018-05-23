import $ from 'jquery';
import { bindTrainingPlansButton, bindExercisesButton } from './navigation';

export const mainMenuInit = () => {
    $(() => {
        bindTrainingPlansButton();
        bindExercisesButton();
    });
}