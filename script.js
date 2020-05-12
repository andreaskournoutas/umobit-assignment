$(window).on('load', function (e) {
	resizeServicesBackground();
});

$(window).resize(function() {
    resizeServicesBackground();
    closeOffCanvas();
});

$('.header__open-off-canvas').click(function() {
	openOffCanvas();
});

$('.off-canvas__close-button').click(function() {
	closeOffCanvas();
});

$('.dark-layer').click(function() {
	closeOffCanvas();
});

$('.contact-me__input').on('blur', function (e) {
	validateInput(this);
});

$('#contact-me__submit').click(function() {
    submitForm();
});

function resizeServicesBackground() {
    $('.services__background').height($('.services__content').height() - 75);
}

function openOffCanvas() {
    $('body').addClass('no-scroll');
    $('.dark-layer').addClass('dark-layer--active');
    $('.off-canvas').addClass('off-canvas--open');
}

function closeOffCanvas() {
    $('.off-canvas').removeClass('off-canvas--open');
    $('.dark-layer').removeClass('dark-layer--active');
    $('body').removeClass('no-scroll');
}

function validateInput(element) {
    if ($(element).val() == '') {
        $(element).removeClass('contact-me__input--success').addClass('contact-me__input--error');
        $(element).siblings('.contact-me__error').addClass('contact-me__error--visible');
        return false;
    }
    else {
        $(element).removeClass('contact-me__input--error').addClass('contact-me__input--success');
        $(element).siblings('.contact-me__error').removeClass('contact-me__error--visible');
        return true;
    }
}

function submitForm() {
    let inputIsValid = false, formIsValid = true;
    $('.contact-me__input').each(function() {
        inputIsValid = validateInput(this);
        formIsValid = formIsValid && inputIsValid;
    });
    if (formIsValid == true) {
        $('.contact-me__input').attr('disabled', 'disabled');
        $('#contact-me__submit').attr('disabled', 'disabled');
        $('.spinner-border').show();
        setTimeout(function() { // simulates service call
            $('.contact-me__input').val('').removeClass('contact-me__input--success').removeAttr('disabled');
            $('#contact-me__submit').removeAttr('disabled');
            $('.spinner-border').hide();
            $('.contact-me__success').addClass('contact-me__success--visible');
        }, 1000);
    }
    else {
        $('.contact-me__success').removeClass('contact-me__success--visible');
    }
}