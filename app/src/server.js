/*

http://patorjk.com/software/taag/#p=display&f=ANSI%20Regular&t=Server

███████ ███████ ██████  ██    ██ ███████ ██████  
██      ██      ██   ██ ██    ██ ██      ██   ██ 
███████ █████   ██████  ██    ██ █████   ██████  
     ██ ██      ██   ██  ██  ██  ██      ██   ██ 
███████ ███████ ██   ██   ████   ███████ ██   ██       intended for trial                                   

dependencies: {
    compression     : https://www.npmjs.com/package/compression
    cors            : https://www.npmjs.com/package/cors
    dotenv          : https://www.npmjs.com/package/dotenv
    express         : https://www.npmjs.com/package/express
    socket.io       : https://www.npmjs.com/package/socket.io
    swagger         : https://www.npmjs.com/package/swagger-ui-express
    uuid            : https://www.npmjs.com/package/uuid
    yamljs          : https://www.npmjs.com/package/yamljs
    ejs             : https://www.npmjs.com/package/ejs
    mysql           : https://www.npmjs.com/package/mysql
    body-parser     : https://www.npmjs.com/package/body-parser
    bcrypt          : https://www.npmjs.com/package/bcrypt
    express-flash   : https://www.npmjs.com/package/express-flash
    express-session : https://www.npmjs.com/package/express-session
    method-override : https://www.npmjs.com/package/method-override
    nodemon         : https://www.npmjs.com/package/nodemon
    passport        : https://www.npmjs.com/package/passport
    passport-local  : https://www.npmjs.com/package/passport-local
}

*/

'use strict'; // https://www.w3schools.com/js/js_strict.asp

require('dotenv').config();

const { Server } = require('socket.io');
const http = require('http');
const https = require('https');
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors()); // Enable All CORS Requests for all origins
app.use(compression()); // Compress all HTTP responses using GZip

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

const isHttps = false; // must be the same to client.js isHttps
const port = process.env.PORT || 3000; // must be the same to client.js signalingServerPort

let io, server, host;

if (isHttps) {
    const fs = require('fs');
    const options = {
        key: fs.readFileSync(path.join(__dirname, '../ssl/key.pem'), 'utf-8'),
        cert: fs.readFileSync(path.join(__dirname, '../ssl/cert.pem'), 'utf-8'),
    };
    server = https.createServer(options, app);
    io = new Server().listen(server);
    host = 'https://' + 'localhost' + ':' + port;
} else {
    server = http.createServer(app);
    io = new Server().listen(server);
    host = 'http://' + 'localhost' + ':' + port;
}

const api_key_secret = process.env.API_KEY_SECRET || 'all_world_trade_default_secret';

require('../routes/index.js')(app);
require('../routes/password.js')(app);
require('../routes/upload-file.js')(app);

const Logger = require('./Logger');
const log = new Logger('server');

// Use all static files from the public folder
app.use(express.static(path.join(__dirname, '../../', 'public')));

// Api parse body data as json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

// Remove trailing slashes in url handle bad requests
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        log.debug('Request Error', {
            header: req.headers,
            body: req.body,
            error: err.message,
        });
        return res.status(400).send({ status: 404, message: err.message }); // Bad request
    }
    if (req.path.substr(-1) === '/' && req.path.length > 1) {
        let query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -1) + query);
    } else {
        next();
    }
});

// set the view engine to ejs
app.set('view engine', 'ejs');

// home
app.get(['/'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
            country: req.session.user.country,
            state_or_province: req.session.user.state_or_province,
        };
        
        res.render(path.join(__dirname, '../../', 'public/view/home/index'));
    }
    
});

// selections
app.get(['/selection'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };
        
        res.render(path.join(__dirname, '../../', 'public/view/selection/index'));
    }
});

