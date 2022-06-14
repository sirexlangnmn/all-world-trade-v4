function registrationEmailVerification(uuid, verification_code, email_or_social_media) {
    $.ajax({
        url: '/api/post/registration-email-verification',
        type: 'POST',
        data: {
            uuid: uuid,
            verification_code: verification_code,
            email_or_social_media: email_or_social_media,
        },
        success: function (data) {
            console.log(data);

            if (data == 'email sent') {
                location.replace(host + '/email-verification');
            }
        },
        error: function (e) {
            // some code here
        },
    });
}