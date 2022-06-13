// 'use strict';

let companyLogoPreview;
let companyBannerPreview;
let companyLogoId;
let companyBannerId;

let btnUpgradeToTraders;

let tagline;
let website;
let businessEmailAddress;
let businessContactNumber;
let businessSocialMediaContactType;
let businessSocialMediaContactNumber;
let businessAddress;
let businessCountryLocation;
let businessCityLocation;
let startOperatingHour;
let endOperatingHour;
let languagesOfCommunication;
let currentLanguagesOfCommunication;
let tradeCategory;
let traderSubCategoryToggleField;
let traderMinorSubCategoryToggleField;
let businessScale;

companyLogoPreview = getId('companyLogoPreview');
companyBannerPreview = getId('companyBannerPreview');
companyLogoId = getId('companyLogoId');
companyBannerId = getId('companyBannerId');

btnUpgradeToTraders = getId('btnUpgradeToTraders');

tagline = getId('tagline');
website = getId('website');
businessEmailAddress = getId('businessEmailAddress');
businessContactNumber = getId('businessContactNumber');
businessSocialMediaContactType = getId('businessSocialMediaContactType');
businessSocialMediaContactNumber = getId('businessSocialMediaContactNumber');
businessAddress = getId('businessAddress');
currentLanguagesOfCommunication = getId('currentLanguagesOfCommunication');

$(function () {
    getUsersLogoAndBanner();
    getUser();
    getUsersAccount();
    getCompanyDetails();
});

function getCompanyDetails() {
    $.ajax({
        url: '/api/get/company-details',
        type: 'POST',
        success: function (data) {
            console.log('/api/get/company-details');
            console.log(data);

            document.getElementById('traderCompanyName').value = data[0].business_name;
            businessAddress.value = data[0].business_address;
            currentLanguagesOfCommunication.value = data[0].business_language_of_communication;
            tagline.value = data[0].business_tagline;
            website.value = data[0].business_website;
            businessEmailAddress.value = data[0].business_email;
            businessContactNumber.value = data[0].business_contact;
            getBusinessSocialMediaContactType(data[0].business_social_media_contact_type);
            businessSocialMediaContactNumber.value = data[0].business_social_media_contact_number;


            if (data[0].business_name == null || data[0].business_name == "") {
                document.getElementById('traderCompanyNameValidation').innerHTML = 'Company Name is required';
            }
            if (data[0].business_address == null || data[0].business_address == "") {
                document.getElementById('businessAddressValidation').innerHTML = 'Business Address is required';
            }
            if (data[0].business_tagline == null || data[0].business_tagline == "") {
                document.getElementById('taglineValidation').innerHTML = 'Tagline is required';
            }
            if (data[0].business_website == null || data[0].business_website == "") {
                document.getElementById('websiteValidation').innerHTML = 'Business Website is required';
            }
            if (data[0].business_email == null || data[0].business_email == "") {
                document.getElementById('businessEmailAddressValidation').innerHTML = 'Business Email Address is required';
            }
            if (data[0].business_contact == null || data[0].business_contact == "") {
                document.getElementById('businessContactNumberValidation').innerHTML = 'business Contact Number is required';
            }
            if (data[0].business_social_media_contact_type == null || data[0].business_social_media_contact_type == "") {
                document.getElementById('businessSocialMediaContactTypeValidation').innerHTML = 'Business Social Media Contact Type is required';
            }
            if (data[0].business_social_media_contact_number == null || data[0].business_social_media_contact_number == "") {
                document.getElementById('businessSocialMediaContactNumberValidation').innerHTML = 'Business Social Media Contact Number is required';
            }
            // if (data[0].start_operating_hour == null || data[0].start_operating_hour == "") {
            //     document.getElementById('startOperatingHourValidation').innerHTML = 'Start of Operating Hour is required';
            // }
            // if (data[0].end_operating_hour == null || data[0].end_operating_hour == "") {
            //     document.getElementById('endOperatingHourValidation').innerHTML = 'End of Operating Hour is required';
            // }
            // if (data[0].business_ == null || data[0].business == "") {
            //     document.getElementById('Validation').innerHTML = ' is required';
            // }

        },
    });
}

