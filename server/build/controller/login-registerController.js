"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var bcrypt = require('bcryptjs');
var db = require('../models/index.js');
var validator = require('validator');
var _require = require('../middleware/authentication.js'),
  createJWT = _require.createJWT;
var User = db.User;
var Role = db.Role;
var salt = bcrypt.genSaltSync(10);
var hashUserPassword = function hashUserPassword(userPassword) {
  return bcrypt.hashSync(userPassword, salt);
};
var checkEmailExist = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(userEmail) {
    var user;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return User.findOne({
            where: {
              email: userEmail
            }
          });
        case 2:
          user = _context.sent;
          if (!user) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", true);
        case 7:
          return _context.abrupt("return", false);
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function checkEmailExist(_x) {
    return _ref.apply(this, arguments);
  };
}();
var checkPhoneExist = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(userPhone) {
    var user;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return User.findOne({
            where: {
              phone: userPhone
            }
          });
        case 2:
          user = _context2.sent;
          if (!user) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", true);
        case 7:
          return _context2.abrupt("return", false);
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function checkPhoneExist(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var checkIdExist = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(id) {
    var user;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return User.findOne({
            where: {
              id: id
            }
          });
        case 2:
          user = _context3.sent;
          if (!user) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", true);
        case 7:
          return _context3.abrupt("return", false);
        case 8:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function checkIdExist(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var registerNewUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body, id, first_name, last_name, phone, email, password, address, dob, major_id, role_id, profileImage, idExisted, emailExisted, phoneExisted, isValidEmail, hashedPassword;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body = req.body, id = _req$body.id, first_name = _req$body.first_name, last_name = _req$body.last_name, phone = _req$body.phone, email = _req$body.email, password = _req$body.password, address = _req$body.address, dob = _req$body.dob, major_id = _req$body.major_id, role_id = _req$body.role_id;
          profileImage = req.file;
          if (!(!id || !first_name || !last_name || !phone || !password || !address || !dob || !major_id || !role_id)) {
            _context4.next = 5;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            EC: 3,
            EM: 'Please enter all necessary information',
            DT: ''
          }));
        case 5:
          _context4.next = 7;
          return checkIdExist(id);
        case 7:
          idExisted = _context4.sent;
          if (!idExisted) {
            _context4.next = 10;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            EC: 3,
            EM: 'ID existed in server',
            DT: ''
          }));
        case 10:
          _context4.next = 12;
          return checkEmailExist(email);
        case 12:
          emailExisted = _context4.sent;
          if (!emailExisted) {
            _context4.next = 15;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            EC: 3,
            EM: 'Email existed in server',
            DT: ''
          }));
        case 15:
          _context4.next = 17;
          return checkPhoneExist(phone);
        case 17:
          phoneExisted = _context4.sent;
          if (!phoneExisted) {
            _context4.next = 20;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            EC: 3,
            EM: 'Phone existed in server',
            DT: ''
          }));
        case 20:
          //check valid email
          isValidEmail = validator.isEmail(email);
          if (isValidEmail) {
            _context4.next = 23;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            EC: 3,
            EM: 'Invalid email',
            DT: ''
          }));
        case 23:
          if (!(password.length < 6)) {
            _context4.next = 25;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            EC: 3,
            EM: 'Length of password must more than 6 letters',
            DT: ''
          }));
        case 25:
          hashedPassword = hashUserPassword(password);
          _context4.next = 28;
          return User.create(_objectSpread(_objectSpread({}, req.body), {}, {
            password: hashedPassword,
            profileImage: profileImage.filename
          }));
        case 28:
          return _context4.abrupt("return", res.status(201).json({
            EC: 0,
            EM: 'Create user successful',
            DT: ''
          }));
        case 31:
          _context4.prev = 31;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            EC: 1,
            EM: 'Error from server',
            DT: ''
          }));
        case 35:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 31]]);
  }));
  return function registerNewUser(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();
var checkPassword = function checkPassword(inputPassword, hashPassword) {
  return bcrypt.compareSync(inputPassword, hashPassword);
};
var loginUser = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body2, email, password, user, isCorrectPassword, payload, token;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context5.next = 4;
          return User.findOne({
            where: {
              email: email
            },
            include: {
              model: Role,
              attributes: ['name']
            }
          });
        case 4:
          user = _context5.sent;
          if (!user) {
            _context5.next = 13;
            break;
          }
          //check password
          isCorrectPassword = checkPassword(password, user.password);
          if (isCorrectPassword) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", res.status(200).json({
            EC: 2,
            EM: 'Wrong email or password',
            DT: ''
          }));
        case 9:
          payload = {
            id: user.id,
            last_name: user.last_name,
            first_name: user.first_name,
            email: user.email,
            address: user.address,
            role: user.Role.name
          };
          token = createJWT(payload);
          res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
          });
          return _context5.abrupt("return", res.status(200).json({
            EC: 0,
            EM: 'Login successful',
            DT: {
              token: token
            }
          }));
        case 13:
          return _context5.abrupt("return", res.status(200).json({
            EC: 2,
            EM: 'Wrong email or password',
            DT: ''
          }));
        case 16:
          _context5.prev = 16;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            EC: 1,
            EM: 'Error from server',
            DT: ''
          }));
        case 20:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 16]]);
  }));
  return function loginUser(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();
var logoutUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          res.clearCookie("token");
          return _context6.abrupt("return", res.status(200).json({
            EC: 0,
            EM: 'Log out succeed',
            DT: ''
          }));
        case 5:
          _context6.prev = 5;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          return _context6.abrupt("return", res.status(500).json({
            EC: '1',
            EM: 'Error from server',
            DT: ''
          }));
        case 9:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 5]]);
  }));
  return function logoutUser(_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();
module.exports = {
  registerNewUser: registerNewUser,
  checkEmailExist: checkEmailExist,
  checkPhoneExist: checkPhoneExist,
  loginUser: loginUser,
  logoutUser: logoutUser
};