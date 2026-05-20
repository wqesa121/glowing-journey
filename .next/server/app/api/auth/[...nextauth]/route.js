/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFpQztBQUNRO0FBRXpDLE1BQU1FLFVBQVVGLGdEQUFRQSxDQUFDQyxrREFBV0E7QUFFTyIsInNvdXJjZXMiOlsiRDpcXFByb2plY3Qnc1xcZGlwbG9ta2FcXGFwcFxcYXBpXFxhdXRoXFxbLi4ubmV4dGF1dGhdXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSAnbmV4dC1hdXRoJztcclxuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tICdAL2xpYi9hdXRoJztcclxuXHJcbmNvbnN0IGhhbmRsZXIgPSBOZXh0QXV0aChhdXRoT3B0aW9ucyk7XHJcblxyXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH07XHJcbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsImF1dGhPcHRpb25zIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var _next_auth_mongodb_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @next-auth/mongodb-adapter */ \"(rsc)/./node_modules/@next-auth/mongodb-adapter/dist/index.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _mongoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mongoose */ \"(rsc)/./lib/mongoose.ts\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\nconst authOptions = {\n    adapter: (0,_next_auth_mongodb_adapter__WEBPACK_IMPORTED_MODULE_0__.MongoDBAdapter)(_mongodb__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n    session: {\n        strategy: 'jwt'\n    },\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: 'Credentials',\n            credentials: {\n                email: {\n                    label: 'Email',\n                    type: 'email'\n                },\n                password: {\n                    label: 'Password',\n                    type: 'password'\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials.password) {\n                    return null;\n                }\n                await (0,_mongoose__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n                const db = (mongoose__WEBPACK_IMPORTED_MODULE_5___default().connection).db;\n                const user = await db.collection('users').findOne({\n                    email: credentials.email.toLowerCase()\n                });\n                if (!user || !user.password || user.disabled) {\n                    return null;\n                }\n                const isValid = await bcrypt__WEBPACK_IMPORTED_MODULE_3___default().compare(credentials.password, user.password);\n                if (!isValid) {\n                    return null;\n                }\n                return {\n                    id: user._id.toString(),\n                    name: user.name ?? user.email,\n                    email: user.email,\n                    role: user.role ?? 'user'\n                };\n            }\n        })\n    ],\n    pages: {\n        signIn: '/signin'\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            // attach user id to token on sign in\n            if (user?.id) token.sub = user.id;\n            // attach role from user on sign-in\n            if (user && user.role) {\n                token.role = user.role;\n            }\n            // if token has no role but has sub, fetch from DB\n            if (!token.role && token.sub) {\n                try {\n                    const client = await _mongodb__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\n                    const db = client.db();\n                    const u = await db.collection('users').findOne({\n                        _id: new mongodb__WEBPACK_IMPORTED_MODULE_6__.ObjectId(token.sub)\n                    });\n                    if (u && u.role) token.role = u.role;\n                } catch (e) {\n                // ignore DB errors here\n                }\n            }\n            return token;\n        },\n        async session ({ session, token, user }) {\n            // prefer user.id (first sign-in), otherwise token.sub\n            if (session.user) {\n                session.user.id = user?.id ?? token.sub;\n                // expose role in session\n                session.user.role = token.role ?? 'user';\n            }\n            return session;\n        }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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IjpbIkQ6XFxQcm9qZWN0J3NcXGRpcGxvbWthXFxsaWJcXGF1dGgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9uZ29EQkFkYXB0ZXIgfSBmcm9tICdAbmV4dC1hdXRoL21vbmdvZGItYWRhcHRlcic7XHJcbmltcG9ydCB7IHR5cGUgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSAnbmV4dC1hdXRoJztcclxuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFscyc7XHJcbmltcG9ydCBjbGllbnRQcm9taXNlIGZyb20gJy4vbW9uZ29kYic7XHJcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0JztcclxuaW1wb3J0IGNvbm5lY3RNb25nb29zZSBmcm9tICcuL21vbmdvb3NlJztcclxuaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IHsgT2JqZWN0SWQgfSBmcm9tICdtb25nb2RiJztcclxuXHJcbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xyXG4gIGFkYXB0ZXI6IE1vbmdvREJBZGFwdGVyKGNsaWVudFByb21pc2UpLFxyXG4gIHNlc3Npb246IHtcclxuICAgIHN0cmF0ZWd5OiAnand0J1xyXG4gIH0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcclxuICAgICAgbmFtZTogJ0NyZWRlbnRpYWxzJyxcclxuICAgICAgY3JlZGVudGlhbHM6IHtcclxuICAgICAgICBlbWFpbDogeyBsYWJlbDogJ0VtYWlsJywgdHlwZTogJ2VtYWlsJyB9LFxyXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiAnUGFzc3dvcmQnLCB0eXBlOiAncGFzc3dvcmQnIH1cclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XHJcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzLnBhc3N3b3JkKSB7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IGNvbm5lY3RNb25nb29zZSgpO1xyXG5cclxuICAgICAgICBjb25zdCBkYiA9IG1vbmdvb3NlLmNvbm5lY3Rpb24uZGI7XHJcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oJ3VzZXJzJykuZmluZE9uZSh7XHJcbiAgICAgICAgICBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXVzZXIgfHwgIXVzZXIucGFzc3dvcmQgfHwgdXNlci5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoY3JlZGVudGlhbHMucGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xyXG4gICAgICAgIGlmICghaXNWYWxpZCkge1xyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgaWQ6IHVzZXIuX2lkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUgPz8gdXNlci5lbWFpbCxcclxuICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgcm9sZTogdXNlci5yb2xlID8/ICd1c2VyJ1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgXSxcclxuICBwYWdlczoge1xyXG4gICAgc2lnbkluOiAnL3NpZ25pbidcclxuICB9LFxyXG4gIGNhbGxiYWNrczoge1xyXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xyXG4gICAgICAvLyBhdHRhY2ggdXNlciBpZCB0byB0b2tlbiBvbiBzaWduIGluXHJcbiAgICAgIGlmICh1c2VyPy5pZCkgdG9rZW4uc3ViID0gdXNlci5pZCBhcyBzdHJpbmc7XHJcblxyXG4gICAgICAvLyBhdHRhY2ggcm9sZSBmcm9tIHVzZXIgb24gc2lnbi1pblxyXG4gICAgICBpZiAodXNlciAmJiAodXNlciBhcyBhbnkpLnJvbGUpIHtcclxuICAgICAgICB0b2tlbi5yb2xlID0gKHVzZXIgYXMgYW55KS5yb2xlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBpZiB0b2tlbiBoYXMgbm8gcm9sZSBidXQgaGFzIHN1YiwgZmV0Y2ggZnJvbSBEQlxyXG4gICAgICBpZiAoIXRva2VuLnJvbGUgJiYgdG9rZW4uc3ViKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IGNsaWVudFByb21pc2U7XHJcbiAgICAgICAgICBjb25zdCBkYiA9IGNsaWVudC5kYigpO1xyXG4gICAgICAgICAgY29uc3QgdSA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oJ3VzZXJzJykuZmluZE9uZSh7IF9pZDogbmV3IE9iamVjdElkKHRva2VuLnN1YikgfSk7XHJcbiAgICAgICAgICBpZiAodSAmJiB1LnJvbGUpIHRva2VuLnJvbGUgPSB1LnJvbGU7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgLy8gaWdub3JlIERCIGVycm9ycyBoZXJlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdG9rZW47XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuLCB1c2VyIH0pIHtcclxuICAgICAgLy8gcHJlZmVyIHVzZXIuaWQgKGZpcnN0IHNpZ24taW4pLCBvdGhlcndpc2UgdG9rZW4uc3ViXHJcbiAgICAgIGlmIChzZXNzaW9uLnVzZXIpIHtcclxuICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIGFueSkuaWQgPSB1c2VyPy5pZCA/PyB0b2tlbi5zdWI7XHJcbiAgICAgICAgLy8gZXhwb3NlIHJvbGUgaW4gc2Vzc2lvblxyXG4gICAgICAgIChzZXNzaW9uLnVzZXIgYXMgYW55KS5yb2xlID0gKHRva2VuIGFzIGFueSkucm9sZSA/PyAndXNlcic7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHNlc3Npb247XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG4iXSwibmFtZXMiOlsiTW9uZ29EQkFkYXB0ZXIiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiY2xpZW50UHJvbWlzZSIsImJjcnlwdCIsImNvbm5lY3RNb25nb29zZSIsIm1vbmdvb3NlIiwiT2JqZWN0SWQiLCJhdXRoT3B0aW9ucyIsImFkYXB0ZXIiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiZGIiLCJjb25uZWN0aW9uIiwidXNlciIsImNvbGxlY3Rpb24iLCJmaW5kT25lIiwidG9Mb3dlckNhc2UiLCJkaXNhYmxlZCIsImlzVmFsaWQiLCJjb21wYXJlIiwiaWQiLCJfaWQiLCJ0b1N0cmluZyIsInJvbGUiLCJwYWdlcyIsInNpZ25JbiIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic3ViIiwiY2xpZW50IiwidSIsImUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n\nconst uri = process.env.MONGO_URI;\nif (!uri) {\n    throw new Error('Please define the MONGO_URI environment variable inside .env');\n}\nconst options = {\n    maxPoolSize: 10,\n    serverSelectionTimeoutMS: 5000\n};\nlet client;\nlet clientPromise;\nif (true) {\n    let cached = globalThis;\n    if (!cached._mongoClientPromise) {\n        client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri, options);\n        cached._mongoClientPromise = client.connect().catch((err)=>{\n            console.error('Mongo initial connect error (dev cached):', err);\n            throw err;\n        });\n    }\n    clientPromise = cached._mongoClientPromise;\n} else {}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clientPromise);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0Q7QUFFL0QsTUFBTUMsTUFBTUMsUUFBUUMsR0FBRyxDQUFDQyxTQUFTO0FBRWpDLElBQUksQ0FBQ0gsS0FBSztJQUNSLE1BQU0sSUFBSUksTUFBTTtBQUNsQjtBQUVBLE1BQU1DLFVBQThCO0lBQ2xDQyxhQUFhO0lBQ2JDLDBCQUEwQjtBQUM1QjtBQUVBLElBQUlDO0FBQ0osSUFBSUM7QUFFSixJQUFJUixJQUFzQyxFQUFFO0lBQzFDLElBQUlTLFNBQVNDO0lBQ2IsSUFBSSxDQUFDRCxPQUFPRSxtQkFBbUIsRUFBRTtRQUMvQkosU0FBUyxJQUFJVCxnREFBV0EsQ0FBQ0MsS0FBS0s7UUFDOUJLLE9BQU9FLG1CQUFtQixHQUFHSixPQUFPSyxPQUFPLEdBQUdDLEtBQUssQ0FBQyxDQUFDQztZQUNuREMsUUFBUUMsS0FBSyxDQUFDLDZDQUE2Q0Y7WUFDM0QsTUFBTUE7UUFDUjtJQUNGO0lBQ0FOLGdCQUFnQkMsT0FBT0UsbUJBQW1CO0FBQzVDLE9BQU8sRUFNTjtBQUVELGlFQUFlSCxhQUFhQSxFQUFDIiwic291cmNlcyI6WyJEOlxcUHJvamVjdCdzXFxkaXBsb21rYVxcbGliXFxtb25nb2RiLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvQ2xpZW50LCB0eXBlIE1vbmdvQ2xpZW50T3B0aW9ucyB9IGZyb20gJ21vbmdvZGInO1xyXG5cclxuY29uc3QgdXJpID0gcHJvY2Vzcy5lbnYuTU9OR09fVVJJO1xyXG5cclxuaWYgKCF1cmkpIHtcclxuICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBkZWZpbmUgdGhlIE1PTkdPX1VSSSBlbnZpcm9ubWVudCB2YXJpYWJsZSBpbnNpZGUgLmVudicpO1xyXG59XHJcblxyXG5jb25zdCBvcHRpb25zOiBNb25nb0NsaWVudE9wdGlvbnMgPSB7XHJcbiAgbWF4UG9vbFNpemU6IDEwLFxyXG4gIHNlcnZlclNlbGVjdGlvblRpbWVvdXRNUzogNTAwMFxyXG59O1xyXG5cclxubGV0IGNsaWVudDogTW9uZ29DbGllbnQ7XHJcbmxldCBjbGllbnRQcm9taXNlOiBQcm9taXNlPE1vbmdvQ2xpZW50PjtcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gIGxldCBjYWNoZWQgPSBnbG9iYWxUaGlzIGFzIHR5cGVvZiBnbG9iYWxUaGlzICYgeyBfbW9uZ29DbGllbnRQcm9taXNlPzogUHJvbWlzZTxNb25nb0NsaWVudD4gfTtcclxuICBpZiAoIWNhY2hlZC5fbW9uZ29DbGllbnRQcm9taXNlKSB7XHJcbiAgICBjbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodXJpLCBvcHRpb25zKTtcclxuICAgIGNhY2hlZC5fbW9uZ29DbGllbnRQcm9taXNlID0gY2xpZW50LmNvbm5lY3QoKS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ01vbmdvIGluaXRpYWwgY29ubmVjdCBlcnJvciAoZGV2IGNhY2hlZCk6JywgZXJyKTtcclxuICAgICAgdGhyb3cgZXJyO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGNsaWVudFByb21pc2UgPSBjYWNoZWQuX21vbmdvQ2xpZW50UHJvbWlzZTtcclxufSBlbHNlIHtcclxuICBjbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodXJpLCBvcHRpb25zKTtcclxuICBjbGllbnRQcm9taXNlID0gY2xpZW50LmNvbm5lY3QoKS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdNb25nbyBpbml0aWFsIGNvbm5lY3QgZXJyb3I6JywgZXJyKTtcclxuICAgIHRocm93IGVycjtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xpZW50UHJvbWlzZTtcclxuIl0sIm5hbWVzIjpbIk1vbmdvQ2xpZW50IiwidXJpIiwicHJvY2VzcyIsImVudiIsIk1PTkdPX1VSSSIsIkVycm9yIiwib3B0aW9ucyIsIm1heFBvb2xTaXplIiwic2VydmVyU2VsZWN0aW9uVGltZW91dE1TIiwiY2xpZW50IiwiY2xpZW50UHJvbWlzZSIsImNhY2hlZCIsImdsb2JhbFRoaXMiLCJfbW9uZ29DbGllbnRQcm9taXNlIiwiY29ubmVjdCIsImNhdGNoIiwiZXJyIiwiY29uc29sZSIsImVycm9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongoose.ts":
/*!*************************!*\
  !*** ./lib/mongoose.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGO_URI = process.env.MONGO_URI;\nif (!MONGO_URI) {\n    throw new Error('Missing MONGO_URI environment variable');\n}\nlet cached = globalThis;\nif (!cached.mongoose) {\n    cached.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function connectMongoose() {\n    if (cached.mongoose && cached.mongoose.conn) {\n        return cached.mongoose.conn;\n    }\n    // Try primary MONGO_URI first\n    if (!cached.mongoose.promise) {\n        cached.mongoose.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGO_URI).then((mongooseInstance)=>mongooseInstance);\n    }\n    try {\n        cached.mongoose.conn = await cached.mongoose.promise;\n        return cached.mongoose.conn;\n    } catch (err) {\n        console.error('Mongoose initial connection error:', err && err.message ? err.message : err);\n        // If the error is DNS SRV related (common on some Windows/DNS setups),\n        // allow an optional non-SRV fallback via MONGO_NON_SRV env var.\n        const nonSrv = process.env.MONGO_NON_SRV;\n        const isSrvDnsError = err && (err.code === 'ECONNREFUSED' || err.syscall === 'querySrv');\n        if (isSrvDnsError && nonSrv) {\n            console.info('Attempting fallback to MONGO_NON_SRV...');\n            // Replace the cached promise with a new attempt using non-SRV string\n            cached.mongoose.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(nonSrv).then((mongooseInstance)=>mongooseInstance);\n            cached.mongoose.conn = await cached.mongoose.promise;\n            return cached.mongoose.conn;\n        }\n        // Otherwise rethrow so the server can fail loudly for debugging\n        throw err;\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectMongoose);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29vc2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLFlBQVlDLFFBQVFDLEdBQUcsQ0FBQ0YsU0FBUztBQUV2QyxJQUFJLENBQUNBLFdBQVc7SUFDZCxNQUFNLElBQUlHLE1BQU07QUFDbEI7QUFFQSxJQUFJQyxTQUFjQztBQUVsQixJQUFJLENBQUNELE9BQU9MLFFBQVEsRUFBRTtJQUNwQkssT0FBT0wsUUFBUSxHQUFHO1FBQUVPLE1BQU07UUFBTUMsU0FBUztJQUFLO0FBQ2hEO0FBRUEsZUFBZUM7SUFDYixJQUFJSixPQUFPTCxRQUFRLElBQUlLLE9BQU9MLFFBQVEsQ0FBQ08sSUFBSSxFQUFFO1FBQzNDLE9BQU9GLE9BQU9MLFFBQVEsQ0FBQ08sSUFBSTtJQUM3QjtJQUVBLDhCQUE4QjtJQUM5QixJQUFJLENBQUNGLE9BQU9MLFFBQVEsQ0FBQ1EsT0FBTyxFQUFFO1FBQzVCSCxPQUFPTCxRQUFRLENBQUNRLE9BQU8sR0FBR1IsdURBQWdCLENBQUNDLFdBQVlVLElBQUksQ0FBQyxDQUFDQyxtQkFBcUJBO0lBQ3BGO0lBRUEsSUFBSTtRQUNGUCxPQUFPTCxRQUFRLENBQUNPLElBQUksR0FBRyxNQUFNRixPQUFPTCxRQUFRLENBQUNRLE9BQU87UUFDcEQsT0FBT0gsT0FBT0wsUUFBUSxDQUFDTyxJQUFJO0lBQzdCLEVBQUUsT0FBT00sS0FBVTtRQUNqQkMsUUFBUUMsS0FBSyxDQUFDLHNDQUFzQ0YsT0FBT0EsSUFBSUcsT0FBTyxHQUFHSCxJQUFJRyxPQUFPLEdBQUdIO1FBRXZGLHVFQUF1RTtRQUN2RSxnRUFBZ0U7UUFDaEUsTUFBTUksU0FBU2YsUUFBUUMsR0FBRyxDQUFDZSxhQUFhO1FBQ3hDLE1BQU1DLGdCQUFnQk4sT0FBUUEsQ0FBQUEsSUFBSU8sSUFBSSxLQUFLLGtCQUFrQlAsSUFBSVEsT0FBTyxLQUFLLFVBQVM7UUFFdEYsSUFBSUYsaUJBQWlCRixRQUFRO1lBQzNCSCxRQUFRUSxJQUFJLENBQUM7WUFDYixxRUFBcUU7WUFDckVqQixPQUFPTCxRQUFRLENBQUNRLE9BQU8sR0FBR1IsdURBQWdCLENBQUNpQixRQUFTTixJQUFJLENBQUMsQ0FBQ0MsbUJBQXFCQTtZQUMvRVAsT0FBT0wsUUFBUSxDQUFDTyxJQUFJLEdBQUcsTUFBTUYsT0FBT0wsUUFBUSxDQUFDUSxPQUFPO1lBQ3BELE9BQU9ILE9BQU9MLFFBQVEsQ0FBQ08sSUFBSTtRQUM3QjtRQUVBLGdFQUFnRTtRQUNoRSxNQUFNTTtJQUNSO0FBQ0Y7QUFFQSxpRUFBZUosZUFBZUEsRUFBQyIsInNvdXJjZXMiOlsiRDpcXFByb2plY3Qnc1xcZGlwbG9ta2FcXGxpYlxcbW9uZ29vc2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuXHJcbmNvbnN0IE1PTkdPX1VSSSA9IHByb2Nlc3MuZW52Lk1PTkdPX1VSSTtcclxuXHJcbmlmICghTU9OR09fVVJJKSB7XHJcbiAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIE1PTkdPX1VSSSBlbnZpcm9ubWVudCB2YXJpYWJsZScpO1xyXG59XHJcblxyXG5sZXQgY2FjaGVkOiBhbnkgPSBnbG9iYWxUaGlzIGFzIGFueTtcclxuXHJcbmlmICghY2FjaGVkLm1vbmdvb3NlKSB7XHJcbiAgY2FjaGVkLm1vbmdvb3NlID0geyBjb25uOiBudWxsLCBwcm9taXNlOiBudWxsIH07XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNvbm5lY3RNb25nb29zZSgpIHtcclxuICBpZiAoY2FjaGVkLm1vbmdvb3NlICYmIGNhY2hlZC5tb25nb29zZS5jb25uKSB7XHJcbiAgICByZXR1cm4gY2FjaGVkLm1vbmdvb3NlLmNvbm47XHJcbiAgfVxyXG5cclxuICAvLyBUcnkgcHJpbWFyeSBNT05HT19VUkkgZmlyc3RcclxuICBpZiAoIWNhY2hlZC5tb25nb29zZS5wcm9taXNlKSB7XHJcbiAgICBjYWNoZWQubW9uZ29vc2UucHJvbWlzZSA9IG1vbmdvb3NlLmNvbm5lY3QoTU9OR09fVVJJISkudGhlbigobW9uZ29vc2VJbnN0YW5jZSkgPT4gbW9uZ29vc2VJbnN0YW5jZSk7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgY2FjaGVkLm1vbmdvb3NlLmNvbm4gPSBhd2FpdCBjYWNoZWQubW9uZ29vc2UucHJvbWlzZTtcclxuICAgIHJldHVybiBjYWNoZWQubW9uZ29vc2UuY29ubjtcclxuICB9IGNhdGNoIChlcnI6IGFueSkge1xyXG4gICAgY29uc29sZS5lcnJvcignTW9uZ29vc2UgaW5pdGlhbCBjb25uZWN0aW9uIGVycm9yOicsIGVyciAmJiBlcnIubWVzc2FnZSA/IGVyci5tZXNzYWdlIDogZXJyKTtcclxuXHJcbiAgICAvLyBJZiB0aGUgZXJyb3IgaXMgRE5TIFNSViByZWxhdGVkIChjb21tb24gb24gc29tZSBXaW5kb3dzL0ROUyBzZXR1cHMpLFxyXG4gICAgLy8gYWxsb3cgYW4gb3B0aW9uYWwgbm9uLVNSViBmYWxsYmFjayB2aWEgTU9OR09fTk9OX1NSViBlbnYgdmFyLlxyXG4gICAgY29uc3Qgbm9uU3J2ID0gcHJvY2Vzcy5lbnYuTU9OR09fTk9OX1NSVjtcclxuICAgIGNvbnN0IGlzU3J2RG5zRXJyb3IgPSBlcnIgJiYgKGVyci5jb2RlID09PSAnRUNPTk5SRUZVU0VEJyB8fCBlcnIuc3lzY2FsbCA9PT0gJ3F1ZXJ5U3J2Jyk7XHJcblxyXG4gICAgaWYgKGlzU3J2RG5zRXJyb3IgJiYgbm9uU3J2KSB7XHJcbiAgICAgIGNvbnNvbGUuaW5mbygnQXR0ZW1wdGluZyBmYWxsYmFjayB0byBNT05HT19OT05fU1JWLi4uJyk7XHJcbiAgICAgIC8vIFJlcGxhY2UgdGhlIGNhY2hlZCBwcm9taXNlIHdpdGggYSBuZXcgYXR0ZW1wdCB1c2luZyBub24tU1JWIHN0cmluZ1xyXG4gICAgICBjYWNoZWQubW9uZ29vc2UucHJvbWlzZSA9IG1vbmdvb3NlLmNvbm5lY3Qobm9uU3J2ISkudGhlbigobW9uZ29vc2VJbnN0YW5jZSkgPT4gbW9uZ29vc2VJbnN0YW5jZSk7XHJcbiAgICAgIGNhY2hlZC5tb25nb29zZS5jb25uID0gYXdhaXQgY2FjaGVkLm1vbmdvb3NlLnByb21pc2U7XHJcbiAgICAgIHJldHVybiBjYWNoZWQubW9uZ29vc2UuY29ubjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPdGhlcndpc2UgcmV0aHJvdyBzbyB0aGUgc2VydmVyIGNhbiBmYWlsIGxvdWRseSBmb3IgZGVidWdnaW5nXHJcbiAgICB0aHJvdyBlcnI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0TW9uZ29vc2U7XHJcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIk1PTkdPX1VSSSIsInByb2Nlc3MiLCJlbnYiLCJFcnJvciIsImNhY2hlZCIsImdsb2JhbFRoaXMiLCJjb25uIiwicHJvbWlzZSIsImNvbm5lY3RNb25nb29zZSIsImNvbm5lY3QiLCJ0aGVuIiwibW9uZ29vc2VJbnN0YW5jZSIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsIm1lc3NhZ2UiLCJub25TcnYiLCJNT05HT19OT05fU1JWIiwiaXNTcnZEbnNFcnJvciIsImNvZGUiLCJzeXNjYWxsIiwiaW5mbyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongoose.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CProject's%5Cdiplomka%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CProject's%5Cdiplomka&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CProject's%5Cdiplomka%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CProject's%5Cdiplomka&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_Project_s_diplomka_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"D:\\\\Project's\\\\diplomka\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_Project_s_diplomka_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDUHJvamVjdCdzJTVDZGlwbG9ta2ElNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUQlM0ElNUNQcm9qZWN0J3MlNUNkaXBsb21rYSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDZ0I7QUFDN0Y7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkQ6XFxcXFByb2plY3Qnc1xcXFxkaXBsb21rYVxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJEOlxcXFxQcm9qZWN0J3NcXFxcZGlwbG9ta2FcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CProject's%5Cdiplomka%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CProject's%5Cdiplomka&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongodb");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/@next-auth","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CProject's%5Cdiplomka%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CProject's%5Cdiplomka&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();