let btnRegistration;

let password;
let plainPassword;
let confirmPassword;
let hashedPassword;
let plainPasswordInput;
let hashedPasswordInput;

btnRegistration = getId('btnRegistration');

password = getId('password');
plainPassword = getId('plainPassword');
confirmPassword = getId('confirmPassword');
hashedPassword = getId('hashedPassword');
plainPasswordInput = getId('plainPasswordInput');
hashedPasswordInput = getId('hashedPasswordInput');

hashedPasswordInput.style.display = 'none';
plainPasswordInput.style.display = 'none';

// consume api to get all languages
async function getLanguages() {
    let response = await fetch(host + '/api/get/languages');
    let data = await response.json();
    return data;
}

// display all languages in frontend select option
getLanguages().then((data) => {
    language.innerHTML = '<option value="select">Select</option>';
    for (var i = 0; i < data.length; i++) {
        language.innerHTML =
            language.innerHTML + '<option value="' + data[i]['code'] + '">' + data[i]['name'] + '</option>';
    }
});

password.onkeyup = function () {
    hashedPasswordProcess();
    required(password, passwordValidation, 'Password');
};

function hashedPasswordProcess() {
    let inputPassword = password.value;
    plainPassword.value = inputPassword;

    if (inputPassword !== '') {
        $.ajax({
            url: '/api/post/password-hashing',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                password: inputPassword,
            }),
            success: function (response) {
                // console.log('hashedPasswordProcess');
                // console.log(response);
                hashedPassword.value = response;
            },
        });
    } else {
        traderHashedPassword.value = '';
    }
}

confirmPassword.addEventListener('blur', function () {
    passwordComparison('password', 'confirmPassword');
});

function passwordComparison(tags1, tags2) {
    let password1 = document.getElementById(tags1).value;
    let password2 = document.getElementById(tags2).value;
    if (password2 !== '') {
        if (password1 === password2) {
        } else {
            Swal.fire('Error', 'Password does not match.', 'danger');
        }
    }
}

btnRegistration.addEventListener('click', (e) => {
    //stop submit the form, we will post it manually.
    e.preventDefault();

    const form = $('#lookingForSmallScaleCompanyForm');
    let validation = registrationValidation();
    if (validation === 'true') {
        //     //if (validation != '') {
        $.ajax({
            url: '/api/post/looking-for-small-scale-company-registration',
            type: 'post',
            data: form.serialize(),
        }).done((response) => {
            console.log(response);
            if (response.id) {
                usersMediasProcess(response.uuid, response.verification_code);
                Swal.fire('Success', 'Registration Success.', 'success');
            }
            // if (response.message) {
            //     tradersRegistrationServerValidation(response.message);
            // }
        });
    }
});

function usersMediasProcess(uuid, verification_code) {
    // Get form
    let form = $('#lookingForSmallScaleCompanyForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);
    formData.append('verification_code', verification_code);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/users-medias-process',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);

            if (data === 'success upload files') {
                location.replace(host + '/email-verification');
            }
        },
        error: function (e) {
            // some code here
        },
    });
}
