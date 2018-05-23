import $ from 'jquery';
import { bindTrainingPlansButton, bindExercisesButton } from './navigation';
import { showAbout } from './manageSectionChange';

export const mainMenuInit = () => {
    $(() => {
        bindTrainingPlansButton();
        bindExercisesButton();
        bindAboutButton();
    });
}

const bindAboutButton = () => {
    $('#show-about').click((e) => {
        showAbout(`
            <p>Training Planner</p>
            <br />
            <p>Version: 0.9</p>
            <br />
            <p>Author: Klaudia Zając</p>
            <p>Contact: klaudia.zajac@email.com</p>
            <br />
            <p>Welcome to the Training Planner app!</p>
            <br />
            <p>It's a simple web application made for storing physical exercises and then combining them into training plans.</p>
            <br />
            <p>You may store up to 10 various training plans, each with its own description and unique set of exercises. The amount of exercises, in storage and each plan, is unlimited.</p>
            <br />
            <p>Edition mode of each plan's properties can be accessed through double click on the plan name in the main list.</p>
            <br />
            <p>Enjoy!</p>
        `);
        bindCloseAboutButton();
    });
}

const bindCloseAboutButton = () => {
    $('#close-about').click((e) => {
        $('#about').remove();
    });
}