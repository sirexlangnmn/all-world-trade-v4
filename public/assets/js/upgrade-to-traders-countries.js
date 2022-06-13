$(function () {
    getUsersAddress();
    getBusinessLocationCode();
});

let editBusinessCountryLocation;
let editBusinessStatesLocation;
let editBusinessCityLocation;
let editRegionOfOperation;

let countryOfOperation;
let statesOfOperation;
let cityOfOperation;

editBusinessCountryLocation = getId('editBusinessCountryLocation');
editBusinessStatesLocation = getId('editBusinessStatesLocation');
editBusinessCityLocation = getId('editBusinessCityLocation');
editRegionOfOperation = getId('editRegionOfOperation');

countryOfOperation = getId('countryOfOperation');
statesOfOperation = getId('statesOfOperation');
cityOfOperation = getId('cityOfOperation');

function getBusinessLocationCode() {
    $.ajax({
        url: '/api/get/business-location-code',
        type: 'POST',
        success: function (data) {
            getBusinessCountryLocation(data, 'editBusinessCountryLocation');
            getBusinessStatesLocation(data, 'editBusinessStatesLocation');
            getBusinessCityLocation(data, 'editBusinessCityLocation');

            getCountryOfOperation(data, 'countryOfOperation');
            getStatesOfOperation(data, 'statesOfOperation');
            getCityOfOperation(data, 'cityOfOperation');

            getRegionOfOperationFunction(data, 'editRegionOfOperation');

            if (data[0].business_country == null || data[0].business_country == '') {
                document.getElementById('editBusinessCountryLocationValidation').innerHTML =
                    'Business Country Location is required';
            }
            if (data[0].business_states == null || data[0].business_states == '') {
                document.getElementById('editBusinessStatesLocationValidation').innerHTML =
                    'Business States Location is required';
            }
            if (data[0].business_city == null || data[0].business_city == '') {
                document.getElementById('editBusinessCityLocationValidation').innerHTML =
                    'Business City Location is required';
            }

            // if (data[0].region_of_operation == null || data[0].region_of_operation == "") {
            //     document.getElementById('editRegionOfOperationValidation').innerHTML = 'Region of Operation is required';
            // }
            // if (data[0].country_of_operation == null || data[0].country_of_operation == "") {
            //     document.getElementById('countryOfOperationValidation').innerHTML = 'Country Of Operation is required';
            // }
            // if (data[0].states_of_operation == null || data[0].states_of_operation == "") {
            //     document.getElementById('statesOfOperationValidation').innerHTML = 'States Of Operation is required';
            // }
            // if (data[0].city_of_operation == null || data[0].city_of_operation == "") {
            //     document.getElementById('cityOfOperationValidation').innerHTML = 'City Of Operation is required';
            // }
        },
    });
}

editBusinessCountryLocation.addEventListener('change', function () {
    $('#editBusinessStatesLocation').empty();
    $('#editBusinessCityLocation').empty();

    let traderBusinessCountryCode = this.value;

    fetch('assets/json/states.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let filtered = data.filter((d) => d.country_code == traderBusinessCountryCode);

            if (filtered.length) {
                for (var i = 0; i < filtered.length; i++) {
                    editBusinessStatesLocation.innerHTML =
                        editBusinessStatesLocation.innerHTML +
                        '<option value="' +
                        filtered[i].id +
                        '">' +
                        filtered[i].name +
                        '</option>';
                }
            } else {
                let option = document.createElement('option');
                option.value = 'No States Found';
                option.innerHTML = 'No States Found';
                editBusinessStatesLocation.appendChild(option);
            }

            $('#editBusinessStatesLocation').selectpicker('refresh');
            // required(
            //     editBusinessStatesLocation,
            //     editBusinessStatesLocationValidation,
            //     'Business States Location is required',
            // );
        });

    fetch('assets/json/cities.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let state_id = editBusinessStatesLocation.value;
            let filtered = data.filter((d) => d.country_code == traderBusinessCountryCode);

            if (filtered.length) {
                for (var i = 0; i < filtered.length; i++) {
                    if (filtered[i].state_id == state_id) {
                        editBusinessCityLocation.innerHTML =
                            editBusinessCityLocation.innerHTML +
                            '<option value="' +
                            filtered[i].id +
                            '">' +
                            filtered[i].name +
                            '</option>';
                    }
                }
            } else {
                let option = document.createElement('option');
                option.value = 'No Cities Found';
                option.innerHTML = 'No Cities Found';
                editBusinessCityLocation.appendChild(option);
            }

            $('#editBusinessCityLocation').selectpicker('refresh');
        });
});

