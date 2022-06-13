function registrationUploadBusinessMedias(uuid) {
    // // Get form
    // let form = $('#traderRegistrationForm')[0];

    // // Create an FormData object
    // let formData = new FormData(form);
    // formData.append('uuid', uuid);

    let companyLogo = document.getElementById('companyLogo').files.length;
    let companyBanner = document.getElementById('companyBanner').files.length;
    let thumbnailInput = document.getElementById('thumbnailInput').files.length;
    let brochureInput = document.getElementById('brochureInput').files.length;
    let webinarsThumbnailInput = document.getElementById('webinarsThumbnailInput').files.length;

    let isWantToUploadVideo = document.getElementById('inputWantToUploadCompanyVideo').value;
    let isWantToUploadBrochure = document.getElementById('inputWantToUploadCompanyBrochure').value;
    let isWantToUploadCompanyWebinar = document.getElementById('inputWantToUploadCompanyWebinar').value;

    console.log('uuid');
    console.log(uuid);
    console.log('companyLogo');
    console.log(companyLogo);
    console.log('companyBanner');
    console.log(companyBanner);
    console.log('thumbnailInput');
    console.log(thumbnailInput);
    console.log('brochureInput');
    console.log(brochureInput);
    console.log('webinarsThumbnailInput');
    console.log(webinarsThumbnailInput);
    console.log('isWantToUploadVideo');
    console.log(isWantToUploadVideo);
    console.log('isWantToUploadBrochure');
    console.log(isWantToUploadBrochure);
    console.log('isWantToUploadCompanyWebinar');
    console.log(isWantToUploadCompanyWebinar);

    if (
        companyLogo == 1 &&
        companyBanner == 1 &&
        thumbnailInput == 1 &&
        brochureInput == 1 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == 1
    ) {
        let response = registrationUploadAllUsersBusinessMedias(uuid);
        console.log('yes registrationUploadAllUsersBusinessMedias');
        console.log('registrationUploadAllUsersBusinessMedias: ' + response);
    } else {
        console.log('no registrationUploadAllUsersBusinessMedias');
    }

    if (
        companyLogo == 0 &&
        companyBanner == 1 &&
        thumbnailInput == 1 &&
        brochureInput == 1 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == 1
    ) {
        let response = registrationUploadAllButNoLogo(uuid);
        console.log('yes registrationUploadAllButNoLogo');
        console.log('registrationUploadAllButNoLogo: ' + response);
    } else {
        console.log('no registrationUploadAllButNoLogo');
    }

    if (
        companyLogo == 1 &&
        companyBanner == 0 &&
        thumbnailInput == 1 &&
        brochureInput == 1 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == 1
    ) {
        let response = registrationUploadAllButNoBanner(uuid);
        console.log('yes registrationUploadAllButNoBanner');
        console.log('registrationUploadAllButNoBanner: ' + response);
    } else {
        console.log('no registrationUploadAllButNoBanner');
    }

    if (
        companyLogo == 1 &&
        companyBanner == 1 &&
        brochureInput == 1 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == 1
    ) {
        let response = registrationUploadAllButNoVideo(uuid);
        console.log('yes registrationUploadAllButNoVideo');
        console.log('registrationUploadAllButNoVideo: ' + response);
    } else {
        console.log('no registrationUploadAllButNoVideo');
    }

    if (
        companyLogo == 1 &&
        companyBanner == 1 &&
        thumbnailInput == 1 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == 1
    ) {
        let response = registrationUploadAllButNoBrochure(uuid);
        console.log('yes registrationUploadAllButNoBrochure');
        console.log('registrationUploadAllButNoBrochure: ' + response);
    } else {
        console.log('no registrationUploadAllButNoBrochure');
    }

    if (
        companyLogo == 1 &&
        companyBanner == 1 &&
        thumbnailInput == 1 &&
        brochureInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == ''
    ) {
        let response = registrationUploadAllButNoWebinar(uuid);
        console.log('yes registrationUploadAllButNoWebinar');
        console.log('registrationUploadAllButNoWebinar: ' + response);
    } else {
        console.log('no registrationUploadAllButNoWebinar');
    }

    if (
        companyLogo == 1 &&
        companyBanner == 1 &&
        thumbnailInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == ''
    ) {
        let response = registrationUploadCompanyLogoBannerVideo(uuid);
        console.log('yes registrationUploadCompanyLogoBannerVideo');
        console.log('registrationUploadCompanyLogoBannerVideo: ' + response);
    } else {
        console.log('no registrationUploadCompanyLogoBannerVideo');
    }

    if (
        companyLogo == 1 &&
        companyBanner == 1 &&
        brochureInput == 1 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == ''
    ) {
        let response = registrationUploadCompanyLogoBannerBrochure(uuid);
        console.log('yes registrationUploadCompanyLogoBannerBrochure');
        console.log('registrationUploadCompanyLogoBannerBrochure: ' + response);
    } else {
        console.log('no registrationUploadCompanyLogoBannerBrochure');
    }

    if (
        companyLogo == 1 &&
        companyBanner == 1 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == 1
    ) {
        let response = registrationUploadCompanyLogoBannerWebinar(uuid);
        console.log('yes registrationUploadCompanyLogoBannerWebinar');
        console.log('registrationUploadCompanyLogoBannerWebinar: ' + response);
    } else {
        console.log('no registrationUploadCompanyLogoBannerWebinar');
    }

    if (
        companyLogo == 1 &&
        companyBanner == 0 &&
        thumbnailInput == 1 &&
        brochureInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == ''
    ) {
        let response = registrationUploadCompanyLogoVideoBrochure(uuid);
        console.log('yes registrationUploadCompanyLogoVideoBrochure');
        console.log('registrationUploadCompanyLogoVideoBrochure: ' + response);
    } else {
        console.log('no registrationUploadCompanyLogoVideoBrochure');
    }

    if (
        companyLogo == 1 &&
        companyBanner == 0 &&
        thumbnailInput == 1 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == 1
    ) {
        let response = registrationUploadCompanyLogoVideoWebinar(uuid);
        console.log('yes registrationUploadCompanyLogoVideoWebinar');
        console.log('registrationUploadCompanyLogoVideoWebinar: ' + response);
    } else {
        console.log('no registrationUploadCompanyLogoVideoWebinar');
    }

    if (
        companyLogo == 1 &&
        companyBanner == 0 &&
        brochureInput == 1 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == 1
    ) {
        let response = registrationUploadCompanyLogoBrochureWebinar(uuid);
        console.log('yes registrationUploadCompanyLogoBrochureWebinar');
        console.log('registrationUploadCompanyLogoBrochureWebinar: ' + response);
    } else {
        console.log('no registrationUploadCompanyLogoBrochureWebinar');
    }

    if (
        companyLogo == 0 &&
        companyBanner == 1 &&
        thumbnailInput == 1 &&
        brochureInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == ''
    ) {
        let response = registrationUploadCompanyBannerVideoBrochure(uuid);
        console.log('yes registrationUploadCompanyBannerVideoBrochure');
        console.log('registrationUploadCompanyBannerVideoBrochure: ' + response);
    } else {
        console.log('no registrationUploadCompanyBannerVideoBrochure');
    }

    if (
        companyLogo == 0 &&
        companyBanner == 1 &&
        thumbnailInput == 1 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == 1
    ) {
        let response = registrationUploadCompanyBannerVideoWebinar(uuid);
        console.log('yes registrationUploadCompanyBannerVideoWebinar');
        console.log('registrationUploadCompanyBannerVideoWebinar: ' + response);
    } else {
        console.log('no registrationUploadCompanyBannerVideoWebinar');
    }

    if (
        companyLogo == 0 &&
        companyBanner == 1 &&
        brochureInput == 1 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == 1
    ) {
        let response = registrationUploadCompanyBannerBrochureWebinar(uuid);
        console.log('yes registrationUploadCompanyBannerBrochureWebinar');
        console.log('registrationUploadCompanyBannerBrochureWebinar: ' + response);
    } else {
        console.log('no registrationUploadCompanyBannerBrochureWebinar');
    }

    if (
        companyLogo == 1 &&
        companyBanner == 1 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == ''
    ) {
        let response = registrationUploadCompanyLogoBanner(uuid);
        console.log('yes registrationUploadCompanyLogoBanner');
        console.log('registrationUploadCompanyLogoBanner: ' + response);
    } else {
        console.log('no registrationUploadCompanyLogoBanner');
    }

    if (
        companyLogo == 1 &&
        companyBanner == 0 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == ''
    ) {
        let response = registrationUploadCompanyLogo(uuid);
        console.log('yes registrationUploadCompanyLogo');
        console.log('registrationUploadCompanyLogo: ' + response);
    } else {
        console.log('no registrationUploadCompanyLogo');
    }

    if (
        companyLogo == 0 &&
        companyBanner == 1 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == ''
    ) {
        let response = registrationUploadCompanyBanner(uuid);
        console.log('yes registrationUploadCompanyBanner');
        console.log('registrationUploadCompanyBanner: ' + response);
    } else {
        console.log('no registrationUploadCompanyBanner');
    }

    if (
        companyLogo == 0 &&
        companyBanner == 0 &&
        thumbnailInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == ''
    ) {
        console.log('yes registrationUploadCompanyVideo');
        registrationUploadCompanyVideo(uuid);
    } else {
        console.log('no registrationUploadCompanyVideo');
    }

    if (
        companyLogo == 0 &&
        companyBanner == 0 &&
        brochureInput == 1 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == ''
    ) {
        console.log('yes registrationUploadCompanyBrochure');
        registrationUploadCompanyBrochure(uuid);
    } else {
        console.log('no registrationUploadCompanyBrochure');
    }

    if (
        companyLogo == 0 &&
        companyBanner == 0 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == 1
    ) {
        console.log('yes registrationUploadCompanyWebinar');
        registrationUploadCompanyWebinar(uuid);
    } else {
        console.log('no registrationUploadCompanyWebinar');
    }
}

