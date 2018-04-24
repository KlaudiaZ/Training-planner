import $ from 'jquery';

export const bindBackButtonOnPlans = () => {
    $('#go-back-plans').click((e) => {
        $('#main-menu').attr('data-visibility', 'visible');
        $('#training-plans-menu').attr('data-visibility', 'invisible');
    });
}