module.exports = (app) => {
    const USERS_BUSINESS_MEDIAS = require('../query/users_business_medias.query.js');

    const express = require('express');
    const path = require('path');
    const nodemailer = require('nodemailer');
    const hbs = require('nodemailer-express-handlebars');
    app.use(express.static(path.join(__dirname, '../../', 'public')));

    const mysql = require('mysql2');
    const multer = require('multer');
    // const path = require('path');

    // Database connection
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'FightForYourDreams7!',
        // password: '',
        database: 'awt_db_5',
    });

    db.connect(function (err) {
        if (err) {
            return console.error('error: ' + err.message);
        }
        console.log('Connected to the MySQL server2.');
    });

    //! Use of Multer
    var storage = multer.diskStorage({
        destination: (req, file, callBack) => {
            callBack(null, './public/uploads/users_upload_files/'); // './public/images/' directory name where save the file
        },
        filename: (req, file, callBack) => {
            callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        },
    });

    var upload = multer({
        storage: storage,
    });

    const uploadUsersBusinessMediasMiddleware = upload.fields([
        { name: 'videoInput', maxCount: 1 },
        { name: 'thumbnailInput', maxCount: 1 },
        { name: 'companyBanner', maxCount: 1 },
        { name: 'companyLogo', maxCount: 1 },
        { name: 'brochureInput', maxCount: 1 },
        { name: 'webinarsThumbnailInput', maxCount: 1 },
    ]);

    const uploadAllUsersBusinessMediasMiddleware = upload.fields([
        { name: 'thumbnailInput', maxCount: 1 },
        { name: 'companyBanner', maxCount: 1 },
        { name: 'companyLogo', maxCount: 1 },
        { name: 'brochureInput', maxCount: 1 },
        { name: 'webinarsThumbnailInput', maxCount: 1 },
    ]);

    const uploadAllButNoLogoMiddleware = upload.fields([
        { name: 'thumbnailInput', maxCount: 1 },
        { name: 'companyBanner', maxCount: 1 },
        { name: 'brochureInput', maxCount: 1 },
        { name: 'webinarsThumbnailInput', maxCount: 1 },
    ]);

    const uploadAllButNoBannerMiddleware = upload.fields([
        { name: 'thumbnailInput', maxCount: 1 },
        { name: 'companyLogo', maxCount: 1 },
        { name: 'brochureInput', maxCount: 1 },
        { name: 'webinarsThumbnailInput', maxCount: 1 },
    ]);

    const uploadAllButNoVideoMiddleware = upload.fields([
        { name: 'companyBanner', maxCount: 1 },
        { name: 'companyLogo', maxCount: 1 },
        { name: 'brochureInput', maxCount: 1 },
        { name: 'webinarsThumbnailInput', maxCount: 1 },
    ]);

    const uploadAllButNoBrochureMiddleware = upload.fields([
        { name: 'thumbnailInput', maxCount: 1 },
        { name: 'companyBanner', maxCount: 1 },
        { name: 'companyLogo', maxCount: 1 },
        { name: 'webinarsThumbnailInput', maxCount: 1 },
    ]);

    const uploadAllButNoWebinarMiddleware = upload.fields([
        { name: 'thumbnailInput', maxCount: 1 },
        { name: 'companyBanner', maxCount: 1 },
        { name: 'companyLogo', maxCount: 1 },
        { name: 'brochureInput', maxCount: 1 },
    ]);

    const registrationUploadCompanyLogoBannerVideoMiddleware = upload.fields([
        { name: 'companyBanner', maxCount: 1 },
        { name: 'companyLogo', maxCount: 1 },
        { name: 'thumbnailInput', maxCount: 1 },
    ]);

    const registrationUploadCompanyLogoBannerBrochureMiddleware = upload.fields([
        { name: 'companyBanner', maxCount: 1 },
        { name: 'companyLogo', maxCount: 1 },
        { name: 'brochureInput', maxCount: 1 },
    ]);

    const registrationUploadCompanyLogoBannerWebinarMiddleware = upload.fields([
        { name: 'companyBanner', maxCount: 1 },
        { name: 'companyLogo', maxCount: 1 },
        { name: 'webinarsThumbnailInput', maxCount: 1 },
    ]);

    const registrationUploadCompanyLogoVideoBrochureMiddleware = upload.fields([
        { name: 'thumbnailInput', maxCount: 1 },
        { name: 'companyLogo', maxCount: 1 },
        { name: 'brochureInput', maxCount: 1 },
    ]);

    const registrationUploadCompanyLogoVideoWebinarMiddleware = upload.fields([
        { name: 'thumbnailInput', maxCount: 1 },
        { name: 'companyLogo', maxCount: 1 },
        { name: 'webinarsThumbnailInput', maxCount: 1 },
    ]);

    const registrationUploadCompanyLogoBrochureWebinarMiddleware = upload.fields([
        { name: 'companyLogo', maxCount: 1 },
        { name: 'brochureInput', maxCount: 1 },
        { name: 'webinarsThumbnailInput', maxCount: 1 },
    ]);

    const registrationUploadCompanyBannerVideoBrochureMiddleware = upload.fields([
        { name: 'thumbnailInput', maxCount: 1 },
        { name: 'companyBanner', maxCount: 1 },
        { name: 'brochureInput', maxCount: 1 },
    ]);

    const registrationUploadCompanyBannerVideoWebinarMiddleware = upload.fields([
        { name: 'thumbnailInput', maxCount: 1 },
        { name: 'companyBanner', maxCount: 1 },
        { name: 'webinarsThumbnailInput', maxCount: 1 },
    ]);

    const registrationUploadCompanyBannerBrochureWebinarMiddleware = upload.fields([
        { name: 'companyBanner', maxCount: 1 },
        { name: 'brochureInput', maxCount: 1 },
        { name: 'webinarsThumbnailInput', maxCount: 1 },
    ]);

    const registrationUploadCompanyLogoBannerMiddleware = upload.fields([
        { name: 'companyBanner', maxCount: 1 },
        { name: 'companyLogo', maxCount: 1 },
    ]);

    const registrationUploadCompanyLogoMiddleware = upload.fields([{ name: 'companyLogo', maxCount: 1 }]);
    const registrationUploadCompanyBannerMiddleware = upload.fields([{ name: 'companyBanner', maxCount: 1 }]);
    const registrationUploadCompanyVideoMiddleware = upload.fields([{ name: 'thumbnailInput', maxCount: 1 }]);
    const registrationUploadCompanyBrochureMiddleware = upload.fields([{ name: 'brochureInput', maxCount: 1 }]);
    const registrationUploadCompanyWebinarMiddleware = upload.fields([{ name: 'webinarsThumbnailInput', maxCount: 1 }]);

    const uploadUsersBusinessMediasMiddleware2 = upload.fields([
        { name: 'videoInput', maxCount: 1 },
        { name: 'thumbnailInput', maxCount: 1 },
        { name: 'brochureInput', maxCount: 1 },
        { name: 'webinarsThumbnailInput', maxCount: 1 },
    ]);

    const uploadVideoMiddleware = upload.fields([
        { name: 'videoInput', maxCount: 1 },
        { name: 'thumbnailInput', maxCount: 1 },
    ]);

    const uploadbrochureMiddleware = upload.fields([{ name: 'brochure', maxCount: 1 }]);

    const updateUploadBrochureMiddleware = upload.fields([{ name: 'editBrochure', maxCount: 1 }]);

    const updatecompanyLogoMiddleware = upload.fields([{ name: 'companyLogo', maxCount: 1 }]);

    const updatecompanyBannerMiddleware = upload.fields([{ name: 'companyBanner', maxCount: 1 }]);

    const uploadUsersMediasMiddleware = upload.fields([
        { name: 'companyBanner', maxCount: 1 },
        { name: 'companyLogo', maxCount: 1 },
    ]);

    app.post('/api/post/upload-users-business-medias', uploadUsersBusinessMediasMiddleware, (req, res) => {
        // console.log('req');
        // console.log(req);
        console.log('banner');
        console.log(req.files['companyBanner'][0].filename);
        // console.log(req.files['companyBanner']);
        // console.log(req.files['companyLogo'][0].filename);
        // console.log(req.files['companyLogo']);

        // console.log('video');
        // console.log(req.files['videoInput'][0].filename);
        // console.log(req.files['videoInput']);
        // console.log(req.files['thumbnailInput'][0].filename);
        // console.log(req.files['thumbnailInput']);

        // console.log('brochure');
        // console.log(req.files['brochureInput'][0].filename);
        // console.log(req.files['brochureInput']);

        // console.log('webinars');
        // console.log(req.files['webinarsThumbnailInput'][0].filename);
        // console.log(req.files['webinarsThumbnailInput']);

        // console.log('req.body');
        // console.log(req.body);
        // console.log('req.files');
        // console.log(req.files);

        if (!req.files) {
            console.log('No file upload');
        } else {
            let insertData = [
                req.files['companyLogo'][0].filename,
                req.files['companyBanner'][0].filename,
                req.files['videoInput'][0].filename,
                req.files['thumbnailInput'][0].filename,
                req.body.videoTitle,
                req.body.videoDescription,
                req.files['brochureInput'][0].filename,
                req.body.brochureTitle,
                req.files['webinarsThumbnailInput'][0].filename,
                req.body.webinarsTitle,
                req.body.webinarsDescription,
                req.body.webinarsLink,
                req.body.webinarsSchedule,
                req.body.uuid,
                new Date().toISOString().replace('T', ' ').substr(0, 19),
            ];

            console.log(insertData);
            let insertQuery =
                'INSERT INTO users_business_medias(logo, banner, video, video_thumbnail, video_title, video_description, brochure, brochure_title, webinars_thumbnail, webinars_title, webinars_description, webinars_link, webinars_schedule, uuid, date_created)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(insertQuery, insertData, (err, result) => {
                if (err) {
                    //throw err;
                    console.log(err);
                } else {
                    res.send('success upload files');
                    console.log('success upload files');
                }
            });
        }
    });

    app.post('/api/post/registration-no-upload', (req, res) => {
        console.log('registration-no-upload uuid', req.body.uuid);
        const inputObject = {
            uuid: req.body.uuid,
            date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
        };

        console.log('registration-no-upload inputObject', inputObject);

        db.query(USERS_BUSINESS_MEDIAS.CREATE_NO, Object.values(inputObject), (err, result) => {
            if (err) {
                //throw err;
                console.log(err);
            } else {
                res.send('success upload files');
                console.log('success upload files');
            }
        });
    });

    app.post(
        '/api/post/registration-upload-all-users-business-medias',
        uploadAllUsersBusinessMediasMiddleware,
        (req, res) => {
            // console.log('req');
            // console.log(req);
            console.log('banner');
            console.log(req.files['companyBanner'][0].filename);
            // console.log(req.files['companyBanner']);
            // console.log(req.files['companyLogo'][0].filename);
            // console.log(req.files['companyLogo']);

            // console.log('video');
            // console.log(req.files['videoInput'][0].filename);
            // console.log(req.files['videoInput']);
            // console.log(req.files['thumbnailInput'][0].filename);
            // console.log(req.files['thumbnailInput']);

            // console.log('brochure');
            // console.log(req.files['brochureInput'][0].filename);
            // console.log(req.files['brochureInput']);

            // console.log('webinars');
            // console.log(req.files['webinarsThumbnailInput'][0].filename);
            // console.log(req.files['webinarsThumbnailInput']);

            // console.log('req.body');
            // console.log(req.body);
            // console.log('req.files');
            // console.log(req.files);

            if (!req.files) {
                console.log('No file upload');
            } else {
                const inputObject = {
                    logo: req.files['companyLogo'][0].filename,
                    banner: req.files['companyBanner'][0].filename,
                    video_thumbnail: req.files['thumbnailInput'][0].filename,
                    video_link: req.body.videoLink,
                    video_title: req.body.videoTitle,
                    video_description: req.body.videoDescription,
                    brochure: req.files['brochureInput'][0].filename,
                    brochure_title: req.body.brochureTitle,
                    webinars_thumbnail: req.files['webinarsThumbnailInput'][0].filename,
                    webinars_title: req.body.webinarsTitle,
                    webinars_description: req.body.webinarsDescription,
                    webinars_link: req.body.webinarsLink,
                    webinars_schedule: req.body.webinarsSchedule,
                    uuid: req.body.uuid,
                    date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
                };

                db.query(USERS_BUSINESS_MEDIAS.CREATE_ALL, Object.values(inputObject), (err, result) => {
                    if (err) {
                        //throw err;
                        console.log(err);
                    } else {
                        res.send('success upload files');
                        console.log('success upload files');
                    }
                });
            }
        },
    );

    app.post('/api/post/registration-upload-all-but-no-logo', uploadAllButNoLogoMiddleware, (req, res) => {
        if (!req.files) {
            console.log('No file upload');
        } else {
            const inputObject = {
                banner: req.files['companyBanner'][0].filename,
                video_thumbnail: req.files['thumbnailInput'][0].filename,
                video_link: req.body.videoLink,
                video_title: req.body.videoTitle,
                video_description: req.body.videoDescription,
                brochure: req.files['brochureInput'][0].filename,
                brochure_title: req.body.brochureTitle,
                webinars_thumbnail: req.files['webinarsThumbnailInput'][0].filename,
                webinars_title: req.body.webinarsTitle,
                webinars_description: req.body.webinarsDescription,
                webinars_link: req.body.webinarsLink,
                webinars_schedule: req.body.webinarsSchedule,
                uuid: req.body.uuid,
                date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
            };

            db.query(USERS_BUSINESS_MEDIAS.CREATE_ALL_BUT_NO_LOGO, Object.values(inputObject), (err, result) => {
                if (err) {
                    //throw err;
                    console.log(err);
                } else {
                    res.send('success upload files');
                    console.log('success upload files');
                }
            });
        }
    });

    app.post('/api/post/registration-upload-all-but-no-banner', uploadAllButNoBannerMiddleware, (req, res) => {
        if (!req.files) {
            console.log('No file upload');
        } else {
            const inputObject = {
                logo: req.files['companyLogo'][0].filename,
                video_thumbnail: req.files['thumbnailInput'][0].filename,
                video_link: req.body.videoLink,
                video_title: req.body.videoTitle,
                video_description: req.body.videoDescription,
                brochure: req.files['brochureInput'][0].filename,
                brochure_title: req.body.brochureTitle,
                webinars_thumbnail: req.files['webinarsThumbnailInput'][0].filename,
                webinars_title: req.body.webinarsTitle,
                webinars_description: req.body.webinarsDescription,
                webinars_link: req.body.webinarsLink,
                webinars_schedule: req.body.webinarsSchedule,
                uuid: req.body.uuid,
                date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
            };

            db.query(USERS_BUSINESS_MEDIAS.CREATE_ALL_BUT_NO_BANNER, Object.values(inputObject), (err, result) => {
                if (err) {
                    //throw err;
                    console.log(err);
                } else {
                    res.send('success upload files');
                    console.log('success upload files');
                }
            });
        }
    });

    app.post('/api/post/registration-upload-all-but-no-video', uploadAllButNoVideoMiddleware, (req, res) => {
        if (!req.files) {
            console.log('No file upload');
        } else {
            const inputObject = {
                logo: req.files['companyLogo'][0].filename,
                banner: req.files['companyBanner'][0].filename,
                brochure: req.files['brochureInput'][0].filename,
                brochure_title: req.body.brochureTitle,
                webinars_thumbnail: req.files['webinarsThumbnailInput'][0].filename,
                webinars_title: req.body.webinarsTitle,
                webinars_description: req.body.webinarsDescription,
                webinars_link: req.body.webinarsLink,
                webinars_schedule: req.body.webinarsSchedule,
                uuid: req.body.uuid,
                date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
            };

            db.query(USERS_BUSINESS_MEDIAS.CREATE_ALL_BUT_NO_VIDEO, Object.values(inputObject), (err, result) => {
                if (err) {
                    //throw err;
                    console.log(err);
                } else {
                    res.send('success upload files');
                    console.log('success upload files');
                }
            });
        }
    });

    app.post('/api/post/registration-upload-all-but-no-brochure', uploadAllButNoBrochureMiddleware, (req, res) => {
        if (!req.files) {
            console.log('No file upload');
        } else {
            const inputObject = {
                logo: req.files['companyLogo'][0].filename,
                banner: req.files['companyBanner'][0].filename,
                video_thumbnail: req.files['thumbnailInput'][0].filename,
                video_link: req.body.videoLink,
                video_title: req.body.videoTitle,
                video_description: req.body.videoDescription,
                webinars_thumbnail: req.files['webinarsThumbnailInput'][0].filename,
                webinars_title: req.body.webinarsTitle,
                webinars_description: req.body.webinarsDescription,
                webinars_link: req.body.webinarsLink,
                webinars_schedule: req.body.webinarsSchedule,
                uuid: req.body.uuid,
                date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
            };

            db.query(USERS_BUSINESS_MEDIAS.CREATE_ALL_BUT_NO_BROCHURE, Object.values(inputObject), (err, result) => {
                if (err) {
                    //throw err;
                    console.log(err);
                } else {
                    res.send('success upload files');
                    console.log('success upload files');
                }
            });
        }
    });

    app.post('/api/post/registration-upload-all-but-no-webinar', uploadAllButNoWebinarMiddleware, (req, res) => {
        if (!req.files) {
            console.log('No file upload');
        } else {
            const inputObject = {
                logo: req.files['companyLogo'][0].filename,
                banner: req.files['companyBanner'][0].filename,
                video_thumbnail: req.files['thumbnailInput'][0].filename,
                video_link: req.body.videoLink,
                video_title: req.body.videoTitle,
                video_description: req.body.videoDescription,
                brochure: req.files['brochureInput'][0].filename,
                brochure_title: req.body.brochureTitle,
                uuid: req.body.uuid,
                date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
            };

            db.query(USERS_BUSINESS_MEDIAS.CREATE_ALL_BUT_NO_WEBINAR, Object.values(inputObject), (err, result) => {
                if (err) {
                    //throw err;
                    console.log(err);
                } else {
                    res.send('success upload files');
                    console.log('success upload files');
                }
            });
        }
    });

    app.post(
        '/api/post/registration-upload-company-logo-banner-video',
        registrationUploadCompanyLogoBannerVideoMiddleware,
        (req, res) => {
            if (!req.files) {
                console.log('No file upload');
            } else {
                const inputObject = {
                    logo: req.files['companyLogo'][0].filename,
                    banner: req.files['companyBanner'][0].filename,
                    video_thumbnail: req.files['thumbnailInput'][0].filename,
                    video_link: req.body.videoLink,
                    video_title: req.body.videoTitle,
                    video_description: req.body.videoDescription,
                    uuid: req.body.uuid,
                    date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
                };

                db.query(USERS_BUSINESS_MEDIAS.CREATE_LOGO_BANNER_VIDEO, Object.values(inputObject), (err, result) => {
                    if (err) {
                        //throw err;
                        console.log(err);
                    } else {
                        res.send('success upload files');
                        console.log('success upload files');
                    }
                });
            }
        },
    );

    app.post(
        '/api/post/registration-upload-company-logo-banner-brochure',
        registrationUploadCompanyLogoBannerBrochureMiddleware,
        (req, res) => {
            if (!req.files) {
                console.log('No file upload');
            } else {
                const inputObject = {
                    logo: req.files['companyLogo'][0].filename,
                    banner: req.files['companyBanner'][0].filename,
                    brochure: req.files['brochureInput'][0].filename,
                    brochure_title: req.body.brochureTitle,
                    uuid: req.body.uuid,
                    date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
                };

                db.query(
                    USERS_BUSINESS_MEDIAS.CREATE_LOGO_BANNER_BROCHURE,
                    Object.values(inputObject),
                    (err, result) => {
                        if (err) {
                            //throw err;
                            console.log(err);
                        } else {
                            res.send('success upload files');
                            console.log('success upload files');
                        }
                    },
                );
            }
        },
    );

    app.post(
        '/api/post/registration-upload-company-logo-banner-webinar',
        registrationUploadCompanyLogoBannerWebinarMiddleware,
        (req, res) => {
            if (!req.files) {
                console.log('No file upload');
            } else {
                const inputObject = {
                    logo: req.files['companyLogo'][0].filename,
                    banner: req.files['companyBanner'][0].filename,
                    webinars_thumbnail: req.files['webinarsThumbnailInput'][0].filename,
                    webinars_title: req.body.webinarsTitle,
                    webinars_description: req.body.webinarsDescription,
                    webinars_link: req.body.webinarsLink,
                    webinars_schedule: req.body.webinarsSchedule,
                    uuid: req.body.uuid,
                    date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
                };

                db.query(
                    USERS_BUSINESS_MEDIAS.CREATE_LOGO_BANNER_WEBINAR,
                    Object.values(inputObject),
                    (err, result) => {
                        if (err) {
                            //throw err;
                            console.log(err);
                        } else {
                            res.send('success upload files');
                            console.log('success upload files');
                        }
                    },
                );
            }
        },
    );

    app.post(
        '/api/post/registration-upload-company-logo-video-brochure',
        registrationUploadCompanyLogoVideoBrochureMiddleware,
        (req, res) => {
            if (!req.files) {
                console.log('No file upload');
            } else {
                const inputObject = {
                    logo: req.files['companyLogo'][0].filename,
                    video_thumbnail: req.files['thumbnailInput'][0].filename,
                    video_link: req.body.videoLink,
                    video_title: req.body.videoTitle,
                    video_description: req.body.videoDescription,
                    brochure: req.files['brochureInput'][0].filename,
                    brochure_title: req.body.brochureTitle,
                    uuid: req.body.uuid,
                    date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
                };

                db.query(
                    USERS_BUSINESS_MEDIAS.CREATE_LOGO_VIDEO_BROCHURE,
                    Object.values(inputObject),
                    (err, result) => {
                        if (err) {
                            //throw err;
                            console.log(err);
                        } else {
                            res.send('success upload files');
                            console.log('success upload files');
                        }
                    },
                );
            }
        },
    );

    app.post(
        '/api/post/registration-upload-company-logo-video-webinar',
        registrationUploadCompanyLogoVideoWebinarMiddleware,
        (req, res) => {
            if (!req.files) {
                console.log('No file upload');
            } else {
                const inputObject = {
                    logo: req.files['companyLogo'][0].filename,
                    video_thumbnail: req.files['thumbnailInput'][0].filename,
                    video_link: req.body.videoLink,
                    video_title: req.body.videoTitle,
                    video_description: req.body.videoDescription,
                    webinars_thumbnail: req.files['webinarsThumbnailInput'][0].filename,
                    webinars_title: req.body.webinarsTitle,
                    webinars_description: req.body.webinarsDescription,
                    webinars_link: req.body.webinarsLink,
                    webinars_schedule: req.body.webinarsSchedule,
                    uuid: req.body.uuid,
                    date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
                };

                db.query(USERS_BUSINESS_MEDIAS.CREATE_LOGO_VIDEO_WEBINAR, Object.values(inputObject), (err, result) => {
                    if (err) {
                        //throw err;
                        console.log(err);
                    } else {
                        res.send('success upload files');
                        console.log('success upload files');
                    }
                });
            }
        },
    );

    app.post(
        '/api/post/registration-upload-company-logo-brochure-webinar',
        registrationUploadCompanyLogoBrochureWebinarMiddleware,
        (req, res) => {
            if (!req.files) {
                console.log('No file upload');
            } else {
                const inputObject = {
                    logo: req.files['companyLogo'][0].filename,
                    brochure: req.files['brochureInput'][0].filename,
                    brochure_title: req.body.brochureTitle,
                    webinars_thumbnail: req.files['webinarsThumbnailInput'][0].filename,
                    webinars_title: req.body.webinarsTitle,
                    webinars_description: req.body.webinarsDescription,
                    webinars_link: req.body.webinarsLink,
                    webinars_schedule: req.body.webinarsSchedule,
                    uuid: req.body.uuid,
                    date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
                };

                db.query(
                    USERS_BUSINESS_MEDIAS.CREATE_LOGO_BROCHURE_WEBINAR,
                    Object.values(inputObject),
                    (err, result) => {
                        if (err) {
                            //throw err;
                            console.log(err);
                        } else {
                            res.send('success upload files');
                            console.log('success upload files');
                        }
                    },
                );
            }
        },
    );

    app.post(
        '/api/post/registration-upload-company-banner-video-brochure',
        registrationUploadCompanyBannerVideoBrochureMiddleware,
        (req, res) => {
            if (!req.files) {
                console.log('No file upload');
            } else {
                const inputObject = {
                    banner: req.files['companyBanner'][0].filename,
                    video_thumbnail: req.files['thumbnailInput'][0].filename,
                    video_link: req.body.videoLink,
                    video_title: req.body.videoTitle,
                    video_description: req.body.videoDescription,
                    brochure: req.files['brochureInput'][0].filename,
                    brochure_title: req.body.brochureTitle,
                    uuid: req.body.uuid,
                    date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
                };

                db.query(
                    USERS_BUSINESS_MEDIAS.CREATE_BANNER_VIDEO_BROCHURE,
                    Object.values(inputObject),
                    (err, result) => {
                        if (err) {
                            //throw err;
                            console.log(err);
                        } else {
                            res.send('success upload files');
                            console.log('success upload files');
                        }
                    },
                );
            }
        },
    );

    app.post(
        '/api/post/registration-upload-company-banner-video-webinar',
        registrationUploadCompanyBannerVideoWebinarMiddleware,
        (req, res) => {
            if (!req.files) {
                console.log('No file upload');
            } else {
                const inputObject = {
                    banner: req.files['companyBanner'][0].filename,
                    video_thumbnail: req.files['thumbnailInput'][0].filename,
                    video_link: req.body.videoLink,
                    video_title: req.body.videoTitle,
                    video_description: req.body.videoDescription,
                    webinars_thumbnail: req.files['webinarsThumbnailInput'][0].filename,
                    webinars_title: req.body.webinarsTitle,
                    webinars_description: req.body.webinarsDescription,
                    webinars_link: req.body.webinarsLink,
                    webinars_schedule: req.body.webinarsSchedule,
                    uuid: req.body.uuid,
                    date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
                };

                db.query(
                    USERS_BUSINESS_MEDIAS.CREATE_BANNER_VIDEO_WEBINAR,
                    Object.values(inputObject),
                    (err, result) => {
                        if (err) {
                            //throw err;
                            console.log(err);
                        } else {
                            res.send('success upload files');
                            console.log('success upload files');
                        }
                    },
                );
            }
        },
    );

    app.post(
        '/api/post/registration-upload-company-banner-brochure-webinar',
        registrationUploadCompanyBannerBrochureWebinarMiddleware,
        (req, res) => {
            if (!req.files) {
                console.log('No file upload');
            } else {
                const inputObject = {
                    banner: req.files['companyBanner'][0].filename,
                    brochure: req.files['brochureInput'][0].filename,
                    brochure_title: req.body.brochureTitle,
                    webinars_thumbnail: req.files['webinarsThumbnailInput'][0].filename,
                    webinars_title: req.body.webinarsTitle,
                    webinars_description: req.body.webinarsDescription,
                    webinars_link: req.body.webinarsLink,
                    webinars_schedule: req.body.webinarsSchedule,
                    uuid: req.body.uuid,
                    date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
                };

                db.query(
                    USERS_BUSINESS_MEDIAS.CREATE_BANNER_BROCHURE_WEBINAR,
                    Object.values(inputObject),
                    (err, result) => {
                        if (err) {
                            //throw err;
                            console.log(err);
                        } else {
                            res.send('success upload files');
                            console.log('success upload files');
                        }
                    },
                );
            }
        },
    );

    app.post(
        '/api/post/registration-upload-company-logo-banner',
        registrationUploadCompanyLogoBannerMiddleware,
        (req, res) => {
            if (!req.files) {
                console.log('No file upload');
            } else {
                const inputObject = {
                    logo: req.files['companyLogo'][0].filename,
                    banner: req.files['companyBanner'][0].filename,
                    uuid: req.body.uuid,
                    date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
                };

                db.query(USERS_BUSINESS_MEDIAS.CREATE_LOGO_BANNER, Object.values(inputObject), (err, result) => {
                    if (err) {
                        //throw err;
                        console.log(err);
                    } else {
                        res.send('success upload files');
                        console.log('success upload files');
                    }
                });
            }
        },
    );

    app.post('/api/post/registration-upload-company-logo', registrationUploadCompanyLogoMiddleware, (req, res) => {
        if (!req.files) {
            console.log('No file upload');
        } else {
            const inputObject = {
                logo: req.files['companyLogo'][0].filename,
                uuid: req.body.uuid,
                date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
            };

            db.query(USERS_BUSINESS_MEDIAS.CREATE_LOGO, Object.values(inputObject), (err, result) => {
                if (err) {
                    //throw err;
                    console.log(err);
                } else {
                    res.send('success upload files');
                    console.log('success upload files');
                }
            });
        }
    });

    app.post('/api/post/registration-upload-company-banner', registrationUploadCompanyBannerMiddleware, (req, res) => {
        if (!req.files) {
            console.log('No file upload');
        } else {
            const inputObject = {
                banner: req.files['companyBanner'][0].filename,
                uuid: req.body.uuid,
                date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
            };

            db.query(USERS_BUSINESS_MEDIAS.CREATE_BANNER, Object.values(inputObject), (err, result) => {
                if (err) {
                    //throw err;
                    console.log(err);
                } else {
                    res.send('success upload files');
                    console.log('success upload files');
                }
            });
        }
    });

    app.post('/api/post/registration-upload-company-video', registrationUploadCompanyVideoMiddleware, (req, res) => {
        if (!req.files) {
            console.log('No file upload');
        } else {
            const inputObject = {
                video_thumbnail: req.files['thumbnailInput'][0].filename,
                video_link: req.body.videoLink,
                video_title: req.body.videoTitle,
                video_description: req.body.videoDescription,
                uuid: req.body.uuid,
                date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
            };

            db.query(USERS_BUSINESS_MEDIAS.CREATE_VIDEO, Object.values(inputObject), (err, result) => {
                if (err) {
                    //throw err;
                    console.log(err);
                } else {
                    res.send('success upload files');
                    console.log('success upload files');
                }
            });
        }
    });

    app.post(
        '/api/post/registration-upload-company-brochure',
        registrationUploadCompanyBrochureMiddleware,
        (req, res) => {
            if (!req.files) {
                console.log('No file upload');
            } else {
                const inputObject = {
                    brochure: req.files['brochureInput'][0].filename,
                    brochure_title: req.body.brochureTitle,
                    uuid: req.body.uuid,
                    date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
                };

                db.query(USERS_BUSINESS_MEDIAS.CREATE_BROCHURE, Object.values(inputObject), (err, result) => {
                    if (err) {
                        //throw err;
                        console.log(err);
                    } else {
                        res.send('success upload files');
                        console.log('success upload files');
                    }
                });
            }
        },
    );

    app.post(
        '/api/post/registration-upload-company-webinar',
        registrationUploadCompanyWebinarMiddleware,
        (req, res) => {
            if (!req.files) {
                console.log('No file upload');
            } else {
                const inputObject = {
                    webinars_thumbnail: req.files['webinarsThumbnailInput'][0].filename,
                    webinars_title: req.body.webinarsTitle,
                    webinars_description: req.body.webinarsDescription,
                    webinars_link: req.body.webinarsLink,
                    webinars_schedule: req.body.webinarsSchedule,
                    uuid: req.body.uuid,
                    date_created: new Date().toISOString().replace('T', ' ').substr(0, 19),
                };

                db.query(USERS_BUSINESS_MEDIAS.CREATE_WEBINAR, Object.values(inputObject), (err, result) => {
                    if (err) {
                        //throw err;
                        console.log(err);
                    } else {
                        res.send('success upload files');
                        console.log('success upload files');
                    }
                });
            }
        },
    );

    app.post('/api/post/registration-email-verification', (req, res) => {
        console.log('verification_code', req.body.verification_code);
        console.log('email_or_social_media', req.body.email_or_social_media);
        console.log('uuid', req.body.uuid);
        console.log('res.body', req.body);

        let verification_code = req.body.verification_code;
        let receiverEmailAddress = req.body.email_or_social_media;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'mail.allworldtrade.com', // smtp.gmail.com
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'verification@allworldtrade.com', // allworldtrade.com@gmail.com
                pass: 'FightForYourDreams7!()', //
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const handlebarOptions = {
            viewEngine: {
                extName: '.handlebars',
                partialsDir: path.resolve('./public/view/email'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./public/view/email'),
            extName: '.handlebars',
        };

        transporter.use('compile', hbs(handlebarOptions));

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"verification@allworldtrade.com" <verification@allworldtrade.com>', // sender address //anepch@yahoo.com
            to: receiverEmailAddress, // list of receivers // anepch@yahoo.com
            subject: 'verification subject', // Subject line
            template: 'registration-email-verification', //email
            context: {
                code: verification_code,
            },
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                // return error;
            } else {
                res.send('email sent');
                console.log('Email has been sent');
            }
            // console.log('Message sent info: ', info);
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            // res.render('Email has been sent');
        });
    });

    app.post('/api/post/upload-users-business-medias2', uploadUsersBusinessMediasMiddleware2, (req, res) => {
        if (!req.files) {
            console.log('No file upload');
        } else {
            let insertData = [
                req.files['videoInput'][0].filename,
                req.files['thumbnailInput'][0].filename,
                req.body.videoTitle,
                req.body.videoDescription,
                req.files['brochureInput'][0].filename,
                req.body.brochureTitle,
                req.files['webinarsThumbnailInput'][0].filename,
                req.body.webinarsTitle,
                req.body.webinarsDescription,
                req.body.webinarsLink,
                req.body.webinarsSchedule,
                new Date().toISOString().replace('T', ' ').substr(0, 19),
                req.body.uuid,
            ];

            console.log(insertData);
            console.log(req.files);

            const insertQuery = `UPDATE users_business_medias SET 
                video = ?,
                video_thumbnail = ?, 
                video_title = ?, 
                video_description = ?, 
                brochure = ?, 
                brochure_title = ?, 
                webinars_thumbnail = ?, 
                webinars_title = ?, 
                webinars_description = ?, 
                webinars_link = ?, 
                webinars_schedule = ?, 
                date_created = ?
                WHERE uuid = ?`;

            db.query(insertQuery, insertData, (err, result) => {
                if (err) {
                    //throw err;
                    console.log(err);
                } else {
                    res.send('success upload files');
                    console.log('success upload files');
                }
            });
        }
    });

    app.post('/api/post/upload-video2', uploadVideoMiddleware, (req, res) => {
        if (!req.files) {
            console.log('No file upload');
        } else {
            let insertData = [
                req.files['videoInput'][0].filename,
                req.files['thumbnailInput'][0].filename,
                req.body.videoTitle,
                req.body.videoDescription,
                req.session.user.uuid,
                new Date().toISOString().replace('T', ' ').substr(0, 19),
            ];
            let insertQuery =
                'INSERT INTO users_business_medias(video, video_thumbnail, video_title, video_description, uuid, date_created)VALUES(?, ?, ?, ?, ?, ?)';
            db.query(insertQuery, insertData, (err, result) => {
                // if (err) throw err;
                // console.log('file uploaded');
                // res.send('File uploaded successfully');
                // result(null, { id: rows.insertId });

                if (err) {
                    throw err;
                } else {
                    res.send('success');
                }
            });
        }
    });

    app.post('/api/post/upload-brochure', uploadbrochureMiddleware, (req, res) => {
        // console.log('uploadbrochureMiddleware');
        // console.log(req.files['brochure']);
        // console.log(req.files['brochure'][0].filename);
        // console.log(req.body.brochureTitle);

        if (!req.files) {
            console.log('No file upload');
        } else {
            let insertData = [
                req.files['brochure'][0].filename,
                req.body.brochureTitle,
                req.session.user.uuid,
                new Date().toISOString().replace('T', ' ').substr(0, 19),
            ];

            let insertQuery =
                'INSERT INTO users_business_medias(brochure, brochure_title, uuid, date_created)VALUES(?, ?, ?, ?)';

            db.query(insertQuery, insertData, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('success');
                }
            });
        }
    });

    app.post('/api/post/update-upload-brochure', updateUploadBrochureMiddleware, (req, res) => {
        // console.log(req.files['editBrochure']);
        // console.log(req.files['editBrochure'][0].filename);
        // console.log(req.body.editBrochureTitle);
        // console.log(req.body.editBrochureId);
        // console.log(req.session.user.uuid);

        if (!req.files) {
            console.log('No file upload');
        } else {
            let updateData = [
                req.files['editBrochure'][0].filename,
                req.body.editBrochureTitle,
                new Date().toISOString().replace('T', ' ').substr(0, 19),
                req.body.editBrochureId,
            ];

            let updateQuery =
                'UPDATE users_business_medias SET brochure = ?, brochure_title = ?, date_created = ? WHERE id = ?';

            db.query(updateQuery, updateData, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('success');
                }
            });
        }
    });

    app.post('/api/post/update-trader-company-logo', updatecompanyLogoMiddleware, (req, res) => {
        // console.log(req.files['companyLogo']);
        // console.log(req.files['companyLogo'][0].filename);
        // console.log(req.body.companyLogoId);

        if (!req.files) {
            console.log('No file upload');
        } else {
            let updateData = [
                req.files['companyLogo'][0].filename,
                new Date().toISOString().replace('T', ' ').substr(0, 19),
                req.body.companyLogoId,
            ];

            let updateQuery = 'UPDATE users_business_medias SET logo = ?, date_created = ? WHERE id = ?';

            db.query(updateQuery, updateData, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('success');
                }
            });
        }
    });

    app.post('/api/post/update-trader-company-banner', updatecompanyBannerMiddleware, (req, res) => {
        console.log('api/post/update-trader-company-banner', req.files['companyBanner']);
        console.log('api/post/update-trader-company-banner', req.files['companyBanner'][0].filename);
        console.log('api/post/update-trader-company-banner', req.body.companyBannerId);
        if (!req.files) {
            console.log('No file upload');
        } else {
            let updateData = [
                req.files['companyBanner'][0].filename,
                new Date().toISOString().replace('T', ' ').substr(0, 19),
                req.body.companyBannerId,
                req.session.user.uuid,
            ];
            let updateQuery = 'UPDATE users_business_medias SET banner = ?, date_created = ? WHERE id = ? && uuid = ?';
            // console.log(updateQuery);
            // console.log(req.files['companyBanner'][0].filename);
            console.log('api/post/update-trader-company-banner updateData');
            console.log(updateData);
            db.query(updateQuery, updateData, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('success');
                }
            });
        }
    });

    app.post('/api/post/users-medias-process', uploadUsersMediasMiddleware, (req, res) => {
        // console.log(req.body.verification_code);
        // console.log(req.body.emailAddress);
        registrationEmailVerification(req.body.verification_code, req.body.emailAddress);

        if (!req.files) {
            console.log('No file upload');
        } else {
            let insertData = [
                req.files['companyLogo'][0].filename,
                req.files['companyBanner'][0].filename,
                req.body.uuid,
                new Date().toISOString().replace('T', ' ').substr(0, 19),
            ];

            //console.log(insertData);
            let insertQuery = 'INSERT INTO users_business_medias(logo, banner, uuid, date_created)VALUES(?, ?, ?, ?)';
            db.query(insertQuery, insertData, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('success upload files');
                    console.log('success upload files');
                }
            });
        }
    });
};
