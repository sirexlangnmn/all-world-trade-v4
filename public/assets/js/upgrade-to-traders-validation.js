
document.getElementById('traderCompanyName').onkeyup = function () {
    required('traderCompanyName', 'traderCompanyNameValidation', 'Company Name is required');
};
document.getElementById('tagline').onkeyup = function () {
    required('tagline', 'taglineValidation', 'Tagline is required');
};
document.getElementById('businessAddress').onkeyup = function () {
    required('businessAddress', 'businessAddressValidation', 'Business Address is required');
};
document.getElementById('website').onkeyup = function () {
    required('website', 'websiteValidation', 'Business Website is required');
};
document.getElementById('businessEmailAddress').onkeyup = function () {
    required('businessEmailAddress', 'businessEmailAddressValidation', 'Business Email Address is required');
};
document.getElementById('businessContactNumber').onkeyup = function () {
    required('businessContactNumber', 'businessContactNumberValidation', 'Business Contact Number is required');
};
document.getElementById('businessSocialMediaContactNumber').onkeyup = function () {
    required('businessSocialMediaContactNumber', 'businessSocialMediaContactNumberValidation', 'Business Social Media Contact Number is required');
};
document.getElementById('businessSocialMediaContactType').onchange = function () {
    required('businessSocialMediaContactType', 'businessSocialMediaContactTypeValidation', 'Social Media / Messaging App is required');
};
// document.getElementById('startOperatingHour').onchange = function () {
//     required('startOperatingHour', 'startOperatingHourValidationValidation', 'Start of Operating Hour is required');
// };
// document.getElementById('endOperatingHour').onchange = function () {
//     required('endOperatingHour', 'endOperatingHourValidation', 'End of Operating Hour is required');
// };

document.getElementById('editBusinessCountryLocation').onchange = function () {
    required('editBusinessCountryLocation', 'editBusinessCountryLocationValidation', 'Business Country Location is required');
    
    setInterval(function () {
        required('editBusinessStatesLocation', 'editBusinessStatesLocationValidation', 'Business States Location is required');
        required('editBusinessCityLocation', 'editBusinessCityLocationValidation', 'Business City Location is required');   
    }, 1000);

};
document.getElementById('editBusinessStatesLocation').onchange = function () {
    required('editBusinessStatesLocation', 'editBusinessStatesLocationValidation', 'Business States Location is required');
};

// document.getElementById('editRegionOfOperation').onchange = function () {
//     required('editRegionOfOperation', 'editRegionOfOperationValidation', 'Region of Operation is required');
// };
document.getElementById('countryOfOperation').onchange = function () {
    required('countryOfOperation', 'countryOfOperationValidation', 'Country of Operation is required');
};
document.getElementById('statesOfOperation').onchange = function () {
    required('statesOfOperation', 'statesOfOperationValidation', 'State / Province of Operation is required');
};
document.getElementById('cityOfOperation').onchange = function () {
    required('cityOfOperation', 'cityOfOperationValidation', 'City of Operation is required');
};

// document.getElementById('personalSocialMediaContactNumber').onkeyup = function () {
//     required('personalSocialMediaContactNumber', 'personalSocialMediaContactNumberValidation', 'Optional but recommended');
// };
// document.getElementById('personalSocialMediaContactType').onchange = function () {
//     required('personalSocialMediaContactType', 'personalSocialMediaContactTypeValidation', 'Optional but recommended');
// };
document.getElementById('editTradeCategory').onchange = function () {
    required('editTradeCategory', 'editTradeCategoryValidation', 'Trade Category is required');
};
document.getElementById('traderSubCategoryToggleField1').onchange = function () {
    required('traderSubCategoryToggleField1', 'traderSubCategoryValidation', 'Trade Sub Category is required');
};
document.getElementById('traderSubCategoryToggleField2').onkeyup = function () {
    required('traderSubCategoryToggleField2', 'traderSubCategoryValidation', 'Trade Sub Category is required');
};
document.getElementById('traderMinorSubCategoryToggleField1').onchange = function () {
    required('traderMinorSubCategoryToggleField1', 'traderMinorSubCategoryValidation', 'Minor Sub Category is required');
};
document.getElementById('traderMinorSubCategoryToggleField2').onkeyup = function () {
    required('traderMinorSubCategoryToggleField2', 'traderMinorSubCategoryValidation', 'Minor Sub Category is required');
};
document.getElementById('editBusinessScale').onchange = function () {
    required('editBusinessScale', 'editBusinessScaleValidation', 'Business Scale is required');
};

function required(elementIdInput, elementIdValidation, message) {
    if (document.getElementById(elementIdInput).value.length == 0) {
        document.getElementById(elementIdValidation).style.display = 'block';
        document.getElementById(elementIdValidation).innerHTML = message;
    } else {
        document.getElementById(elementIdValidation).style.display = 'none';
        document.getElementById(elementIdValidation).innerHTML = '';
    }
}

