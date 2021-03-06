(function(window) {
    'use strict';
    window.Appwrite = function() {
        let config = { endpoint: 'https://appwrite.io/v1', project: '', locale: '', };
        let setEndpoint = function(endpoint) { config.endpoint = endpoint; return this };
        let setProject = function(value) { http.addGlobalHeader('X-Appwrite-Project', value);
            config.project = value; return this };
        let setLocale = function(value) { http.addGlobalHeader('X-Appwrite-Locale', value);
            config.locale = value; return this };
        let http = function(document) {
            let globalParams = [],
                globalHeaders = [];
            let addParam = function(url, param, value) { let a = document.createElement('a'),
                    regex = /(?:\?|&amp;|&)+([^=]+)(?:=([^&]*))*/g; let match, str = [];
                a.href = url;
                param = encodeURIComponent(param); while (match = regex.exec(a.search))
                    if (param !== match[1]) str.push(match[1] + (match[2] ? "=" + match[2] : ""));
                str.push(param + (value ? "=" + encodeURIComponent(value) : ""));
                a.search = str.join("&"); return a.href };
            let buildQuery = function(params) {
                let str = [];
                for (let p in params) { if (Array.isArray(params[p])) { for (let index = 0; index < params[p].length; index++) { let param = params[p][index];
                            str.push(encodeURIComponent(p + '[]') + "=" + encodeURIComponent(param)) } } else { str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p])) } }
                return str.join("&")
            };
            let addGlobalHeader = function(key, value) { globalHeaders[key] = { key: key.toLowerCase(), value: value.toLowerCase() } };
            let addGlobalParam = function(key, value) { globalParams.push({ key: key, value: value }) };
            addGlobalHeader('x-sdk-version', 'appwrite:web:2.0.0');
            addGlobalHeader('content-type', '');
            let call = function(method, path, headers = {}, params = {}, progress = null) {
                let i;
                path = config.endpoint + path;
                if (-1 === ['GET', 'POST', 'PUT', 'DELETE', 'TRACE', 'HEAD', 'OPTIONS', 'CONNECT', 'PATCH'].indexOf(method)) { throw new Error('var method must contain a valid HTTP method name') }
                if (typeof path !== 'string') { throw new Error('var path must be of type string') }
                if (typeof headers !== 'object') { throw new Error('var headers must be of type object') }
                for (i = 0; i < globalParams.length; i++) { path = addParam(path, globalParams[i].key, globalParams[i].value) }
                if (window.localStorage && window.localStorage.getItem('cookieFallback')) { headers['X-Fallback-Cookies'] = window.localStorage.getItem('cookieFallback') }
                for (let key in globalHeaders) { if (globalHeaders.hasOwnProperty(key)) { if (!headers[globalHeaders[key].key]) { headers[globalHeaders[key].key] = globalHeaders[key].value } } }
                if (method === 'GET') { for (let param in params) { if (param.hasOwnProperty(key)) { path = addParam(path, key + (Array.isArray(param) ? '[]' : ''), params[key]) } } }
                switch (headers['content-type']) {
                    case 'application/json':
                        params = JSON.stringify(params); break;
                    case 'multipart/form-data':
                        let formData = new FormData();
                        Object.keys(params).forEach(function(key) { let param = params[key];
                            formData.append(key + (Array.isArray(param) ? '[]' : ''), param) });
                        params = formData; break }
                return new Promise(function(resolve, reject) {
                    let request = new XMLHttpRequest(),
                        key;
                    request.withCredentials = !0;
                    request.open(method, path, !0);
                    for (key in headers) {
                        if (headers.hasOwnProperty(key)) {
                            if (key === 'content-type' && headers[key] === 'multipart/form-data') { continue }
                            request.setRequestHeader(key, headers[key])
                        }
                    }
                    request.onload = function() {
                        let data = request.response;
                        let contentType = this.getResponseHeader('content-type') || '';
                        contentType = contentType.substring(0, contentType.indexOf(';'));
                        switch (contentType) {
                            case 'application/json':
                                data = JSON.parse(data); break }
                        let cookieFallback = this.getResponseHeader('X-Fallback-Cookies') || '';
                        if (window.localStorage && cookieFallback) { window.console.warn('Appwrite is using localStorage for session management. Increase your security by adding a custom domain as your API endpoint.');
                            window.localStorage.setItem('cookieFallback', cookieFallback) }
                        if (4 === request.readyState && 399 >= request.status) { resolve(data) } else { reject(data) }
                    };
                    if (progress) { request.addEventListener('progress', progress);
                        request.upload.addEventListener('progress', progress, !1) }
                    request.onerror = function() { reject(new Error("Network Error")) };
                    request.send(params)
                })
            };
            return { 'get': function(path, headers = {}, params = {}) { return call('GET', path + ((Object.keys(params).length > 0) ? '?' + buildQuery(params) : ''), headers, {}) }, 'post': function(path, headers = {}, params = {}, progress = null) { return call('POST', path, headers, params, progress) }, 'put': function(path, headers = {}, params = {}, progress = null) { return call('PUT', path, headers, params, progress) }, 'patch': function(path, headers = {}, params = {}, progress = null) { return call('PATCH', path, headers, params, progress) }, 'delete': function(path, headers = {}, params = {}, progress = null) { return call('DELETE', path, headers, params, progress) }, 'addGlobalParam': addGlobalParam, 'addGlobalHeader': addGlobalHeader }
        }(window.document);
        let account = {
            get: function() { let path = '/account'; let payload = {}; return http.get(path, { 'content-type': 'application/json', }, payload) },
            create: function(email, password, name = '') {
                if (email === undefined) { throw new Error('Missing required parameter: "email"') }
                if (password === undefined) { throw new Error('Missing required parameter: "password"') }
                let path = '/account';
                let payload = {};
                if (email) { payload.email = email }
                if (password) { payload.password = password }
                if (name) { payload.name = name }
                return http.post(path, { 'content-type': 'application/json', }, payload)
            },
            delete: function() { let path = '/account'; let payload = {}; return http.delete(path, { 'content-type': 'application/json', }, payload) },
            updateEmail: function(email, password) {
                if (email === undefined) { throw new Error('Missing required parameter: "email"') }
                if (password === undefined) { throw new Error('Missing required parameter: "password"') }
                let path = '/account/email';
                let payload = {};
                if (email) { payload.email = email }
                if (password) { payload.password = password }
                return http.patch(path, { 'content-type': 'application/json', }, payload)
            },
            getLogs: function() { let path = '/account/logs'; let payload = {}; return http.get(path, { 'content-type': 'application/json', }, payload) },
            updateName: function(name) {
                if (name === undefined) { throw new Error('Missing required parameter: "name"') }
                let path = '/account/name';
                let payload = {};
                if (name) { payload.name = name }
                return http.patch(path, { 'content-type': 'application/json', }, payload)
            },
            updatePassword: function(password, oldPassword) {
                if (password === undefined) { throw new Error('Missing required parameter: "password"') }
                if (oldPassword === undefined) { throw new Error('Missing required parameter: "oldPassword"') }
                let path = '/account/password';
                let payload = {};
                if (password) { payload.password = password }
                if (oldPassword) { payload.oldPassword = oldPassword }
                return http.patch(path, { 'content-type': 'application/json', }, payload)
            },
            getPrefs: function() { let path = '/account/prefs'; let payload = {}; return http.get(path, { 'content-type': 'application/json', }, payload) },
            updatePrefs: function(prefs) {
                if (prefs === undefined) { throw new Error('Missing required parameter: "prefs"') }
                let path = '/account/prefs';
                let payload = {};
                if (prefs) { payload.prefs = prefs }
                return http.patch(path, { 'content-type': 'application/json', }, payload)
            },
            createRecovery: function(email, url) {
                if (email === undefined) { throw new Error('Missing required parameter: "email"') }
                if (url === undefined) { throw new Error('Missing required parameter: "url"') }
                let path = '/account/recovery';
                let payload = {};
                if (email) { payload.email = email }
                if (url) { payload.url = url }
                return http.post(path, { 'content-type': 'application/json', }, payload)
            },
            updateRecovery: function(userId, secret, password, passwordAgain) {
                if (userId === undefined) { throw new Error('Missing required parameter: "userId"') }
                if (secret === undefined) { throw new Error('Missing required parameter: "secret"') }
                if (password === undefined) { throw new Error('Missing required parameter: "password"') }
                if (passwordAgain === undefined) { throw new Error('Missing required parameter: "passwordAgain"') }
                let path = '/account/recovery';
                let payload = {};
                if (userId) { payload.userId = userId }
                if (secret) { payload.secret = secret }
                if (password) { payload.password = password }
                if (passwordAgain) { payload.passwordAgain = passwordAgain }
                return http.put(path, { 'content-type': 'application/json', }, payload)
            },
            getSessions: function() { let path = '/account/sessions'; let payload = {}; return http.get(path, { 'content-type': 'application/json', }, payload) },
            createSession: function(email, password) {
                if (email === undefined) { throw new Error('Missing required parameter: "email"') }
                if (password === undefined) { throw new Error('Missing required parameter: "password"') }
                let path = '/account/sessions';
                let payload = {};
                if (email) { payload.email = email }
                if (password) { payload.password = password }
                return http.post(path, { 'content-type': 'application/json', }, payload)
            },
            deleteSessions: function() { let path = '/account/sessions'; let payload = {}; return http.delete(path, { 'content-type': 'application/json', }, payload) },
            createOAuth2Session: function(provider, success = 'https://appwrite.io/auth/oauth2/success', failure = 'https://appwrite.io/auth/oauth2/failure', scopes = []) {
                if (provider === undefined) { throw new Error('Missing required parameter: "provider"') }
                let path = '/account/sessions/oauth2/{provider}'.replace(new RegExp('{provider}', 'g'), provider);
                let payload = {};
                if (success) { payload.success = success }
                if (failure) { payload.failure = failure }
                if (scopes) { payload.scopes = scopes }
                payload.project = config.project;
                let query = [];
                for (let p in payload) { if (Array.isArray(payload[p])) { for (let index = 0; index < payload[p].length; index++) { let param = payload[p][index];
                            query.push(encodeURIComponent(p + '[]') + "=" + encodeURIComponent(param)) } } else { query.push(encodeURIComponent(p) + "=" + encodeURIComponent(payload[p])) } }
                query = query.join("&");
                window.location = config.endpoint + path + ((query) ? '?' + query : '')
            },
            deleteSession: function(sessionId) {
                if (sessionId === undefined) { throw new Error('Missing required parameter: "sessionId"') }
                let path = '/account/sessions/{sessionId}'.replace(new RegExp('{sessionId}', 'g'), sessionId);
                let payload = {};
                return http.delete(path, { 'content-type': 'application/json', }, payload)
            },
            createVerification: function(url) {
                if (url === undefined) { throw new Error('Missing required parameter: "url"') }
                let path = '/account/verification';
                let payload = {};
                if (url) { payload.url = url }
                return http.post(path, { 'content-type': 'application/json', }, payload)
            },
            updateVerification: function(userId, secret) {
                if (userId === undefined) { throw new Error('Missing required parameter: "userId"') }
                if (secret === undefined) { throw new Error('Missing required parameter: "secret"') }
                let path = '/account/verification';
                let payload = {};
                if (userId) { payload.userId = userId }
                if (secret) { payload.secret = secret }
                return http.put(path, { 'content-type': 'application/json', }, payload)
            }
        };
        let avatars = {
            getBrowser: function(code, width = 100, height = 100, quality = 100) {
                if (code === undefined) { throw new Error('Missing required parameter: "code"') }
                let path = '/avatars/browsers/{code}'.replace(new RegExp('{code}', 'g'), code);
                let payload = {};
                if (width) { payload.width = width }
                if (height) { payload.height = height }
                if (quality) { payload.quality = quality }
                payload.project = config.project;
                let query = [];
                for (let p in payload) { if (Array.isArray(payload[p])) { for (let index = 0; index < payload[p].length; index++) { let param = payload[p][index];
                            query.push(encodeURIComponent(p + '[]') + "=" + encodeURIComponent(param)) } } else { query.push(encodeURIComponent(p) + "=" + encodeURIComponent(payload[p])) } }
                query = query.join("&");
                return config.endpoint + path + ((query) ? '?' + query : '')
            },
            getCreditCard: function(code, width = 100, height = 100, quality = 100) {
                if (code === undefined) { throw new Error('Missing required parameter: "code"') }
                let path = '/avatars/credit-cards/{code}'.replace(new RegExp('{code}', 'g'), code);
                let payload = {};
                if (width) { payload.width = width }
                if (height) { payload.height = height }
                if (quality) { payload.quality = quality }
                payload.project = config.project;
                let query = [];
                for (let p in payload) { if (Array.isArray(payload[p])) { for (let index = 0; index < payload[p].length; index++) { let param = payload[p][index];
                            query.push(encodeURIComponent(p + '[]') + "=" + encodeURIComponent(param)) } } else { query.push(encodeURIComponent(p) + "=" + encodeURIComponent(payload[p])) } }
                query = query.join("&");
                return config.endpoint + path + ((query) ? '?' + query : '')
            },
            getFavicon: function(url) {
                if (url === undefined) { throw new Error('Missing required parameter: "url"') }
                let path = '/avatars/favicon';
                let payload = {};
                if (url) { payload.url = url }
                payload.project = config.project;
                let query = [];
                for (let p in payload) { if (Array.isArray(payload[p])) { for (let index = 0; index < payload[p].length; index++) { let param = payload[p][index];
                            query.push(encodeURIComponent(p + '[]') + "=" + encodeURIComponent(param)) } } else { query.push(encodeURIComponent(p) + "=" + encodeURIComponent(payload[p])) } }
                query = query.join("&");
                return config.endpoint + path + ((query) ? '?' + query : '')
            },
            getFlag: function(code, width = 100, height = 100, quality = 100) {
                if (code === undefined) { throw new Error('Missing required parameter: "code"') }
                let path = '/avatars/flags/{code}'.replace(new RegExp('{code}', 'g'), code);
                let payload = {};
                if (width) { payload.width = width }
                if (height) { payload.height = height }
                if (quality) { payload.quality = quality }
                payload.project = config.project;
                let query = [];
                for (let p in payload) { if (Array.isArray(payload[p])) { for (let index = 0; index < payload[p].length; index++) { let param = payload[p][index];
                            query.push(encodeURIComponent(p + '[]') + "=" + encodeURIComponent(param)) } } else { query.push(encodeURIComponent(p) + "=" + encodeURIComponent(payload[p])) } }
                query = query.join("&");
                return config.endpoint + path + ((query) ? '?' + query : '')
            },
            getImage: function(url, width = 400, height = 400) {
                if (url === undefined) { throw new Error('Missing required parameter: "url"') }
                let path = '/avatars/image';
                let payload = {};
                if (url) { payload.url = url }
                if (width) { payload.width = width }
                if (height) { payload.height = height }
                payload.project = config.project;
                let query = [];
                for (let p in payload) { if (Array.isArray(payload[p])) { for (let index = 0; index < payload[p].length; index++) { let param = payload[p][index];
                            query.push(encodeURIComponent(p + '[]') + "=" + encodeURIComponent(param)) } } else { query.push(encodeURIComponent(p) + "=" + encodeURIComponent(payload[p])) } }
                query = query.join("&");
                return config.endpoint + path + ((query) ? '?' + query : '')
            },
            getInitials: function(name = '', width = 500, height = 500, color = '', background = '') {
                let path = '/avatars/initials';
                let payload = {};
                if (name) { payload.name = name }
                if (width) { payload.width = width }
                if (height) { payload.height = height }
                if (color) { payload.color = color }
                if (background) { payload.background = background }
                payload.project = config.project;
                let query = [];
                for (let p in payload) { if (Array.isArray(payload[p])) { for (let index = 0; index < payload[p].length; index++) { let param = payload[p][index];
                            query.push(encodeURIComponent(p + '[]') + "=" + encodeURIComponent(param)) } } else { query.push(encodeURIComponent(p) + "=" + encodeURIComponent(payload[p])) } }
                query = query.join("&");
                return config.endpoint + path + ((query) ? '?' + query : '')
            },
            getQR: function(text, size = 400, margin = 1, download = !1) {
                if (text === undefined) { throw new Error('Missing required parameter: "text"') }
                let path = '/avatars/qr';
                let payload = {};
                if (text) { payload.text = text }
                if (size) { payload.size = size }
                if (margin) { payload.margin = margin }
                if (download) { payload.download = download }
                payload.project = config.project;
                let query = [];
                for (let p in payload) { if (Array.isArray(payload[p])) { for (let index = 0; index < payload[p].length; index++) { let param = payload[p][index];
                            query.push(encodeURIComponent(p + '[]') + "=" + encodeURIComponent(param)) } } else { query.push(encodeURIComponent(p) + "=" + encodeURIComponent(payload[p])) } }
                query = query.join("&");
                return config.endpoint + path + ((query) ? '?' + query : '')
            }
        };
        let database = {
            listDocuments: function(collectionId, filters = [], limit = 25, offset = 0, orderField = '', orderType = 'ASC', orderCast = 'string', search = '') {
                if (collectionId === undefined) { throw new Error('Missing required parameter: "collectionId"') }
                let path = '/database/collections/{collectionId}/documents'.replace(new RegExp('{collectionId}', 'g'), collectionId);
                let payload = {};
                if (filters) { payload.filters = filters }
                if (limit) { payload.limit = limit }
                if (offset) { payload.offset = offset }
                if (orderField) { payload.orderField = orderField }
                if (orderType) { payload.orderType = orderType }
                if (orderCast) { payload.orderCast = orderCast }
                if (search) { payload.search = search }
                return http.get(path, { 'content-type': 'application/json', }, payload)
            },
            createDocument: function(collectionId, data, read, write, parentDocument = '', parentProperty = '', parentPropertyType = 'assign') {
                if (collectionId === undefined) { throw new Error('Missing required parameter: "collectionId"') }
                if (data === undefined) { throw new Error('Missing required parameter: "data"') }
                if (read === undefined) { throw new Error('Missing required parameter: "read"') }
                if (write === undefined) { throw new Error('Missing required parameter: "write"') }
                let path = '/database/collections/{collectionId}/documents'.replace(new RegExp('{collectionId}', 'g'), collectionId);
                let payload = {};
                if (data) { payload.data = data }
                if (read) { payload.read = read }
                if (write) { payload.write = write }
                if (parentDocument) { payload.parentDocument = parentDocument }
                if (parentProperty) { payload.parentProperty = parentProperty }
                if (parentPropertyType) { payload.parentPropertyType = parentPropertyType }
                return http.post(path, { 'content-type': 'application/json', }, payload)
            },
            getDocument: function(collectionId, documentId) {
                if (collectionId === undefined) { throw new Error('Missing required parameter: "collectionId"') }
                if (documentId === undefined) { throw new Error('Missing required parameter: "documentId"') }
                let path = '/database/collections/{collectionId}/documents/{documentId}'.replace(new RegExp('{collectionId}', 'g'), collectionId).replace(new RegExp('{documentId}', 'g'), documentId);
                let payload = {};
                return http.get(path, { 'content-type': 'application/json', }, payload)
            },
            updateDocument: function(collectionId, documentId, data, read, write) {
                if (collectionId === undefined) { throw new Error('Missing required parameter: "collectionId"') }
                if (documentId === undefined) { throw new Error('Missing required parameter: "documentId"') }
                if (data === undefined) { throw new Error('Missing required parameter: "data"') }
                if (read === undefined) { throw new Error('Missing required parameter: "read"') }
                if (write === undefined) { throw new Error('Missing required parameter: "write"') }
                let path = '/database/collections/{collectionId}/documents/{documentId}'.replace(new RegExp('{collectionId}', 'g'), collectionId).replace(new RegExp('{documentId}', 'g'), documentId);
                let payload = {};
                if (data) { payload.data = data }
                if (read) { payload.read = read }
                if (write) { payload.write = write }
                return http.patch(path, { 'content-type': 'application/json', }, payload)
            },
            deleteDocument: function(collectionId, documentId) {
                if (collectionId === undefined) { throw new Error('Missing required parameter: "collectionId"') }
                if (documentId === undefined) { throw new Error('Missing required parameter: "documentId"') }
                let path = '/database/collections/{collectionId}/documents/{documentId}'.replace(new RegExp('{collectionId}', 'g'), collectionId).replace(new RegExp('{documentId}', 'g'), documentId);
                let payload = {};
                return http.delete(path, { 'content-type': 'application/json', }, payload)
            }
        };
        let functions = {
            listExecutions: function(functionId, search = '', limit = 25, offset = 0, orderType = 'ASC') {
                if (functionId === undefined) { throw new Error('Missing required parameter: "functionId"') }
                let path = '/functions/{functionId}/executions'.replace(new RegExp('{functionId}', 'g'), functionId);
                let payload = {};
                if (search) { payload.search = search }
                if (limit) { payload.limit = limit }
                if (offset) { payload.offset = offset }
                if (orderType) { payload.orderType = orderType }
                return http.get(path, { 'content-type': 'application/json', }, payload)
            },
            createExecution: function(functionId) {
                if (functionId === undefined) { throw new Error('Missing required parameter: "functionId"') }
                let path = '/functions/{functionId}/executions'.replace(new RegExp('{functionId}', 'g'), functionId);
                let payload = {};
                return http.post(path, { 'content-type': 'application/json', }, payload)
            },
            getExecution: function(functionId, executionId) {
                if (functionId === undefined) { throw new Error('Missing required parameter: "functionId"') }
                if (executionId === undefined) { throw new Error('Missing required parameter: "executionId"') }
                let path = '/functions/{functionId}/executions/{executionId}'.replace(new RegExp('{functionId}', 'g'), functionId).replace(new RegExp('{executionId}', 'g'), executionId);
                let payload = {};
                return http.get(path, { 'content-type': 'application/json', }, payload)
            }
        };
        let locale = { get: function() { let path = '/locale'; let payload = {}; return http.get(path, { 'content-type': 'application/json', }, payload) }, getContinents: function() { let path = '/locale/continents'; let payload = {}; return http.get(path, { 'content-type': 'application/json', }, payload) }, getCountries: function() { let path = '/locale/countries'; let payload = {}; return http.get(path, { 'content-type': 'application/json', }, payload) }, getCountriesEU: function() { let path = '/locale/countries/eu'; let payload = {}; return http.get(path, { 'content-type': 'application/json', }, payload) }, getCountriesPhones: function() { let path = '/locale/countries/phones'; let payload = {}; return http.get(path, { 'content-type': 'application/json', }, payload) }, getCurrencies: function() { let path = '/locale/currencies'; let payload = {}; return http.get(path, { 'content-type': 'application/json', }, payload) }, getLanguages: function() { let path = '/locale/languages'; let payload = {}; return http.get(path, { 'content-type': 'application/json', }, payload) } };
        let storage = {
            listFiles: function(search = '', limit = 25, offset = 0, orderType = 'ASC') {
                let path = '/storage/files';
                let payload = {};
                if (search) { payload.search = search }
                if (limit) { payload.limit = limit }
                if (offset) { payload.offset = offset }
                if (orderType) { payload.orderType = orderType }
                return http.get(path, { 'content-type': 'application/json', }, payload)
            },
            createFile: function(file, read, write) {
                if (file === undefined) { throw new Error('Missing required parameter: "file"') }
                if (read === undefined) { throw new Error('Missing required parameter: "read"') }
                if (write === undefined) { throw new Error('Missing required parameter: "write"') }
                let path = '/storage/files';
                let payload = {};
                if (file) { payload.file = file }
                if (read) { payload.read = read }
                if (write) { payload.write = write }
                return http.post(path, { 'content-type': 'multipart/form-data', }, payload)
            },
            getFile: function(fileId) {
                if (fileId === undefined) { throw new Error('Missing required parameter: "fileId"') }
                let path = '/storage/files/{fileId}'.replace(new RegExp('{fileId}', 'g'), fileId);
                let payload = {};
                return http.get(path, { 'content-type': 'application/json', }, payload)
            },
            updateFile: function(fileId, read, write) {
                if (fileId === undefined) { throw new Error('Missing required parameter: "fileId"') }
                if (read === undefined) { throw new Error('Missing required parameter: "read"') }
                if (write === undefined) { throw new Error('Missing required parameter: "write"') }
                let path = '/storage/files/{fileId}'.replace(new RegExp('{fileId}', 'g'), fileId);
                let payload = {};
                if (read) { payload.read = read }
                if (write) { payload.write = write }
                return http.put(path, { 'content-type': 'application/json', }, payload)
            },
            deleteFile: function(fileId) {
                if (fileId === undefined) { throw new Error('Missing required parameter: "fileId"') }
                let path = '/storage/files/{fileId}'.replace(new RegExp('{fileId}', 'g'), fileId);
                let payload = {};
                return http.delete(path, { 'content-type': 'application/json', }, payload)
            },
            getFileDownload: function(fileId) {
                if (fileId === undefined) { throw new Error('Missing required parameter: "fileId"') }
                let path = '/storage/files/{fileId}/download'.replace(new RegExp('{fileId}', 'g'), fileId);
                let payload = {};
                payload.project = config.project;
                let query = [];
                for (let p in payload) { if (Array.isArray(payload[p])) { for (let index = 0; index < payload[p].length; index++) { let param = payload[p][index];
                            query.push(encodeURIComponent(p + '[]') + "=" + encodeURIComponent(param)) } } else { query.push(encodeURIComponent(p) + "=" + encodeURIComponent(payload[p])) } }
                query = query.join("&");
                return config.endpoint + path + ((query) ? '?' + query : '')
            },
            getFilePreview: function(fileId, width = 0, height = 0, quality = 100, background = '', output = '') {
                if (fileId === undefined) { throw new Error('Missing required parameter: "fileId"') }
                let path = '/storage/files/{fileId}/preview'.replace(new RegExp('{fileId}', 'g'), fileId);
                let payload = {};
                if (width) { payload.width = width }
                if (height) { payload.height = height }
                if (quality) { payload.quality = quality }
                if (background) { payload.background = background }
                if (output) { payload.output = output }
                payload.project = config.project;
                let query = [];
                for (let p in payload) { if (Array.isArray(payload[p])) { for (let index = 0; index < payload[p].length; index++) { let param = payload[p][index];
                            query.push(encodeURIComponent(p + '[]') + "=" + encodeURIComponent(param)) } } else { query.push(encodeURIComponent(p) + "=" + encodeURIComponent(payload[p])) } }
                query = query.join("&");
                return config.endpoint + path + ((query) ? '?' + query : '')
            },
            getFileView: function(fileId) {
                if (fileId === undefined) { throw new Error('Missing required parameter: "fileId"') }
                let path = '/storage/files/{fileId}/view'.replace(new RegExp('{fileId}', 'g'), fileId);
                let payload = {};
                payload.project = config.project;
                let query = [];
                for (let p in payload) { if (Array.isArray(payload[p])) { for (let index = 0; index < payload[p].length; index++) { let param = payload[p][index];
                            query.push(encodeURIComponent(p + '[]') + "=" + encodeURIComponent(param)) } } else { query.push(encodeURIComponent(p) + "=" + encodeURIComponent(payload[p])) } }
                query = query.join("&");
                return config.endpoint + path + ((query) ? '?' + query : '')
            }
        };
        let teams = {
            list: function(search = '', limit = 25, offset = 0, orderType = 'ASC') {
                let path = '/teams';
                let payload = {};
                if (search) { payload.search = search }
                if (limit) { payload.limit = limit }
                if (offset) { payload.offset = offset }
                if (orderType) { payload.orderType = orderType }
                return http.get(path, { 'content-type': 'application/json', }, payload)
            },
            create: function(name, roles = ["owner"]) {
                if (name === undefined) { throw new Error('Missing required parameter: "name"') }
                let path = '/teams';
                let payload = {};
                if (name) { payload.name = name }
                if (roles) { payload.roles = roles }
                return http.post(path, { 'content-type': 'application/json', }, payload)
            },
            get: function(teamId) {
                if (teamId === undefined) { throw new Error('Missing required parameter: "teamId"') }
                let path = '/teams/{teamId}'.replace(new RegExp('{teamId}', 'g'), teamId);
                let payload = {};
                return http.get(path, { 'content-type': 'application/json', }, payload)
            },
            update: function(teamId, name) {
                if (teamId === undefined) { throw new Error('Missing required parameter: "teamId"') }
                if (name === undefined) { throw new Error('Missing required parameter: "name"') }
                let path = '/teams/{teamId}'.replace(new RegExp('{teamId}', 'g'), teamId);
                let payload = {};
                if (name) { payload.name = name }
                return http.put(path, { 'content-type': 'application/json', }, payload)
            },
            delete: function(teamId) {
                if (teamId === undefined) { throw new Error('Missing required parameter: "teamId"') }
                let path = '/teams/{teamId}'.replace(new RegExp('{teamId}', 'g'), teamId);
                let payload = {};
                return http.delete(path, { 'content-type': 'application/json', }, payload)
            },
            getMemberships: function(teamId, search = '', limit = 25, offset = 0, orderType = 'ASC') {
                if (teamId === undefined) { throw new Error('Missing required parameter: "teamId"') }
                let path = '/teams/{teamId}/memberships'.replace(new RegExp('{teamId}', 'g'), teamId);
                let payload = {};
                if (search) { payload.search = search }
                if (limit) { payload.limit = limit }
                if (offset) { payload.offset = offset }
                if (orderType) { payload.orderType = orderType }
                return http.get(path, { 'content-type': 'application/json', }, payload)
            },
            createMembership: function(teamId, email, roles, url, name = '') {
                if (teamId === undefined) { throw new Error('Missing required parameter: "teamId"') }
                if (email === undefined) { throw new Error('Missing required parameter: "email"') }
                if (roles === undefined) { throw new Error('Missing required parameter: "roles"') }
                if (url === undefined) { throw new Error('Missing required parameter: "url"') }
                let path = '/teams/{teamId}/memberships'.replace(new RegExp('{teamId}', 'g'), teamId);
                let payload = {};
                if (email) { payload.email = email }
                if (name) { payload.name = name }
                if (roles) { payload.roles = roles }
                if (url) { payload.url = url }
                return http.post(path, { 'content-type': 'application/json', }, payload)
            },
            deleteMembership: function(teamId, inviteId) {
                if (teamId === undefined) { throw new Error('Missing required parameter: "teamId"') }
                if (inviteId === undefined) { throw new Error('Missing required parameter: "inviteId"') }
                let path = '/teams/{teamId}/memberships/{inviteId}'.replace(new RegExp('{teamId}', 'g'), teamId).replace(new RegExp('{inviteId}', 'g'), inviteId);
                let payload = {};
                return http.delete(path, { 'content-type': 'application/json', }, payload)
            },
            updateMembershipStatus: function(teamId, inviteId, userId, secret) {
                if (teamId === undefined) { throw new Error('Missing required parameter: "teamId"') }
                if (inviteId === undefined) { throw new Error('Missing required parameter: "inviteId"') }
                if (userId === undefined) { throw new Error('Missing required parameter: "userId"') }
                if (secret === undefined) { throw new Error('Missing required parameter: "secret"') }
                let path = '/teams/{teamId}/memberships/{inviteId}/status'.replace(new RegExp('{teamId}', 'g'), teamId).replace(new RegExp('{inviteId}', 'g'), inviteId);
                let payload = {};
                if (userId) { payload.userId = userId }
                if (secret) { payload.secret = secret }
                return http.patch(path, { 'content-type': 'application/json', }, payload)
            }
        };
        return { setEndpoint: setEndpoint, setProject: setProject, setLocale: setLocale, account: account, avatars: avatars, database: database, functions: functions, locale: locale, storage: storage, teams: teams }
    };
    if (typeof module !== "undefined") { module.exports = window.Appwrite }
})((typeof window !== "undefined") ? window : {})