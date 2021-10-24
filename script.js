let getClass = className => document.querySelector(className);

let allProfile = [];
let profile = {}
let someEmail;

// SIGNUP


const nameRegExp = /^[a-zA-Z]{1,20}$/;
const passRegExp = /^\w{8,15}$/;
const emailRegExp = /^[\w-\.]+@[a-zA-Z]+\.(ua|com)$/;

function checkField(regExpResult, className, promptName) {
    validation()
    setState(getClass(className), regExpResult)
    regExpResult ? getClass(promptName).classList.add(`hide`) : getClass(promptName).classList.remove(`hide`)

}
let testFirstName
getClass('.firstName').oninput = function () {
    testFirstName = nameRegExp.test(this.value)
    checkField(testFirstName, '.firstName', '.prompt1')
}
let testSecondName
getClass('.secondName').oninput = function () {
    testSecondName = nameRegExp.test(this.value)
    checkField(testSecondName, '.secondName', '.prompt2')
}

let testEmail
let emailInUse = false
getClass('.email').oninput = function () {
    testEmail = emailRegExp.test(this.value)

    if (JSON.parse(localStorage.getItem('allProfile'))?.some(elem => elem.email.toLowerCase() === this.value.toLowerCase())) {
        getClass('.prompt3').textContent = `This email is already in use`
        emailInUse = true;
    }
    else {
        emailInUse = false;
        getClass('.prompt3').textContent = `Please provide a valid Email address.`
        checkField(testEmail, '.email', '.prompt3')
    }
}



let testPass
getClass('.password').oninput = function () {
    testPass = passRegExp.test(this.value)
    checkField(testPass, '.password', '.prompt4')
}

const validation = () => getClass(`.signUp`).disabled = !(testPass && testEmail && testFirstName && testSecondName && !emailInUse)

// ENDSIgnUP

// SignIn

function checkFieldProfile(regExpResult, className) {
    validationProfile()
    setState(getClass(className), regExpResult)
    getClass(`.prompt5`).classList.add(`hide`)

}

let testEmailProfile;
getClass('.profileEmail').oninput = function () {
    testEmailProfile = emailRegExp.test(this.value)
    checkFieldProfile(testEmailProfile, `.profileEmail`)

}

let testPassProfile
getClass('.profilePassword').oninput = function () {
    testPassProfile = passRegExp.test(this.value)
    checkFieldProfile(testPassProfile, `.profilePassword`)
}

function validationProfile() {

    if (testPassProfile && testEmailProfile && allProfile.some(elem => elem.email === getClass('.profileEmail').value.toLowerCase() && elem.password.toLowerCase() === getClass('.profilePassword').value.toLowerCase())) {
        allProfile = JSON.parse(localStorage.getItem('allProfile'));
        for (let i = 0; i < allProfile.length; i++) {
            if (getClass(`.profileEmail`).value == allProfile[i].email) {
                getClass(`.profileName`).textContent = allProfile[i].name + ' ' + allProfile[i].secondName;
                getClass(`.profileEmails`).textContent = allProfile[i].email;
            }
        }
    }
}


// END SignIn





function removeAll() {
     getClass(`.signUp`).disabled = true
    getClass('.firstName').classList.remove(`valid`)
    getClass('.secondName').classList.remove(`valid`)
    getClass('.email').classList.remove(`valid`)
    getClass('.password').classList.remove(`valid`)
    getClass('.firstName').classList.remove(`invalid`)
    getClass('.secondName').classList.remove(`invalid`)
    getClass('.email').classList.remove(`invalid`)
    getClass('.password').classList.remove(`invalid`)
    getClass('.prompt3').classList.add(`hide`)
    getClass('.prompt4').classList.add(`hide`)
    getClass('.profileEmail').classList.remove(`valid`)
    getClass('.profilePassword').classList.remove(`valid`)
    getClass('.profileEmail').classList.remove(`invalid`)
    getClass('.profilePassword').classList.remove(`invalid`)
    getClass('.profileEmail').value = ``
    getClass('.profilePassword').value = ``
    getClass('.firstName').style.border = `none`
    getClass('.secondName').style.border = `none`
    getClass('.email').style.border = `none`
    getClass('.password').style.border = `none`
    getClass(`.signUp`).style.backgroundColor = "rgb(111, 111, 250)"
    testPass = false;
    testEmail = false;
    testFirstName = false;
    testSecondName = false;
}

function setState(elem, valid = true) {
    elem.classList.remove(valid ? `invalid` : `valid`)
    elem.classList.add(valid ? `valid` : `invalid`)
}

getClass(`.signUp`).onclick = function () {
    event.preventDefault();
    profile = {
        name: getClass('.firstName').value,
        secondName: getClass('.secondName').value,
        email: getClass('.email').value,
        password: getClass('.password').value
    }

    if (localStorage.length > 0 && localStorage.getItem('allProfile')) {
        allProfile = Array.from(JSON.parse(localStorage.getItem('allProfile')));
    }
    if (!allProfile.some(some => some.email === getClass('.email').value.toLowerCase())) {
        allProfile.push(profile);
    }

    localStorage.setItem('allProfile', JSON.stringify(allProfile));
    console.log(allProfile)
    getClass(`.form`).reset()
    removeAll()

}

getClass(`.signInNow`).onclick = function () {
    getClass(`.success-blok`).classList.remove(`hide`)
    getClass(`.form`).classList.add(`hide`)
    removeAll()
    event.preventDefault()
}

getClass(`.signIn`).onclick = function () {

    if (testPassProfile && testEmailProfile && allProfile.some(elem => elem.email === getClass('.profileEmail').value.toLowerCase() && elem.password.toLowerCase() === getClass('.profilePassword').value.toLowerCase())) {
        getClass(`.profile`).classList.remove(`hide`)
        getClass(`.success-blok`).classList.add(`hide`)
        someEmail = getClass(`.profileEmail`).value;
        console.log(someEmail)
        event.preventDefault()
    }
    else if (localStorage.length <= 0) {
        getClass(`.prompt5`).textContent = `LocalStorage is empty`
        getClass(`.prompt5`).classList.remove(`hide`)

    }
    else {
        getClass(`.prompt5`).textContent = `Wrong email or password. Try again.`
        getClass(`.prompt5`).classList.remove(`hide`)
    }

}

getClass(`.profileSignUp`).onclick = function () {
    getClass(`.profile`).classList.add(`hide`);
    getClass(`.form`).classList.remove(`hide`);
    getClass(`.form`).reset()
    removeAll()
}

getClass(`.signUpNow`).onclick = function () {
    getClass(`.success-blok`).classList.add(`hide`);
    getClass(`.form`).classList.remove(`hide`);
    getClass(`.prompt5`).classList.add(`hide`)
    getClass(`.form`).reset()
    removeAll()
}

