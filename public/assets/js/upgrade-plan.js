$(function () {
    getUser();
    getUsersAccount();
});

function getUser() {
    $.ajax({
        url: '/api/get/user',
        type: 'POST',
        success: function (data) {
            console.log(data);
            // document.getElementById('firstName').innerHTML = data[0].first_name;
            // document.getElementById('lastName').innerHTML = data[0].last_name;
            // document.getElementById('middleName').innerHTML = data[0].middle_name;
            
            document.getElementById('text-xl-name').innerHTML = 'Pick your Plan, ' + data[0].first_name;
        },
    });
}


function getUsersAccount() {
    $.ajax({
        url: '/api/get/users-account',
        type: 'POST',
        success: function (data) {
            console.log(data);
            // document.getElementById('emailAddress').innerHTML = data[0].email_or_social_media;
        },
    });
}


document.getElementById('mediumScale').addEventListener('click', (e) => {
    location.replace(host + '/upgrade-to-medium-scale');
});

document.getElementById('largeScale').addEventListener('click', (e) => {
    location.replace(host + '/upgrade-to-large-scale');
});

document.getElementById('tradersScale').addEventListener('click', (e) => {
    location.replace(host + '/upgrade-to-traders');
});
