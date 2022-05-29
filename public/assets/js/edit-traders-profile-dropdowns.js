
let btnAddKeyword;
let inputAddKeyword;
let textAreaAddKeywords;

let editTradeCategory;
let traderMinorSubCategoryToggleField1;
let traderMinorSubCategoryToggleField2;
let traderSubCategoryToggleField1;
let traderSubCategoryToggleField2;


btnAddKeyword = getId('btnAddKeyword');
inputAddKeyword = getId('inputAddKeyword');
textAreaAddKeywords = getId('textAreaAddKeywords');

editTradeCategory = getId('editTradeCategory');
traderMinorSubCategoryToggleField1 = getId('traderMinorSubCategoryToggleField1');
traderMinorSubCategoryToggleField2 = getId('traderMinorSubCategoryToggleField2');
traderSubCategoryToggleField1 = getId('traderSubCategoryToggleField1');
traderSubCategoryToggleField2 = getId('traderSubCategoryToggleField2');

$(function () {
    getUserBusinessCharacteristics();
});


let editLanguagesOfCommunication;
editLanguagesOfCommunication = getId('editLanguagesOfCommunication');

// consume api to get all languages
async function getLanguages() {
    let response = await fetch(host + '/api/get/languages');
    let data = await response.json();
    return data;
}

// display all languages in frontend select option
getLanguages().then((data) => {
    editLanguagesOfCommunication.innerHTML = '<option value="" disabled>Status Quo</option>';
    for (var i = 0; i < data.length; i++) {
        editLanguagesOfCommunication.innerHTML =
            editLanguagesOfCommunication.innerHTML +
            '<option value="' +
            data[i]['code'] +
            '">' +
            data[i]['name'] +
            '</option>';
    }
});