function registrationUploadAllUsersBusinessMedias(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-all-users-business-medias',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadAllButNoLogo(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-all-but-no-logo',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadAllButNoBanner(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-all-but-no-banner',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadAllButNoVideo(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-all-but-no-video',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadAllButNoBrochure(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-all-but-no-brochure',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadAllButNoWebinar(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-all-but-no-webinar',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}
function registrationUploadCompanyLogoBannerVideo(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-logo-banner-video',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        async: false,
        success: function (data) {
            console.log(data);
            value = data;
            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyLogoBannerBrochure(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-logo-banner-brochure',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyLogoBannerWebinar(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-logo-banner-webinar',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyLogoVideoBrochure(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-logo-video-brochure',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyLogoVideoWebinar(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-logo-video-webinar',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyLogoBrochureWebinar(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-logo-brochure-webinar',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyBannerVideoBrochure(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-banner-video-brochure',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyBannerVideoWebinar(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-banner-video-webinar',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyBannerBrochureWebinar(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-banner-brochure-webinar',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyLogoBanner(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-logo-banner',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        async: false,
        success: function (data) {
            console.log(data);
            value = data;
            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyLogo(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-logo',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        async: false,
        success: function (data) {
            console.log(data);
            value = data;
            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyBanner(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-banner',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        async: false,
        success: function (data) {
            console.log(data);
            value = data;
            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyVideo(uuid) {
    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-video',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });
}

function registrationUploadCompanyBrochure(uuid) {
    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-brochure',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });
}

function registrationUploadCompanyWebinar(uuid) {
    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-webinar',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });
}
