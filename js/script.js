/*------------------------*/
/*--------- FORM ---------*/
/*------------------------*/

let signUpForm = document.forms.signUpForm;
let signInForm = document.forms.signInForm;
let fields = signUpForm.querySelectorAll(`.field`);
let mesBoxes = signUpForm.querySelectorAll(`.mesBox`);
let siFields = signInForm.querySelectorAll(`.field`);
let siMesBoxes = signInForm.querySelectorAll(`.mesBox`);
let signUpModal = document.querySelector(`.sign-up`);
let signInModal = document.querySelector(`.sign-in`);
let regex = {
    username: /^\w{8,24}$/i,
    password: /^[a-z0-9]{6,12}$/,
    retype: /^.+$/,
    email: /^[\w\-\.]+@[\w\-\.]+\.[a-z]{2,5}(\.[a-z]{2,5})?$/,
    language: /^.+$/
}
let mesBox = {
    username: mesBoxes[0],
    password: mesBoxes[1],
    retype: mesBoxes[2],
    email: mesBoxes[3],
    gender: mesBoxes[4],
    language: mesBoxes[5]
}
let message = {
    username: `Username must be 8-24 alphanumberic characters (or "-", "_", ".")`,
    password: `Password must be 6-12 alphanumberic characters.`,
    retype: `Please confirm password.`,
    email: `Please enter a valid email (ex: John@gmail.com).`,
    gender: `Please choose gender.`,
    language: `Please choose a language.`
}

document.querySelectorAll(`.card__footer .btn`).forEach(btn => btn.addEventListener(`click`, (e) => {
    e.preventDefault();
    toggleModal(signInModal);
}));
document.querySelector(`#signInBtn`).addEventListener(`click`, () => toggleModal(signInModal));
document.querySelectorAll(`.switch-mode`).forEach(switchMode => {
    switchMode.addEventListener(`click`, () => {
        toggleModal(signUpModal);
        toggleModal(signInModal);
        clear(fields, mesBoxes, signUpForm.gender);
        clear(siFields, siMesBoxes);
    })
});
document.querySelector(`.sign-in .fa-times`).addEventListener(`click`, () => {
    clear(siFields, siMesBoxes);
    toggleModal(signInModal);
});
document.querySelector(`.sign-up .fa-times`).addEventListener(`click`, () => {
    clear(fields, mesBoxes, signUpForm.gender);
    toggleModal(signUpModal);
});

for (i of nationalities) {
    document.querySelector(`#suggestions`).innerHTML += `<option>${i}</option>`;
}

signUpForm.addEventListener(`submit`, signUp);

function signUp(e) {
    let allValid = true;
    for (let i of fields) {
        if (!isValid(i, regex[i.id], mesBox[i.id], message[i.id])) {
            allValid = false;
        }
    }
    if (!(genderValue = isChecked(signUpForm.gender, mesBox.gender, message.gender))) {
        allValid = false;
    }
    if (!allValid) {
        e.preventDefault();
    }
}

function isValid(field, regex, mesBox, message) {
    if (regex.test(field.value)) {
        if (field === signUpForm.retype) {
            if (signUpForm.password.value !== field.value) {
                field.setAttribute(`class`, `field invalid`)
                mesBox.innerHTML = `Does not match`;
                return false;
            }
        }
        mesBox.innerHTML = ``
        field.setAttribute(`class`, `field valid`)
        return true;
    }
    field.setAttribute(`class`, `field invalid`)
    mesBox.innerHTML = message;
}

function isChecked(fields, mesBox, message) {
    for (let i of fields) {
        if (i.checked) {
            mesBox.innerHTML = ``
            mesBox.style.color = `#0d0`;
            return i.value;
        }
    }
    mesBox.style.color = `#f50`;
    mesBox.innerHTML = message;
}

function toggleModal(modal) {
    if (modal.classList.contains(`hidden`)) {
        modal.classList.toggle(`hidden`);
        setTimeout(() => modal.classList.toggle(`down`), 100);
    } else {
        modal.classList.toggle(`down`);
        setTimeout(() => modal.classList.toggle(`hidden`), 700);
    }
}

function clear(fields, mesBoxes, checkFields) {
    mesBoxes.forEach(i => i.innerHTML = ``);
    fields.forEach(i => {
        i.value = ``;
        i.setAttribute(`class`, `field`)
    });
    if (checkFields) {
        checkFields.forEach(i => i.checked = false);
    }
}

// LIVE CHECK
fields.forEach(field => {
    field.addEventListener(`input`, function () {
        isValid(this, regex[this.id], mesBox[this.id], message[this.id]);
    })
})