app.get(['/profile'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };

        console.log("sessionData: ", sessionData);

        if (req.session.user.type == 1) {
            res.render(path.join(__dirname, '../../', 'public/view/profile/traders'), {
                data: sessionData,
            });
        }
        if (req.session.user.type == 2) {
            res.render(path.join(__dirname, '../../', 'public/view/profile/large-scale-company'), {
                data: sessionData,
            });
        }
        if (req.session.user.type == 3) {
            res.render(path.join(__dirname, '../../', 'public/view/profile/medium-scale-company'), {
                data: sessionData,
            });
        }
        if (req.session.user.type == 4) {
            res.render(path.join(__dirname, '../../', 'public/view/profile/small-scale-company'), {
                data: sessionData,
            });
        }
        
    }
});

app.get(['/profile2'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };

        console.log(sessionData);

        res.render(path.join(__dirname, '../../', 'public/view/profile/edit'), {
            data: sessionData,
        });
    }
});

app.get(['/edit-traders-profile'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };

        console.log(sessionData);

        res.render(path.join(__dirname, '../../', 'public/view/profile/edit-traders'), {
            data: sessionData,
        });
    }
});

app.get(['/edit-small-scale-profile'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };

        console.log(sessionData);

        res.render(path.join(__dirname, '../../', 'public/view/profile/edit-small-scale-company'), {
            data: sessionData,
        });
    }
});


app.get(['/edit-medium-scale-profile'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };

        console.log(sessionData);

        res.render(path.join(__dirname, '../../', 'public/view/profile/edit-medium-scale-company'), {
            data: sessionData,
        });
    }
});

app.get(['/edit-large-scale-profile'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };

        console.log(sessionData);

        res.render(path.join(__dirname, '../../', 'public/view/profile/edit-large-scale-company'), {
            data: sessionData,
        });
    }
});

// registration
app.get(['/registration-for-small-scale-company'], (req, res) => {
    res.render(path.join(__dirname, '../../', 'public/view/registration/small-scale-company'));
});

// registration
app.get(['/registration-for-medium-scale-company'], (req, res) => {
    res.render(path.join(__dirname, '../../', 'public/view/registration/medium-scale-company'));
});

// registration
app.get(['/registration-for-large-scale-company'], (req, res) => {
    res.render(path.join(__dirname, '../../', 'public/view/registration/large-scale-company'));
});

// registration
app.get(['/traders-registration'], (req, res) => {
    res.render(path.join(__dirname, '../../', 'public/view/registration/traders'));
});


app.get(['/upgrade-plan'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };

        res.render(path.join(__dirname, '../../', 'public/view/upgrade/index'), {
            data: sessionData,
        });
    }
});


app.get(['/upgrade-to-medium-scale'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };

        res.render(path.join(__dirname, '../../', 'public/view/upgrade/medium-scale-company'), {
            data: sessionData,
        });
    }
});

app.get(['/upgrade-to-large-scale'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };

        res.render(path.join(__dirname, '../../', 'public/view/upgrade/large-scale-company'), {
            data: sessionData,
        });
    }
});

app.get(['/upgrade-to-traders'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };

        res.render(path.join(__dirname, '../../', 'public/view/upgrade/traders'), {
            data: sessionData,
        });
    }
});


// email-verification
app.get(['/email-verification'], (req, res) => {
    console.log('req.session sa server email-verification');
    console.log(req.session.verification_code);
    console.log(req.session.registration_uuid);
    console.log(req.session.registration_email_address);
    
    res.render(path.join(__dirname, '../../', 'public/view/verification/email-verification'), {registration_email_address: req.session.registration_email_address});
});

app.get(['/login'], (req, res) => {
    res.render(path.join(__dirname, '../../', 'public/view/login/index'));
});

// not match any of page before, so 404 not found
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, '../../', 'public/view/404.html'));
// });

server.listen(port, null, () => {
    log.debug(
        `%c

	███████╗██╗ ██████╗ ███╗   ██╗      ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗ 
	██╔════╝██║██╔════╝ ████╗  ██║      ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
	███████╗██║██║  ███╗██╔██╗ ██║█████╗███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝
	╚════██║██║██║   ██║██║╚██╗██║╚════╝╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗
	███████║██║╚██████╔╝██║ ╚████║      ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║
	╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝      ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝ started...

	`,
        'font-family:monospace',
    );

    // server settings
    log.debug('settings', {
        server: host,
        api_key_secret: api_key_secret,
    });
});
