 app.post('/api/post/registration-upload-all-users-business-medias', uploadAllUsersBusinessMediasMiddleware, (req, res) => {
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
                date_created: new Date().toISOString().replace('T', ' ').substr(0, 19)
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
    });





    
 if (companyLogo == 1 &&
        companyBanner == 1 && 
        thumbnailInput == 1 && 
        brochureInput == 1 && 
        webinarsThumbnailInput == 1 && 
        isWantToUploadVideo == 1 && 
        isWantToUploadBrochure == 1 && 
        isWantToUploadCompanyWebinar == 1)  {
        let response  = registrationUploadAllUsersBusinessMedias(uuid);
        console.log("yes registrationUploadAllUsersBusinessMedias");
        console.log("registrationUploadAllUsersBusinessMedias: " + response);
    } else {
        console.log("no registrationUploadAllUsersBusinessMedias");
    }

    













     const uploadAllUsersBusinessMediasMiddleware = upload.fields([
        { name: 'thumbnailInput', maxCount: 1 },
        { name: 'companyBanner', maxCount: 1 },
        { name: 'companyLogo', maxCount: 1 },
        { name: 'brochureInput', maxCount: 1 },
        { name: 'webinarsThumbnailInput', maxCount: 1 },
    ]);







    CREATE_ALL: 'INSERT INTO users_business_medias (' +
		'logo, ' +
		'banner, ' +
		'video_thumbnail, ' +
		'video_link, ' +
		'video_title, ' +
		'video_description, ' +
		'brochure, ' +
		'brochure_title, ' +
		'webinars_thumbnail, ' +
		'webinars_title, ' +
		'webinars_description, ' +
		'webinars_link, ' +
		'webinars_schedule, ' +
		'uuid, ' +
		'date_created) VALUES' +
		'(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',