function getBusinessSocialMediaContactType(value) {
    let jsonObj =
        '{ "companyDetails" : [' +
        '{ "id":"1" , "title":"Viber" },' +
        '{ "id":"2" , "title":"Wechat" },' +
        '{ "id":"3" , "title":"Whatsapp" } ]}';

    const parsedObj = JSON.parse(jsonObj);
    let companyDetails = parsedObj.companyDetails;
    if (value) {

        let filtered = companyDetails.filter((d) => d.id == value);
        businessSocialMediaContactType.innerHTML =
            '<option value="' + filtered[0].id + '">' + filtered[0].title + '</option>';

    } else {
        businessSocialMediaContactType.innerHTML = '<option value="">Select</option>';
    }

    for (var i = 0; i < companyDetails.length; i++) {
        businessSocialMediaContactType.innerHTML =
            businessSocialMediaContactType.innerHTML +
            '<option value="' +
            companyDetails[i]['id'] +
            '">' +
            companyDetails[i]['title'] +
            '</option>';
    }

    $('#businessSocialMediaContactType').selectpicker('refresh');
}

// display all users logo and banners in frontend profiles
function getUsersLogoAndBanner() {
    $.ajax({
        url: '/api/get/users-logo-and-banners',
        type: 'GET',
        success: function (data) {
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

companyLogo.onchange = (evt) => {
    const [file] = companyLogo.files;
    if (file) {
        companyLogoPreview.src = URL.createObjectURL(file);
        editcompanyLogo();
    }
};

companyBanner.onchange = (evt) => {
    const [file] = companyBanner.files;
    if (file) {
        companyBannerPreview.src = URL.createObjectURL(file);
        editcompanyBanner();
    }
};

function getLanguageName(string) {
    if (string) {
        let data = string.split(',');
        for (var i = 0; i < data.length; i++) {
            displayLanguageOfComm.innerHTML =
                displayLanguageOfComm.innerHTML +
                '<a href="#" class="bg-gray-200 py-1.5 px-4 rounded-full">' +
                getLanguageNameByCode(data[i]) +
                '</a>';
        }
    } else {
        displayLanguageOfComm.innerHTML = 'N/A';
    }
}

function getLanguageNameByCode(code) {
    let value;
    $.ajax({
        url: host + '/api/get/language-name-by-code/' + code,
        async: false,
        success: function (data) {
            value = data[0].name;
        },
    });
    return value;
}

function getTradeCategoriesTitleById(id) {
    let value;

    if (id) {
        $.ajax({
            url: host + '/api/get/trade-category-title-by-id/' + id,
            async: false,
            success: function (data) {
                value = data[0].title;
            },
        });
        return value;
    } else {
        return 'N/A';
    }
}

function getSubCategoriesTitleById(id) {
    let value;
    $.ajax({
        url: host + '/api/get/sub-category-title-by-id/' + id,
        async: false,
        success: function (data) {
            value = data[0].title;
        },
    });
    return value;
}

function getMinorSubCategoriesTitleById(id) {
    let value;
    $.ajax({
        url: host + '/api/get/minor-sub-category-title-by-id/' + id,
        async: false,
        success: function (data) {
            value = data[0].title;
        },
    });
    return value;
}

function getBusinessScaleTitle(id) {
    let value;

    switch (id) {
        case '1':
            value = 'Small Scale';
            break;
        case '2':
            value = 'Medium Scale';
            break;
        case '3':
            value = 'Large Scale';
            break;
        default:
            value = 'N/A';
    }

    return value;
}

function getUser() {
    $.ajax({
        url: '/api/get/user',
        type: 'POST',
        success: function (data) {
            document.getElementById('displayReprestativeFullname').innerHTML =
                data[0].first_name + ' ' + data[0].last_name;
        },
    });
}

function getUsersAccount() {
    $.ajax({
        url: '/api/get/users-account',
        type: 'POST',
        success: function (data) {
            document.getElementById('displayReprestativeEmailAddress').innerHTML = data[0].email_or_social_media;
            document.getElementById('displayReprestativeContactNumber').innerHTML = data[0].contact_number;
        },
    });
}

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
        error: function (e) { },
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
        error: function (e) { },
    });
}


function getUsersBusinessScale(data) {
    console.log("function getUsersBusinessScale(data)");
    console.log(data.length);
    if (data.length > 0) {
        if (data[0].business_scale) {
            let value = data[0].business_scale;
            let x = getBusinessScaleTitle(value);
            document.getElementById('editBusinessScale').innerHTML = '<option value="' + value + '">' + x + '</option>';
        } else {
            document.getElementById('editBusinessScale').innerHTML = '<option value="">Select</option>';
        }
    } else {
        document.getElementById('editBusinessScale').innerHTML = '<option value="">Select</option>';
    }

    let jsonObj =
        '{ "companyDetails" : [' +
        '{ "id":"1" , "title":"Small Scale" },' +
        '{ "id":"2" , "title":"Medium Scale" },' +
        '{ "id":"3" , "title":"Large Scale" } ]}';

    const parsedObj = JSON.parse(jsonObj);
    let companyDetails = parsedObj.companyDetails;
    let leng = companyDetails.length;

    for (let i = 0; i < leng; i++) {
        document.getElementById('editBusinessScale').innerHTML =
            document.getElementById('editBusinessScale').innerHTML +
            '<option value="' +
            companyDetails[i]['id'] +
            '">' +
            companyDetails[i]['title'] +
            '</option>';
    }
    $('#editBusinessScale').selectpicker('refresh');
}

const $form = $('#upgradeToTradersForm');

btnUpgradeToTraders.addEventListener('click', (e) => {
    //stop submit the form, we will post it manually.
    e.preventDefault();

    let validation = upgradeToTradersClientSideValidation();
    console.log(validation);
    if (validation === 'true') {
        $.ajax({
            url: '/api/post/upgrade-to-traders',
            type: 'post',
            data: $form.serialize(),
        }).done((response) => {
            console.log(response);
            if (response.id) {
                // registrationUsersBusinessMedias(response.uuid);
                registrationUploadBusinessMedias(response.uuid);
                Swal.fire('Success', 'Upgrade Success.', 'success');
            }

            // if (response === 'success') {
            //     location.replace(host + '/profile');
            // }
        });
   }
});

function registrationUsersBusinessMedias(uuid) {
    // Get form
    let form = $('#upgradeToTradersForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/upload-users-business-medias2',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);

            if (data === 'success upload files') {
                location.replace(host + '/profile');
            }
        },
        error: function (e) {
            // some code here
        },
    });
}