editBusinessStatesLocation.addEventListener('change', function () {
    $('#editBusinessCityLocation').empty();

    fetch('assets/json/cities.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let state_id = editBusinessStatesLocation.value;
            let traderResidenceCountryCode = editBusinessCountryLocation.value;
            let filtered = data.filter((d) => d.country_code == traderResidenceCountryCode);
            let filtered2 = filtered.filter((x) => x.state_id == state_id);

            if (filtered2.length) {
                for (var i = 0; i < filtered2.length; i++) {
                    editBusinessCityLocation.innerHTML =
                        editBusinessCityLocation.innerHTML +
                        '<option value="' +
                        filtered2[i].id +
                        '">' +
                        filtered2[i].name +
                        '</option>';
                }
            } else {
                let option = document.createElement('option');
                option.value = 'No Cities Found';
                option.innerHTML = 'No Cities Found';
                editBusinessCityLocation.appendChild(option);
            }

            $('#editBusinessCityLocation').selectpicker('refresh');
        });
});

countryOfOperation.addEventListener('change', function () {
    $('#statesOfOperation').empty();
    $('#cityOfOperation').empty();

    let traderBusinessCountryCode = this.value;

    fetch('assets/json/states.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let filtered = data.filter((d) => d.country_code == traderBusinessCountryCode);

            if (filtered.length) {
                statesOfOperation.innerHTML = '<option value="" >Select</option>';
                for (var i = 0; i < filtered.length; i++) {
                    statesOfOperation.innerHTML =
                        statesOfOperation.innerHTML +
                        '<option value="' +
                        filtered[i].id +
                        '">' +
                        filtered[i].name +
                        '</option>';
                }
            } else {
                let option = document.createElement('option');
                option.value = 'No States Found';
                option.innerHTML = 'No States Found';
                statesOfOperation.appendChild(option);

                document.getElementById('statesOfOperationValidation').innerHTML = '';
            }

            $('#statesOfOperation').selectpicker('refresh');
        });

    fetch('assets/json/cities.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            console.log(data);
            let state_id = statesOfOperation.value;
            let filtered = data.filter((d) => d.country_code == traderBusinessCountryCode);

            // console.log(data);
            // console.log(traderBusinessCountryCode);
            console.log(state_id);
            // console.log(filtered);

            if (filtered.length) {
                cityOfOperation.innerHTML = '<option value="" >Select</option>';
                for (var i = 0; i < filtered.length; i++) {
                    if (filtered[i].state_id == state_id) {
                        cityOfOperation.innerHTML =
                            cityOfOperation.innerHTML +
                            '<option value="' +
                            filtered[i].id +
                            '">' +
                            filtered[i].name +
                            '</option>';
                    }
                }
            } else {
                let option = document.createElement('option');
                option.value = 'No Cities Found';
                option.innerHTML = 'No Cities Found';
                cityOfOperation.appendChild(option);

                document.getElementById('cityOfOperationValidation').innerHTML = '';
            }

            $('#cityOfOperation').selectpicker('refresh');
        });

    //----------------------------------------------------------------
    //----------------------------------------------------------------
    var options = document.getElementById('countryOfOperation').options,
        count = 0;
    for (var i = 0; i < options.length; i++) {
        if (options[i].selected) count++;
    }

    const cb = document.querySelector('#iOperateOnANationalLevelRadioButton');
    if (cb.checked) {
        //----------------------------------------------------------------
    }

    if (count > 1) {
        // document.getElementById('iOperateOnANationalLevelDiv').style.display = 'none';
        //document.getElementById('iOperateOnAProvincialLevelDiv').style.display = 'none';

        // document.getElementById('statesOfOperationDiv').style.display = 'none';
        // document.getElementById('cityOfOperationDiv').style.display = 'none';
        document.getElementById('iOperateOnANationalLevelRadioButton').checked = true;
        document.getElementById('iOperateOnANationalLevelRadioButton').disabled = true;

        document.getElementById('statesOfOperationInput').style.display = 'none';
        document.getElementById('statesOfOperationPlaceholder').style.display = 'block';
        document.getElementById('cityOfOperationInput').style.display = 'none';
        document.getElementById('cityOfOperationPlaceholder').style.display = 'block';
    }
    if (count < 2) {
        //----------------------------------------------------------------
        document.getElementById('statesOfOperationDiv').style.display = 'block';
        document.getElementById('cityOfOperationDiv').style.display = 'block';
        document.getElementById('iOperateOnANationalLevelRadioButton').disabled = false;
        document.getElementById('statesOfOperationInput').style.display = 'block';
        document.getElementById('statesOfOperationPlaceholder').style.display = 'none';
        document.getElementById('cityOfOperationInput').style.display = 'block';
        document.getElementById('cityOfOperationPlaceholder').style.display = 'none';
    }
});

