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
            getBusinessCountryLocation(data);
            getBusinessStatesLocation(data);
            getBusinessCityLocation(data);
            getCountryOfOperation(data);
            getStatesOfOperation(data);
            getCityOfOperation(data);
            getRegionOfOperationFunction(data);
        },
    });
}

function getBusinessCountryLocation(value) {
    fetch('assets/json/countries.json')
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        let code = value[0].business_country;
        let filtered = data.filter((d) => d.iso2 == code);

        editBusinessCountryLocation.innerHTML =
            '<option value="' + filtered[0].iso2 + '" >' + filtered[0].name + '</option>';

        for (var i = 0; i < data.length; i++) {
            editBusinessCountryLocation.innerHTML =
                editBusinessCountryLocation.innerHTML +
                '<option value="' +
                data[i].iso2 +
                '">' +
                data[i].name +
                '</option>';
        }
    });
}

function getBusinessStatesLocation(value) {
    fetch('assets/json/states.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let state_code = value[0].business_states;
            let countryCode = value[0].business_country;
    
            let filtered = data.filter((d) => d.id == state_code);
    
            editBusinessStatesLocation.innerHTML =
                '<option value="' + filtered[0].id + '" >' + filtered[0].name + '</option>';
    
            for (var i = 0; i < data.length; i++) {
                if (data[i].country_code === countryCode) {
                    let option = document.createElement('option');
                    option.value = data[i].id;
                    option.innerHTML = data[i].name;
                    editBusinessStatesLocation.appendChild(option);
                }
            }
        });

}

function getBusinessCityLocation(value) {
    fetch('assets/json/cities.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let state_code = value[0].business_states;
            let countryCode = value[0].business_country;
    
            let filtered = data.filter((d) => d.id == state_code);
    
            editBusinessCityLocation.innerHTML =
                '<option value="' + filtered[0].id + '" >' + filtered[0].name + '</option>';
    
            for (var i = 0; i < data.length; i++) {
                if (data[i].country_code === countryCode) {
                    let option = document.createElement('option');
                    option.value = data[i].id;
                    option.innerHTML = data[i].name;
                    editBusinessCityLocation.appendChild(option);
                }
            }
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


function getCountryOfOperation(value) {
    fetch('assets/json/countries.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let code = value[0].country_of_operation;
    
            if (code) {            
                let filtered = data.filter((d) => d.iso2 == code);
                countryOfOperation.innerHTML =
                    '<option value="' + filtered[0].iso2 + '" >' + filtered[0].name + '</option>';
    
                for (var i = 0; i < data.length; i++) {
                    countryOfOperation.innerHTML =
                        countryOfOperation.innerHTML + '<option value="' + data[i].iso2 + '">' + data[i].name + '</option>';
                }
            } else {
                countryOfOperation.innerHTML = '<option value="" >Select</option>';
    
                for (var i = 0; i < data.length; i++) {
                    countryOfOperation.innerHTML =
                        countryOfOperation.innerHTML + '<option value="' + data[i].iso2 + '">' + data[i].name + '</option>';
                }
            }
        });
}

countryOfOperation.addEventListener('change', function () {
    $('#statesOfOperation').empty();

    let traderBusinessCountryCode = this.value;

    fetch('assets/json/states.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let filtered = data.filter((d) => d.country_code == traderBusinessCountryCode);

            if (filtered.length) {
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
            }

            $('#statesOfOperation').selectpicker('refresh');
           
        });

    
});


function getStatesOfOperation(value) {
    fetch('assets/json/states.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let state_code = value[0].states_of_operation;
            let countryCode = value[0].country_of_operation;
    
            if (state_code) {
                let filtered = data.filter((d) => d.id == state_code);
                statesOfOperation.innerHTML = '<option value="' + filtered[0].id + '" >' + filtered[0].name + '</option>';
    
                for (var i = 0; i < data.length; i++) {
                    if (data[i].country_code === countryCode) {
                        let option = document.createElement('option');
                        option.value = data[i].id;
                        option.innerHTML = data[i].name;
                        statesOfOperation.appendChild(option);
                    }
                }
            } else {
                statesOfOperation.innerHTML = '<option value="" >Select</option>';
    
                for (var i = 0; i < data.length; i++) {
                    if (data[i].country_code === countryCode) {
                        let option = document.createElement('option');
                        option.value = data[i].id;
                        option.innerHTML = data[i].name;
                        statesOfOperation.appendChild(option);
                    }
                }
            }
        });

}

function getCityOfOperation(value) {
    fetch('assets/json/cities.json')
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        let state_code = value[0].states_of_operation;
        let countryCode = value[0].country_of_operation;

        if (state_code && countryCode) {
            let filtered = data.filter((d) => d.country_code == countryCode);
            let filtered2 = filtered.filter((x) => x.state_id == state_code);

            cityOfOperation.innerHTML = '<option value="" >Select</option>';
    
            for (var i = 0; i < filtered2.length; i++) {
                let option = document.createElement('option');
                option.value = filtered2[i].id;
                option.innerHTML = filtered2[i].name;
                cityOfOperation.appendChild(option);
            }
        }
    });

}


function getRegionOfOperationFunction(value) {
    // consume api to get all trade categories
    async function getRegionOfOperations() {
        let response = await fetch(host + '/api/get/region-of-operations');
        let data = await response.json();
        return data;
    }

    
    // display region of operations in frontend select option
    getRegionOfOperations().then((data) => {
        let regionOfOperationCode = value[0].region_of_operation;

        if (regionOfOperationCode) {
            let filtered = data.filter((d) => d.iso == regionOfOperationCode);
            editRegionOfOperation.innerHTML = '<option value="' + filtered[0].iso + '" >' + filtered[0].name + '</option>';
        } else {
            editRegionOfOperation.innerHTML = '<option value="" >Select</option>';
        }

        for (var i = 0; i < data.length; i++) {
            let option = document.createElement('option');
            option.value = data[i].iso;
            option.innerHTML = data[i].name;
            editRegionOfOperation.appendChild(option);
        }
    });

}


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