function getUserBusinessCharacteristics() {
    $.ajax({
        url: '/api/get/user-business-characteristics',
        type: 'POST',
        success: function (value) {
            getTradeCategoriesFunction(value);
            getSubCategoriesByTradeCategoryIdFunction(value);
            getMinorSubCategoriesByIdFunction(value);
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
        traderMinorSubCategoryToggleField1.disabled = true;
    
        let code =  value[0].business_major_category;
        let filtered = data.filter((d) => d.id == code);
    
        editTradeCategory.innerHTML = '<option value="' + filtered[0].id + '">' + filtered[0].title + '</option>';
        for (var i = 0; i < data.length; i++) {
            editTradeCategory.innerHTML =
                editTradeCategory.innerHTML + '<option value="' + data[i]['id'] + '">' + data[i]['title'] + '</option>';
        }
    });
}

function getSubCategoriesByTradeCategoryIdFunction(value) {
    async function getSubCategoriesByTradeCategoryId() {
        let tradeCategoryId =  value[0].business_major_category;
        let response = await fetch(host + '/api/get/sub-categories-by-trade-category-id/' + tradeCategoryId);
        let data = await response.json();
        return data;
    }
    
    getSubCategoriesByTradeCategoryId().then((data) => {
        traderSubCategoryToggleField1.disabled = false;
    
        let code = value[0].business_sub_category;
        let filtered = data.filter((d) => d.id == code);
    
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
            '<option value="customOption">Other (Type a custom value)</option><input id="traderSubCategoryToggleField2" name="editSubCategory" style="display:none;" disabled="disabled" >';
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

        traderSubCategoryToggleField1.innerHTML = '<option value=""> Any </option>';
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

function getMinorSubCategoriesByIdFunction(value) {
    async function getMinorSubCategoriesById() {
        let subCategoryId = value[0].business_sub_category;
        let response = await fetch(host + '/api/get/minor-sub-categories-by-sub-category-id/' + subCategoryId);
        let data = await response.json();
        return data;
    }
    
    getMinorSubCategoriesById().then((data) => {
        let minorSubCategoryId = value[0].business_minor_sub_category;
        let filtered = data.filter((d) => d.id == minorSubCategoryId);
        traderMinorSubCategoryToggleField1.innerHTML =
            '<option value="' + filtered[0].id + '" >' + filtered[0].title + '</option>';
    
        if (data.length === undefined) {
            $('#traderMinorSubCategoryToggleField1').empty();
            traderMinorSubCategoryToggleField1.style.display = 'none';
            traderMinorSubCategoryToggleField1.disabled = false;
    
            traderMinorSubCategoryToggleField2.style.display = 'block';
            traderMinorSubCategoryToggleField2.disabled = false;
            traderMinorSubCategoryToggleField2.style.display = 'inline';
            traderMinorSubCategoryToggleField2.focus();
        } else {
            traderMinorSubCategoryToggleField1.disabled = false;
    
            for (var i = 0; i < data.length; i++) {
                traderMinorSubCategoryToggleField1.innerHTML =
                    traderMinorSubCategoryToggleField1.innerHTML +
                    '<option value="' +
                    data[i]['id'] +
                    '">' +
                    data[i]['title'] +
                    '</option>';
            }
            traderMinorSubCategoryToggleField1.innerHTML =
                traderMinorSubCategoryToggleField1.innerHTML +
                '<option value="none">None</option><option value="customOption">Other (Type a custom value)</option><input id="traderMinorSubCategoryToggleField2" name="editMinorSubCategory" style="display:none;" disabled="disabled" >';
        }
    });
}

// display all minor sub categories under sub category in frontend select option
traderSubCategoryToggleField1.addEventListener('change', function () {
    traderMinorSubCategoryToggleField1.disabled = false;
    $('#traderMinorSubCategoryToggleField1').empty();
    let subCategoryId = this.value;

    if (this.options[this.selectedIndex].value == 'customOption') {
        toggleField(this, this.nextSibling);
        this.selectedIndex = '0';

        traderMinorSubCategoryToggleField1.style.display = 'none';
        traderMinorSubCategoryToggleField1.disabled = false;

        traderMinorSubCategoryToggleField2.style.display = 'block';
        traderMinorSubCategoryToggleField2.disabled = false;
    }

    if (this.options[this.selectedIndex].value !== 'customOption' && subCategoryId !== 'customOption') {
        async function getMinorSubCategoriesByTradeCategoryId() {
            let response = await fetch(host + '/api/get/minor-sub-categories-by-sub-category-id/' + subCategoryId);
            let data = await response.json();
            return data;
        }

        getMinorSubCategoriesByTradeCategoryId().then((data) => {
            console.log(data.length);
            if (data.length === undefined) {
                $('#traderMinorSubCategoryToggleField1').empty();
                traderMinorSubCategoryToggleField1.style.display = 'none';
                traderMinorSubCategoryToggleField1.disabled = false;

                traderMinorSubCategoryToggleField2.style.display = 'block';
                traderMinorSubCategoryToggleField2.disabled = false;
                traderMinorSubCategoryToggleField2.style.display = 'inline';
                traderMinorSubCategoryToggleField2.focus();
            } else {
                traderMinorSubCategoryToggleField1.disabled = false;

                for (var i = 0; i < data.length; i++) {
                    traderMinorSubCategoryToggleField1.innerHTML =
                        traderMinorSubCategoryToggleField1.innerHTML +
                        '<option value="' +
                        data[i]['id'] +
                        '">' +
                        data[i]['title'] +
                        '</option>';
                }
                traderMinorSubCategoryToggleField1.innerHTML =
                    traderMinorSubCategoryToggleField1.innerHTML +
                    '<option value="none">None</option><option value="customOption">Other (Type a custom value)</option><input id="traderMinorSubCategoryToggleField2" name="editMinorSubCategory" style="display:none;" disabled="disabled" >';
            }
        });
    }
});

traderSubCategoryToggleField2.addEventListener('blur', function () {
    if (this.value == '') {
        toggleField(this, this.previousSibling);

        traderMinorSubCategoryToggleField2.style.display = 'none';
        traderMinorSubCategoryToggleField2.disabled = false;
        traderMinorSubCategoryToggleField2.value = '';

        traderMinorSubCategoryToggleField1.style.display = 'block';
        traderMinorSubCategoryToggleField1.disabled = false;
    }
});

traderMinorSubCategoryToggleField1.addEventListener('change', function () {
    if (this.options[this.selectedIndex].value == 'customOption') {
        toggleField(this, this.nextSibling);
        this.selectedIndex = '0';
    }
});

traderMinorSubCategoryToggleField2.addEventListener('blur', function () {
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
