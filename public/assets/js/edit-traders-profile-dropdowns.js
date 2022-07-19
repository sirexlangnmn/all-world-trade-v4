let btnAddKeyword;
let inputAddKeyword;
let textAreaAddKeywords;

let editTradeCategory;
let traderSubCategoryToggleField1;
let traderSubCategoryToggleField2;

btnAddKeyword = getId('btnAddKeyword');
inputAddKeyword = getId('inputAddKeyword');
textAreaAddKeywords = getId('textAreaAddKeywords');

editTradeCategory = getId('editTradeCategory');
traderSubCategoryToggleField1 = getId('traderSubCategoryToggleField1');
traderSubCategoryToggleField2 = getId('traderSubCategoryToggleField2');

$(function () {
    getUserBusinessCharacteristics();
});

let editLanguagesOfCommunication;
editLanguagesOfCommunication = getId('editLanguagesOfCommunication');

function business_language_of_communication(languages) {
    // consume api to get all languages
    async function getLanguages() {
        let response = await fetch(host + '/api/get/languages');
        let data = await response.json();
        return data;
    }

    // display all languages in frontend select option
    getLanguages().then((data) => {
        let arr = languages.split(',');

        editLanguagesOfCommunication.innerHTML = '';

        for (var i = 0; i < data.length; i++) {
            for (var x = 0; x < arr.length; x++) {
                if (arr[x] == data[i]['code']) {
                    editLanguagesOfCommunication.innerHTML =
                        editLanguagesOfCommunication.innerHTML +
                        '<option value="' +
                        data[i]['code'] +
                        '" selected>' +
                        data[i]['name'] +
                        '</option>';
                }
            }

            if (i < data.length) {
                $('#editLanguagesOfCommunication').selectpicker('refresh');
            }
        }

        for (var i = 0; i < data.length; i++) {
            editLanguagesOfCommunication.innerHTML +=
                '<option value="' + data[i]['code'] + '">' + data[i]['name'] + '</option>';
            if (i < data.length) {
                $('#editLanguagesOfCommunication').selectpicker('refresh');
            }
        }
    });
}

function getUserBusinessCharacteristics() {
    $.ajax({
        url: '/api/get/user-business-characteristics',
        type: 'POST',
        success: function (value) {
            console.log('getUserBusinessCharacteristics', value);
            getTradeCategoriesFunction(value);
            getSubCategoriesByTradeCategoryIdFunction(value);
            getMinorSubCategoryOptions(value);
            getUsersBusinessScale(value);
            document.getElementById('textAreaCurrentKeywords').value = value[0].business_industry_belong_to;
        },
    });
}

function getTradeCategoriesFunction(value) {
    async function getTradeCategories() {
        let response = await fetch(host + '/api/get/categories');
        let data = await response.json();
        return data;
    }

    getTradeCategories().then((data) => {
        let code = value[0].business_major_category;
        let filtered = data.filter((d) => d.id == code);

        editTradeCategory.innerHTML = '<option value="' + filtered[0].id + '">' + filtered[0].title + '</option>';
        for (var i = 0; i < data.length; i++) {
            editTradeCategory.innerHTML =
                editTradeCategory.innerHTML + '<option value="' + data[i]['id'] + '">' + data[i]['title'] + '</option>';

            if (i < data.length) {
                $('#editTradeCategory').selectpicker('refresh');
            }
        }
    });
}

