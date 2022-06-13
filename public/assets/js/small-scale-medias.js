let companyLogoPreview;
let companyBannerPreview;
let companyLogoId;
let companyBannerId;

companyLogoPreview = getId('companyLogoPreview');
companyBannerPreview = getId('companyBannerPreview');
companyLogoId = getId('companyLogoId');
companyBannerId = getId('companyBannerId');


$(function () {
    getUsersLogoAndBanner();
});



function getUsersLogoAndBanner() {
    $.ajax({
        url: '/api/get/users-logo-and-banners',
        type: 'GET',
        success: function (data) {
            console.log(data);
            if (data.length > 0) {
                let companyBannerImage = data[0].banner ?  '/uploads/users_upload_files/' + data[0].banner : '/uploads/placeholder/banner-placeholder2.jpg';
                companyBannerPreview.src = host + companyBannerImage;
                companyLogoPreview.src = host + '/uploads/users_upload_files/' + data[0].logo;
                companyLogoId.value = data[0].id;
                companyBannerId.value = data[0].id;
            }
        },
    });
}

document.getElementById("companyLogo").onchange = (evt) => {
    const [file] = companyLogo.files;
    if (file) {
        companyLogoPreview.src = URL.createObjectURL(file);
        editcompanyLogo();
    }
};

document.getElementById("companyBanner").onchange = (evt) => {
    const [file] = companyBanner.files;
    if (file) {
        companyBannerPreview.src = URL.createObjectURL(file);
        editcompanyBanner();
    }
};

function editcompanyLogo() {
    // Get form
    let form = $('#editcompanyLogo')[0];

    // Create an FormData object
    let data = new FormData(form);

    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: '/api/post/update-trader-company-logo',
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            // some code here
        },
        error: function (e) {},
    });
}

function editcompanyBanner() {
    // Get form
    let form = $('#editcompanyBanner')[0];

    // Create an FormData object
    let data = new FormData(form);

    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: '/api/post/update-trader-company-banner',
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            // some code here
        },
        error: function (e) {},
    });
}