function upgradeToTradersClientSideValidation() {
    let output = 'true';
   
    if (document.getElementById('traderCompanyName').value.length == 0) {
        output = 'empty_companyName';
        document.getElementById('traderCompanyNameValidation').innerHTML = 'Company Name is required';
    }
    if (document.getElementById('tagline').value.length == 0) {
        output = 'empty_tagline';
        document.getElementById('taglineValidation').innerHTML = 'Tagline is required';
    }
    if (document.getElementById('businessAddress').value.length == 0) {
        output = 'empty_businessAddress';
        document.getElementById('businessAddressValidation').innerHTML = 'Business Address is required';
    }
    if (document.getElementById('website').value.length == 0) {
        output = 'empty_website';
        document.getElementById('websiteValidation').innerHTML = 'Business Website is required';
    }
    if (document.getElementById('businessEmailAddress').value.length == 0) {
        output = 'empty_businessEmailAddress';
        document.getElementById('businessEmailAddressValidation').innerHTML = 'Business Email Address is required';
    }
    if (document.getElementById('businessContactNumber').value.length == 0) {
        output = 'empty_businessContactNumber';
        document.getElementById('businessContactNumberValidation').innerHTML = 'Business Contact Number is required';
    }
    if (document.getElementById('businessSocialMediaContactNumber').value.length == 0) {
        output = 'empty_businessSocialMediaContactNumber';
        document.getElementById('businessSocialMediaContactNumberValidation').innerHTML = 'Business Social Media Contact Number is required';
    }
    if (document.getElementById('businessSocialMediaContactType').value.length == 0) {
        output = 'empty_businessSocialMediaContactType';
        document.getElementById('businessSocialMediaContactTypeValidation').innerHTML = 'Social Media / Messaging App is required';
    }

    // if (document.getElementById('startOperatingHour').value.length == 0) {
    //     output = 'empty_startOperatingHoure';
    //     document.getElementById('startOperatingHourValidation').innerHTML = 'Start of Operating Hour is required';
    // }
    // if (document.getElementById('endOperatingHour').value.length == 0) {
    //     output = 'empty_endOperatingHour';
    //     document.getElementById('endOperatingHourValidation').innerHTML = 'End of Operating Hour is required';
    // }


    if (document.getElementById('editBusinessCountryLocation').value.length == 0) {
        output = 'empty_editBusinessCountryLocation';
        document.getElementById('editBusinessCountryLocationValidation').innerHTML = 'Business Country Location is required';
    }
    if (document.getElementById('editBusinessStatesLocation').value.length == 0) {
        output = 'empty_editBusinessStatesLocation';
        document.getElementById('editBusinessStatesLocationValidation').innerHTML = 'Business States Location is required';
    }
    if (document.getElementById('editBusinessCityLocation').value.length == 0) {
        output = 'empty_editBusinessCityLocation';
        document.getElementById('editBusinessCityLocationValidation').innerHTML = 'Business City Location is required';
    }

    // if (document.getElementById('editRegionOfOperation').value.length == 0) {
    //     output = 'empty_editRegionOfOperationValidation';
    //     document.getElementById('editRegionOfOperationValidation').innerHTML = 'Region of Operation is required';
    // }
    if (document.getElementById('countryOfOperation').value.length == 0) {
        output = 'empty_countryOfOperation';
        document.getElementById('countryOfOperationValidation').innerHTML = 'Country of Operation is required';
    }
    if (document.getElementById('statesOfOperation').value.length == 0) {
        output = 'empty_statesOfOperation';
        document.getElementById('statesOfOperationValidation').innerHTML = 'State / Province of Operation is required';
    }
    if (document.getElementById('cityOfOperation').value.length == 0) {
        output = 'empty_cityOfOperation';
        document.getElementById('cityOfOperationValidation').innerHTML = 'City of Operation is required';
    }
//     if (document.getElementById('personalSocialMediaContactType').value.length == 0) {
//         output = 'empty_personalSocialMediaContactType';
//         document.getElementById('personalSocialMediaContactTypeValidation').innerHTML = 'Optional but recommended';
//     }
//     if (document.getElementById('personalSocialMediaContactNumber').value.length == 0) {
//         output = 'empty_personalSocialMediaContactNumber';
//         document.getElementById('personalSocialMediaContactNumberValidation').innerHTML = 'Company Name is required';
//     }
    if (document.getElementById('editTradeCategory').value.length == 0) {
        output = 'empty_editTradeCategory';
        document.getElementById('editTradeCategoryValidation').innerHTML = 'Trade Category is required';
    }
    if (document.getElementById('traderSubCategoryToggleField1').value.length == 0 && document.getElementById('traderSubCategoryToggleField2').value.length == 0) {
        output = 'empty_traderSubCategoryToggleField1';
        document.getElementById('traderSubCategoryValidation').innerHTML = 'Trade Sub Category is required';
    }
    if (document.getElementById('traderMinorSubCategoryToggleField1').value.length == 0 && document.getElementById('traderMinorSubCategoryToggleField2').value.length == 0) {
        output = 'empty_traderMinorSubCategoryToggleField';
        document.getElementById('traderMinorSubCategoryValidation').innerHTML = 'Minor Sub Category is required';
    }

    if (document.getElementById('editBusinessScale').value.length == 0) {
        output = 'empty_editBusinessScale';
        document.getElementById('editBusinessScaleValidation').innerHTML = 'Business Scale is required';
    }

    let isWantToUploadVideo = document.getElementById('inputWantToUploadCompanyVideo').value;
    let isWantToUploadBrochure = document.getElementById('inputWantToUploadCompanyBrochure').value;
    let isWantToUploadCompanyWebinar = document.getElementById('inputWantToUploadCompanyWebinar').value;
   
    if (isWantToUploadVideo == 1) {
        if (document.getElementById('thumbnailInput').files.length == 0) {
            output = 'empty video thumbnail';
             document.getElementById('traderVideoThumbnailValidation').style.display = 'block';
             document.getElementById('traderVideoThumbnailValidation').innerHTML = 'Please upload video thumbnail.';
        }
        if ( document.getElementById('videoLink').value.length == 0) {
            output = 'empty Video title';
             document.getElementById('videoLinkValidation').innerHTML = 'Video link required';
        }
        if ( document.getElementById('videoTitle').value.length == 0) {
            output = 'empty Video title';
             document.getElementById('videoTitleValidation').innerHTML = 'Video title required';
        }
        if ( document.getElementById('videoDescription').value.length == 0) {
            output = 'empty Video description';
             document.getElementById('videoDescriptionValidation').innerHTML = 'Video description required';
        }
    } else {
         document.getElementById('traderVideoThumbnailValidation').innerHTML = '';
         document.getElementById('videoLinkValidation').innerHTML = '';
         document.getElementById('videoTitleValidation').innerHTML = '';
         document.getElementById('videoDescriptionValidation').innerHTML = '';
    }

    if ( isWantToUploadBrochure == 1) {
        if ( document.getElementById('brochureInput').files.length == 0) {
            output = 'empty brochure';
             document.getElementById('traderBrochureValidation').style.display = 'block';
             document.getElementById('traderBrochureValidation').innerHTML = 'Please upload brochure related to your company.';
        }
        if ( document.getElementById('brochureTitle').value.length == 0) {
            output = 'empty Brouchure title';
             document.getElementById('brochureTitleValidation').innerHTML = 'Brouchure title required';
        }
    } else {
        document.getElementById('traderBrochureValidation').innerHTML = '';
        document.getElementById('brochureTitleValidation').innerHTML = '';
    }

    if ( isWantToUploadCompanyWebinar == 1) {
        if ( document.getElementById('webinarsThumbnailInput').files.length == 0) {
            output = 'empty webinars thumbnail';
             document.getElementById('traderWebinarThumbnailValidation').style.display = 'block';
             document.getElementById('traderWebinarThumbnailValidation').innerHTML = 'Please upload thumbnail image related to your webinars.';
        }
        if ( document.getElementById('webinarsTitle').value.length == 0) {
            output = 'empty Webinars title';
             document.getElementById('webinarsTitleValidation').innerHTML = 'Webinars title required';
        }
        if ( document.getElementById('webinarsDescription').value.length == 0) {
            output = 'empty Webinars description';
             document.getElementById('webinarsDescriptionValidation').innerHTML = 'Webinars description required';
        }
        if ( document.getElementById('webinarsLink').value.length == 0) {
            output = 'empty Webinars link';
             document.getElementById('webinarsLinkValidation').innerHTML = 'Webinars link required';
        }
        if ( document.getElementById('webinarsSchedule').value.length == 0) {
            output = 'empty Webinars schedules';
             document.getElementById('webinarsScheduleValidation').innerHTML = 'Webinars schedules required';
        }
    } else {
        document.getElementById('traderWebinarThumbnailValidation').innerHTML = '';
        document.getElementById('webinarsTitleValidation').innerHTML = '';
        document.getElementById('webinarsDescriptionValidation').innerHTML = '';
        document.getElementById('webinarsLinkValidation').innerHTML = '';
        document.getElementById('webinarsScheduleValidation').innerHTML = '';
    }



    return output;
}