function getSubCategoriesByTradeCategoryIdFunction(value) {
    async function getSubCategoriesByTradeCategoryId() {
        let tradeCategoryId = value[0].business_major_category;
        let response = await fetch(host + '/api/get/sub-categories-by-trade-category-id/' + tradeCategoryId);
        let data = await response.json();
        return data;
    }

    getSubCategoriesByTradeCategoryId().then((data) => {
        $('#traderSubCategoryToggleField1').empty();
        traderSubCategoryToggleField1.disabled = false;

        // let code = value[0].business_sub_category;
        let subCategoryId = value[0].business_sub_category;
        let subCategoryString = value[0].business_sub_category_str;

        if (subCategoryId) {
            console.log('getSubCategoriesByTradeCategoryId subCategoryId', subCategoryId);
            let filtered = data.filter((d) => d.id == subCategoryId);

            traderSubCategoryToggleField1.innerHTML =
                '<option value="' + filtered[0].id + '">' + filtered[0].title + '</option>';
            for (var i = 0; i < data.length; i++) {
                traderSubCategoryToggleField1.innerHTML =
                    traderSubCategoryToggleField1.innerHTML +
                    '<option value="' +
                    data[i]['id'] +
                    '">' +
                    data[i]['title'] +
                    '</option>';
            }
            traderSubCategoryToggleField1.innerHTML =
                traderSubCategoryToggleField1.innerHTML +
                '<option value="customOption">Other (Type a custom value)</option><input type="text" class="shadow-none with-border" id="traderSubCategoryToggleField2" name="editSubCategory" style="display:none;" disabled="disabled" >';

            // $('#traderSubCategoryToggleField1').selectpicker('refresh');
        }

        if (subCategoryString) {
            console.log('getSubCategoriesByTradeCategoryId subCategoryString', subCategoryString);
            $('#traderSubCategoryToggleField1').hide();
            document.getElementById('traderSubCategoryToggleField2').style.display = 'block';
            document.getElementById('traderSubCategoryToggleField2').disabled = false;
            document.getElementById('traderSubCategoryToggleField2').value = subCategoryString;
        }
    });
}

editTradeCategory.addEventListener('change', function () {
    let tradeCategoryId = this.value;

    async function getSubCategoriesByTradeCategoryId() {
        let response = await fetch(host + '/api/get/sub-categories-by-trade-category-id/' + tradeCategoryId);
        let data = await response.json();
        return data;
    }

    getSubCategoriesByTradeCategoryId().then((data) => {
        traderSubCategoryToggleField1.disabled = false;

        traderSubCategoryToggleField1.innerHTML = '<option value=""> Select </option>';
        for (var i = 0; i < data.length; i++) {
            traderSubCategoryToggleField1.innerHTML =
                traderSubCategoryToggleField1.innerHTML +
                '<option value="' +
                data[i]['id'] +
                '">' +
                data[i]['title'] +
                '</option>';
        }
        traderSubCategoryToggleField1.innerHTML =
            traderSubCategoryToggleField1.innerHTML +
            '<option value="customOption">Other (Type a custom value)</option><input id="traderSubCategoryToggleField2" name="traderSubCategoryToggleField" style="display:none;" disabled="disabled" >';
    });
});

// display all minor sub categories under sub category in frontend select option
traderSubCategoryToggleField1.addEventListener('change', function () {
    let subCategoryId = this.value;

    if (this.options[this.selectedIndex].value == 'customOption') {
        toggleField(this, this.nextSibling);
        this.selectedIndex = '0';

        document.getElementById('minorSubCategory').value = '';
        document.getElementById('minorSubCategoryInput').value = '';
    }

    if (this.options[this.selectedIndex].value !== 'customOption' && subCategoryId !== 'customOption') {
        async function getMinorSubCategoriesByTradeCategoryId() {
            let response = await fetch(host + '/api/get/minor-sub-categories-by-sub-category-id/' + subCategoryId);
            let data = await response.json();
            return data;
        }

        getMinorSubCategoriesByTradeCategoryId().then((data) => {
            if (data.length > 0) {
                $('#minorSubCategories').empty();
                for (var i = 0; i < data.length; i++) {
                    let option = document.createElement('option');
                    option.value = data[i]['title'];
                    document.getElementById('minorSubCategories').appendChild(option);
                }
            }
        });
    }
});

traderSubCategoryToggleField2.addEventListener('blur', function () {
    if (this.value == '') {
        toggleField(this, this.previousSibling);
    }
});

function toggleField(hideObj, showObj) {
    hideObj.disabled = true;
    hideObj.style.display = 'none';
    showObj.disabled = false;
    showObj.style.display = 'inline';
    showObj.focus();
}

btnAddKeyword.addEventListener('click', addKeyword);
const keywordData = [];
function addKeyword() {
    let add = inputAddKeyword.value;
    keywordData.push(add);
    textAreaAddKeywords.value = keywordData;
}