// videoInput.addEventListener('change', videoInputFileName);
thumbnailInput.addEventListener('change', inputThumbnailFileName);
webinarsThumbnailInput.addEventListener('change', webinarsThumbnailFileName);
brochureInput.addEventListener('change', brochureFileName);

// function videoInputFileName() {
//     let fileName = videoInput.value;
//     videoName.innerHTML = fileName;
// }

function inputThumbnailFileName() {
    let fileName = thumbnailInput.value;
    thumbnailName.innerHTML = fileName;
    traderVideoThumbnailValidation.style.display = 'none';
}

function brochureFileName() {
    let fileName = brochureInput.value;
    brochureName.innerHTML = fileName;
    traderBrochureValidation.style.display = 'none';
}

function webinarsThumbnailFileName() {
    let fileName = webinarsThumbnailInput.value;
    webinarsThumbnailName.innerHTML = fileName;
    traderWebinarThumbnailValidation.style.display = 'none';
}

// document.getElementById('editRegionOfOperationDiv').style.display = 'none';
// document.getElementById('iOperateOnAGlobalRegionalLevelDiv').style.display = 'none';
// document.getElementById('countryOfOperationDiv').style.display = 'none';
// document.getElementById('iOperateOnANationalLevelDiv').style.display = 'none';
// document.getElementById('statesOfOperationDiv').style.display = 'none';
// document.getElementById('iOperateOnAProvincialLevelDiv').style.display = 'none';
// document.getElementById('cityOfOperationDiv').style.display = 'none';
// document.getElementById('editRegionOfOperationPlaceholder').style.display = 'none';

document.getElementById('iOperateOnAWorldWideLevelRadioButton').checked = false;
document.getElementById('iOperateOnAGlobalRegionalLevelRadioButton').checked = false;
document.getElementById('iOperateOnANationalLevelRadioButton').checked = true;
document.getElementById('iOperateOnAStateLevelRadioButton').checked = false;

document.getElementById('editRegionOfOperationValidation').innerHTML = '';
document.getElementById('countryOfOperationValidation').innerHTML = '';
document.getElementById('statesOfOperationValidation').innerHTML = '';
document.getElementById('cityOfOperationValidation').innerHTML = '';

