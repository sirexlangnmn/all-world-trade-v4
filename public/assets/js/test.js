function testImage(url, callback, timeout) {
    timeout = timeout || 5000;
    var timedOut = false,
        timer;
    var img = new Image();
    img.onerror = img.onabort = function () {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, 'error');
        }
    };
    img.onload = function () {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, 'success');
        }
    };
    img.src = url;
    timer = setTimeout(function () {
        timedOut = true;
        callback(url, 'timeout');
    }, timeout);
}

function isValidBanner(url, result) {
    // document.body.innerHTML += "<span class='" + result + "'>" +
    //     result + ": " + url + "</span><br>";
    if (result === 'error') {
        document.getElementById('companyBannerPreview').src =
            host + '/' + 'uploads/placeholder/banner-placeholder2.jpg';
        // console.log(host + 'uploads/placeholder/banner-placeholder2.jpg');
    }
}

function isValidLogo(url, result) {
    // document.body.innerHTML += "<span class='" + result + "'>" +
    //     result + ": " + url + "</span><br>";
    if (result === 'error') {
        document.getElementById('companyLogoPreview').src =
            host + '/' + 'uploads/placeholder/logo-placeholder2.jpg';
        // console.log(host + 'uploads/placeholder/logo-placeholder2.jpg');
    }
}
