// NOTE: if sub category choose manual typed inputAddKeyword. Empty the minor sub category

function getMinorSubCategoryOptions(value) {
    async function getMinorSubCategoriesById() {
        let subCategoryId = value[0].business_sub_category;

        if (subCategoryId) {
            let response = await fetch(host + '/api/get/minor-sub-categories-by-sub-category-id/' + subCategoryId);
            let data = await response.json();
            return data;
        }
    }

    getMinorSubCategoriesById().then((data) => {
        // console.log('getMinorSubCategoryOptions data bungad', data);
        let subCategoryId = value[0].business_sub_category;
        let minorSubCategoryId = value[0].business_minor_sub_category;
        let minorSubCategoryString = value[0].business_minor_sub_category_str;

        if (minorSubCategoryString) {
            document.getElementById('minorSubCategory').value = minorSubCategoryString;
            document.getElementById('minorSubCategoryInput').value = minorSubCategoryString;
        }

        if (subCategoryId && minorSubCategoryId) {
            let filtered = data.filter((d) => d.id == minorSubCategoryId);

            document.getElementById('minorSubCategory').value = filtered[0].title;
            document.getElementById('minorSubCategoryInput').value = filtered[0].title;
            for (var i = 0; i < data.length; i++) {
                for (var i = 0; i < data.length; i++) {
                    let option = document.createElement('option');
                    option.value = data[i]['title'];
                    document.getElementById('minorSubCategories').appendChild(option);
                }
            }
        }

        if (subCategoryId && minorSubCategoryString) {
            document.getElementById('minorSubCategory').value = minorSubCategoryString;
            document.getElementById('minorSubCategoryInput').value = minorSubCategoryString;

            for (var i = 0; i < data.length; i++) {
                let option = document.createElement('option');
                option.value = data[i]['title'];
                document.getElementById('minorSubCategories').appendChild(option);
            }
        }
    });
}

document.getElementById('minorSubCategory').addEventListener('change', function () {
    let minorSubCategoryInitialInput = document.getElementById('minorSubCategory').value;

    if (minorSubCategoryInitialInput) {
        async function getMinorSubCategoryById() {
            let response = await fetch(host + '/api/get/minor-sub-category-by-title/' + minorSubCategoryInitialInput);
            let data = await response.json();
            return data;
        }
    
        getMinorSubCategoryById().then((data) => {
            let minorSubCategoryInitialInput = document.getElementById('minorSubCategory').value;
            if (data.length === 1) {
                document.getElementById('minorSubCategoryInput').value = data[0].id;
            } else if(minorSubCategoryInitialInput == "") {
                document.getElementById('minorSubCategoryInput').value = minorSubCategoryInitialInput;
            }
            else {
                document.getElementById('minorSubCategoryInput').value = minorSubCategoryInitialInput;
            }
        });
    } else {
        document.getElementById('minorSubCategoryInput').value = '';
    }
});


document.getElementById('minorSubCategory').addEventListener('blur', function () {
    let minorSubCategoryInitialInput = document.getElementById('minorSubCategory').value;

    if (minorSubCategoryInitialInput) {
        async function getMinorSubCategoryById() {
            let response = await fetch(host + '/api/get/minor-sub-category-by-title/' + minorSubCategoryInitialInput);
            let data = await response.json();
            return data;
        }
    
        getMinorSubCategoryById().then((data) => {
            let minorSubCategoryInitialInput = document.getElementById('minorSubCategory').value;
            if (data.length === 1) {
                document.getElementById('minorSubCategoryInput').value = data[0].id;
            } else if(minorSubCategoryInitialInput == "") {
                document.getElementById('minorSubCategoryInput').value = minorSubCategoryInitialInput;
            }
            else {
                document.getElementById('minorSubCategoryInput').value = minorSubCategoryInitialInput;
            }
        });
    } else {
        document.getElementById('minorSubCategoryInput').value = '';
    }
});