document.getElementById('editRegionOfOperationInput').style.display = 'none';
document.getElementById('editRegionOfOperationPlaceholder').style.display = 'block';
document.getElementById('countryOfOperationInput').style.display = 'block';
document.getElementById('countryOfOperationPlaceholder').style.display = 'none';
document.getElementById('statesOfOperationInput').style.display = 'none';
document.getElementById('statesOfOperationPlaceholder').style.display = 'block';
document.getElementById('cityOfOperationInput').style.display = 'none';
document.getElementById('cityOfOperationPlaceholder').style.display = 'block';

document.getElementById('iOperateOnAWorldWideLevelRadioButton').addEventListener('change', iOperateOnAWorldWideLevelFunction);
function iOperateOnAWorldWideLevelFunction() {
    const cb = document.querySelector('#iOperateOnAWorldWideLevelRadioButton');
    if (cb.checked) {
        //document.getElementById('iOperateOnAWorldWideLevelRadioButton').checked = false;
        document.getElementById('iOperateOnAGlobalRegionalLevelRadioButton').checked = false;
        document.getElementById('iOperateOnANationalLevelRadioButton').checked = false;
        document.getElementById('iOperateOnAStateLevelRadioButton').checked = false;

        document.getElementById('editRegionOfOperationValidation').innerHTML = '';
        document.getElementById('countryOfOperationValidation').innerHTML = '';
        document.getElementById('statesOfOperationValidation').innerHTML = '';
        document.getElementById('cityOfOperationValidation').innerHTML = '';

        document.getElementById('editRegionOfOperationInput').style.display = 'none';
        document.getElementById('editRegionOfOperationPlaceholder').style.display = 'block';
        document.getElementById('countryOfOperationInput').style.display = 'none';
        document.getElementById('countryOfOperationPlaceholder').style.display = 'block';
        document.getElementById('statesOfOperationInput').style.display = 'none';
        document.getElementById('statesOfOperationPlaceholder').style.display = 'block';
        document.getElementById('cityOfOperationInput').style.display = 'none';
        document.getElementById('cityOfOperationPlaceholder').style.display = 'block';

        // document.getElementById('editRegionOfOperationDiv').style.display = 'none';
        // document.getElementById('iOperateOnAGlobalRegionalLevelDiv').style.display = 'none';
        // document.getElementById('countryOfOperationDiv').style.display = 'none';
        // document.getElementById('iOperateOnANationalLevelDiv').style.display = 'none';
        // document.getElementById('statesOfOperationDiv').style.display = 'none';
        // document.getElementById('iOperateOnAProvincialLevelDiv').style.display = 'none';
        // document.getElementById('cityOfOperationDiv').style.display = 'none';
        //document.getElementById('iOperateOnAWorldWideLevelRadioButton').checked = false;
    } else {
        //document.getElementById('iOperateOnAWorldWideLevelRadioButton').checked = false;
        document.getElementById('iOperateOnAGlobalRegionalLevelRadioButton').checked = false;
        document.getElementById('iOperateOnANationalLevelRadioButton').checked = false;
        document.getElementById('iOperateOnAStateLevelRadioButton').checked = false;


        // document.getElementById('editRegionOfOperationDiv').style.display = 'block';
        // document.getElementById('editRegionOfOperation').disabled = false;
        // document.getElementById('iOperateOnAGlobalRegionalLevelDiv').style.display = 'block';
    }
}