signUpForm.gender.forEach(gender => {
    gender.addEventListener(`input`, function () {
        isChecked(signUpForm.gender, mesBox.gender, message.gender);
    })
})

signUpForm.password.addEventListener(`input`, function () {
    isValid(signUpForm.retype, regex[signUpForm.retype.id], mesBox[signUpForm.retype.id], message[signUpForm.retype.id]);
})


/*-------------------------------------*/
/*--------- EFFECTS ON SCROLL ---------*/
/*-------------------------------------*/

function scrollNicely(elementSelector, triggerPointSelector, effectClass, isTemporary, offset) {
    let elements = document.querySelectorAll(elementSelector);
    let triggerPoint = document.querySelector(triggerPointSelector);
    elements.forEach(element => {
        if (window.pageYOffset >= triggerPoint.offsetTop - offset) {
            element.classList.add(effectClass);
        } else if (isTemporary) {
            element.classList.remove(effectClass);
        }
    })
}
window.addEventListener(`scroll`, () => {
    if (hamburger.classList.contains(`cross`)) {
        hamburger.classList.remove(`cross`);
        navMenu.style.height = `0px`;
        hero.style.top = `50%`;
        isDown = false;
    }
    /*----- STICKY -----*/
    scrollNicely(`nav`, `.features`, `sticky`, true, 60);

    /*----- STEPS -----*/
    scrollNicely(`.steps__main-img`, `.steps`, `fadeInUp`, false, window.innerHeight / 2);

    /*----- FEATURES -----*/
    scrollNicely(`.features__modules-wrapper`, `.features`, `fadeInUp`, false, window.innerHeight * 1 / 3);

    /*----- TESTIMONIALS -----*/
    scrollNicely(`.testimonials__modules-wrapper`, `.testimonials`, `fadeIn`, false, window.innerHeight / 2);

    /*----- CITIES -----*/
    scrollNicely(`.cities__modules-wrapper`, `.cities`, `fadeIn`, false, window.innerHeight / 2);

    /*----- PURCHASE -----*/
    scrollNicely(`.card`, `.purchase`, `flipInY`, false, window.innerHeight * 1 / 3);

    /*----- MEALS -----*/
    scrollNicely(`.meals`, `.meals`, `colorful`, false, window.innerHeight * 1 / 3);
})

document.querySelector(`.card:first-child`).addEventListener(`animationend`, function () {
    this.classList.add(`tada`);
})

/*-------------------------------------*/
/*--------- SCROLL NAVIGATION ---------*/
/*-------------------------------------*/

function scrollSmoothlyTo(triggerSelector, destinationSelector) {
    let trigger = document.querySelector(triggerSelector);
    let destination = document.querySelector(destinationSelector);
    trigger.addEventListener(`click`, (e) => {
        e.preventDefault();
        window.scrollTo({
            top: destination.offsetTop - 60,
            left: 0,
            behavior: `smooth`
        })
    })
}

scrollSmoothlyTo(`.nav-bar__logo`, `header`);
scrollSmoothlyTo(`.nav-bar__link:nth-of-type(1)`, `.features`);
scrollSmoothlyTo(`.nav-bar__link:nth-of-type(2)`, `.steps`);
scrollSmoothlyTo(`.nav-bar__link:nth-of-type(3)`, `.cities`);
scrollSmoothlyTo(`.hero-text-box .btn:nth-of-type(1)`, `.purchase`);
scrollSmoothlyTo(`.hero-text-box .btn:nth-of-type(2)`, `.features`);


/*-------------------------------------*/
/*--------- TOGGLE HAMBURGER ---------*/
/*-------------------------------------*/

let isDown = false;
let navMenu = document.querySelector(`.nav-bar__menu`);
let heightChecked = false;
let menuHeight = 0;
let initHeight = 0;
let hamburger = document.querySelector(`.hamburger`);
let hero = document.querySelector(`.hero-text-box`);
hamburger.addEventListener(`click`, toggleHamburger);


function toggleHamburger() {
    if (heightChecked) {
        menuHeight = initHeight;
    } else {
        navMenu.style.height = `unset`;
        initHeight = navMenu.offsetHeight;
        menuHeight = initHeight;
        heightChecked = true;
        navMenu.style.height = `0px`;
        // navMenu.style.opacity = `1`;
    }
    
    this.classList.toggle(`cross`);
    setTimeout(() => {
        if (isDown) {
            isDown = false;
            navMenu.style.height = `0px`;
            hero.style.top = `50%`;
        } else {
            navMenu.style.height = `${menuHeight}px`;
            if (hero.offsetHeight > 179) {
                hero.style.top = `65%`;
            }
            isDown = true;
        }
    }, 100);
}
// if we give the navMenu a fixed height then maybe we can just add class