statesOfOperation.addEventListener('change', function () {
    $('#cityOfOperation').empty();

    fetch('assets/json/cities.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let state_id = statesOfOperation.value;
            let traderCountryOfOperationCode = countryOfOperation.value;
            let filtered = data.filter((d) => d.country_code == traderCountryOfOperationCode);
            let filtered2 = filtered.filter((x) => x.state_id == state_id);

            if (filtered2.length) {
                cityOfOperation.innerHTML = '<option value="" >Select</option>';
                for (var i = 0; i < filtered2.length; i++) {
                    cityOfOperation.innerHTML =
                        cityOfOperation.innerHTML +
                        '<option value="' +
                        filtered2[i].id +
                        '">' +
                        filtered2[i].name +
                        '</option>';
                }
            } else {
                let option = document.createElement('option');
                option.value = 'No Cities Found';
                option.innerHTML = 'No Cities Found';
                cityOfOperation.appendChild(option);
            }

            $('#cityOfOperation').selectpicker('refresh');
        });
});

function getUsersAddress() {
    $.ajax({
        url: '/api/get/users-address',
        type: 'POST',
        success: function (data) {
            document.getElementById('displayReprestativeAddress').innerHTML = data[0].address;
            getCityNameUsingCode(data[0].city, 'displayReprestativeAddressCity');
            getStatesNameUsingCode(data[0].state_or_province, 'displayReprestativeAddressStates');
            getCountryNameUsingCode(data[0].country, 'displayReprestativeAddressCountry');
        },
    });
}


function getCountryNameUsingCode(code, elementId) {
    if (code) {
        fetch('assets/json/countries.json')
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                let filtered = data.filter((d) => d.iso2 == code);
                document.getElementById(elementId).innerHTML = filtered[0].name;
            });
    } else {
        document.getElementById(elementId).innerHTML = 'N/A';
    }
}

function getStatesNameUsingCode(code, elementId) {
    if (code) {
        fetch('assets/json/states.json')
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                let filtered = data.filter((d) => d.id == code);
                document.getElementById(elementId).innerHTML = filtered[0].name;
            });
    } else {
        document.getElementById(elementId).innerHTML = 'N/A';
    }
}

function getCityNameUsingCode(code, elementId) {
    if (code) {
        fetch('assets/json/cities.json')
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                let filtered = data.filter((d) => d.id == code);
                document.getElementById(elementId).innerHTML = filtered[0].name + ', ';
            });
    } else {
        document.getElementById(elementId).innerHTML = 'N/A, ';
    }
}