document.getElementById('iOperateOnAGlobalRegionalLevelRadioButton').addEventListener('change', iOperateOnAGlobalRegionalLevelFunction);
function iOperateOnAGlobalRegionalLevelFunction() {
    const cb = document.querySelector('#iOperateOnAGlobalRegionalLevelRadioButton');
    if (cb.checked) {
        document.getElementById('editRegionOfOperationValidation').innerHTML = 'Region of Operation is required';
        
        document.getElementById('iOperateOnAWorldWideLevelRadioButton').checked = false;
        // document.getElementById('iOperateOnAGlobalRegionalLevelRadioButton').checked = false;
        document.getElementById('iOperateOnANationalLevelRadioButton').checked = false;
        document.getElementById('iOperateOnAStateLevelRadioButton').checked = false;
 
        // document.getElementById('editRegionOfOperationDiv').style.display = 'block';
        // document.getElementById('editRegionOfOperation').disabled = false;
        document.getElementById('iOperateOnAGlobalRegionalLevelDiv').style.display = 'block';
        document.getElementById('editRegionOfOperationInput').style.display = 'block';
        document.getElementById('editRegionOfOperationPlaceholder').style.display = 'none';
        
        // document.getElementById('editRegionOfOperationDiv').style.display = 'none';
        // document.getElementById('editRegionOfOperation').disabled = true;
        //document.getElementById('iOperateOnAGlobalRegionalLevelDiv').style.display = 'none';
        //document.getElementById('editRegionOfOperationPlaceholder').style.display = 'block';

        // document.getElementById('countryOfOperationDiv').style.display = 'none';
        // document.getElementById('iOperateOnANationalLevelDiv').style.display = 'none';
        // document.getElementById('statesOfOperationDiv').style.display = 'none';
        // document.getElementById('iOperateOnAProvincialLevelDiv').style.display = 'none';
        // document.getElementById('cityOfOperationDiv').style.display = 'none';
        document.getElementById('editRegionOfOperationValidation').innerHTML = '';
        document.getElementById('countryOfOperationValidation').innerHTML = '';
        document.getElementById('statesOfOperationValidation').innerHTML = '';
        document.getElementById('cityOfOperationValidation').innerHTML = '';

        document.getElementById('editRegionOfOperationInput').style.display = 'block';
        document.getElementById('editRegionOfOperationPlaceholder').style.display = 'none';
        document.getElementById('countryOfOperationInput').style.display = 'none';
        document.getElementById('countryOfOperationPlaceholder').style.display = 'block';
        document.getElementById('statesOfOperationInput').style.display = 'none';
        document.getElementById('statesOfOperationPlaceholder').style.display = 'block';
        document.getElementById('cityOfOperationInput').style.display = 'none';
        document.getElementById('cityOfOperationPlaceholder').style.display = 'block';
    } else {
        document.getElementById('editRegionOfOperationValidation').innerHTML = '';

        document.getElementById('iOperateOnAWorldWideLevelRadioButton').checked = false;
        //document.getElementById('iOperateOnAGlobalRegionalLevelRadioButton').checked = false;
        document.getElementById('iOperateOnANationalLevelRadioButton').checked = false;
        document.getElementById('iOperateOnAStateLevelRadioButton').checked = false;
      

        // document.getElementById('editRegionOfOperationDiv').style.display = 'block';
        // document.getElementById('editRegionOfOperation').disabled = true;
        document.getElementById('editRegionOfOperationPlaceholder').style.display = 'block';
        document.getElementById('editRegionOfOperationInput').style.display = 'none';
        
        // document.getElementById('iOperateOnAGlobalRegionalLevelDiv').style.display = 'block';
        // document.getElementById('countryOfOperationDiv').style.display = 'block';
        // document.getElementById('iOperateOnANationalLevelDiv').style.display = 'block';
        // document.getElementById('statesOfOperationDiv').style.display = 'block';
        // document.getElementById('iOperateOnAProvincialLevelDiv').style.display = 'block';
        // document.getElementById('cityOfOperationDiv').style.display = 'block';
    }
}


document.getElementById('iOperateOnANationalLevelRadioButton').addEventListener('change', iOperateOnANationalLevelFunction);
function iOperateOnANationalLevelFunction() {
    const cb = document.querySelector('#iOperateOnANationalLevelRadioButton');
    if (cb.checked) {
        document.getElementById('iOperateOnAWorldWideLevelRadioButton').checked = false;
        document.getElementById('iOperateOnAGlobalRegionalLevelRadioButton').checked = false;
        //document.getElementById('iOperateOnANationalLevelRadioButton').checked = false;
        document.getElementById('iOperateOnAStateLevelRadioButton').checked = false;

        // document.getElementById('countryOfOperationDiv').style.display = 'none';
        // document.getElementById('iOperateOnANationalLevelDiv').style.display = 'none';
        // document.getElementById('statesOfOperationDiv').style.display = 'none';
        // document.getElementById('iOperateOnAProvincialLevelDiv').style.display = 'none';
        // document.getElementById('cityOfOperationDiv').style.display = 'none';

        document.getElementById('editRegionOfOperationValidation').innerHTML = '';
        document.getElementById('countryOfOperationValidation').innerHTML = '';
        document.getElementById('statesOfOperationValidation').innerHTML = '';
        document.getElementById('cityOfOperationValidation').innerHTML = '';

        document.getElementById('editRegionOfOperationInput').style.display = 'none';
        document.getElementById('editRegionOfOperationPlaceholder').style.display = 'block';
        document.getElementById('countryOfOperationInput').style.display = 'block';
        document.getElementById('countryOfOperationPlaceholder').style.display = 'none';
        document.getElementById('statesOfOperationInput').style.display = 'none';
        document.getElementById('statesOfOperationPlaceholder').style.display = 'block';
        document.getElementById('cityOfOperationInput').style.display = 'none';
        document.getElementById('cityOfOperationPlaceholder').style.display = 'block';
        
    } else {
        //getBusinessLocationCodeRefresh();
       document.getElementById('iOperateOnAWorldWideLevelRadioButton').checked = false;
       document.getElementById('iOperateOnAGlobalRegionalLevelRadioButton').checked = false;
       //document.getElementById('iOperateOnANationalLevelRadioButton').checked = false;
       document.getElementById('iOperateOnAStateLevelRadioButton').checked = false;


       // document.getElementById('countryOfOperationDiv').style.display = 'block';
       // document.getElementById('iOperateOnANationalLevelDiv').style.display = 'block';
       // document.getElementById('statesOfOperationDiv').style.display = 'block';
       // document.getElementById('iOperateOnAProvincialLevelDiv').style.display = 'block';
       //document.getElementById('cityOfOperationDiv').style.display = 'block';
       document.getElementById('editRegionOfOperationInput').style.display = 'none';
        document.getElementById('editRegionOfOperationPlaceholder').style.display = 'block';
        document.getElementById('countryOfOperationInput').style.display = 'block';
        document.getElementById('countryOfOperationPlaceholder').style.display = 'none';
        document.getElementById('statesOfOperationInput').style.display = 'block';
        document.getElementById('statesOfOperationPlaceholder').style.display = 'none';
        document.getElementById('cityOfOperationInput').style.display = 'block';
        document.getElementById('cityOfOperationPlaceholder').style.display = 'none';
    }
}


document.getElementById('iOperateOnAStateLevelRadioButton').addEventListener('change', iOperateOnAStateLevelFunction);
function iOperateOnAStateLevelFunction() {
    const cb = document.querySelector('#iOperateOnAStateLevelRadioButton');
    if (cb.checked) {
        document.getElementById('iOperateOnAWorldWideLevelRadioButton').checked = false;
        document.getElementById('iOperateOnAGlobalRegionalLevelRadioButton').checked = false;
        document.getElementById('iOperateOnANationalLevelRadioButton').checked = false;

        // document.getElementById('countryOfOperationDiv').style.display = 'none';
        // document.getElementById('iOperateOnANationalLevelDiv').style.display = 'none';
        // document.getElementById('statesOfOperationDiv').style.display = 'none';
        // document.getElementById('iOperateOnAProvincialLevelDiv').style.display = 'none';
        // document.getElementById('cityOfOperationDiv').style.display = 'none';

        //document.getElementById('iOperateOnAStateLevelRadioButton').checked = false;

        document.getElementById('editRegionOfOperationValidation').innerHTML = '';
        document.getElementById('countryOfOperationValidation').innerHTML = '';
        document.getElementById('statesOfOperationValidation').innerHTML = '';
        document.getElementById('cityOfOperationValidation').innerHTML = '';

        document.getElementById('editRegionOfOperationInput').style.display = 'none';
        document.getElementById('editRegionOfOperationPlaceholder').style.display = 'block';
        document.getElementById('countryOfOperationInput').style.display = 'block';
        document.getElementById('countryOfOperationPlaceholder').style.display = 'none';
        document.getElementById('statesOfOperationInput').style.display = 'block';
        document.getElementById('statesOfOperationPlaceholder').style.display = 'none';
        document.getElementById('cityOfOperationInput').style.display = 'none';
        document.getElementById('cityOfOperationPlaceholder').style.display = 'block';
    } else {
        document.getElementById('cityOfOperationInput').style.display = 'block';
        document.getElementById('cityOfOperationPlaceholder').style.display = 'none';
        // document.getElementById('countryOfOperationDiv').style.display = 'block';
        // document.getElementById('iOperateOnANationalLevelDiv').style.display = 'block';
        // document.getElementById('statesOfOperationDiv').style.display = 'block';
        // document.getElementById('iOperateOnAProvincialLevelDiv').style.display = 'block';
        // document.getElementById('cityOfOperationDiv').style.display = 'block';
    }
}

function backProfile() {
    location.replace(host + '/profile');
}
