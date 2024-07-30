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
var db = require('../models/index.js');
var _require = require("sequelize"),
  Op = _require.Op;
var Enrollment = db.Enrollment;
var User = db.User;
var Subject = db.Subject;
var Semester = db.Semester;
var Role = db.Role;
var postCreateEnrollment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, user_id, subject_id, semester_id, enrollmentExisted;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, user_id = _req$body.user_id, subject_id = _req$body.subject_id, semester_id = _req$body.semester_id;
          if (!(!user_id || !subject_id || !semester_id || semester_id == '0')) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            EC: 3,
            EM: 'Please enter all necessary information',
            DT: ''
          }));
        case 4:
          _context.next = 6;
          return Enrollment.findOne({
            where: {
              user_id: user_id,
              subject_id: subject_id,
              semester_id: semester_id
            }
          });
        case 6:
          enrollmentExisted = _context.sent;
          if (!enrollmentExisted) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            EC: 1,
            EM: 'You already add this subject to learn list',
            DT: ''
          }));
        case 9:
          _context.next = 11;
          return Enrollment.create(req.body);
        case 11:
          return _context.abrupt("return", res.status(200).json({
            EC: 0,
            EM: 'Create enrollment successful',
            DT: ''
          }));
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            EC: 1,
            EM: 'Error from server',
            DT: ''
          }));
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 14]]);
  }));
  return function postCreateEnrollment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var putUpdateScore = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, user_id, subject_id, semester_id, score, studentExisted, subjectExisted;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, user_id = _req$body2.user_id, subject_id = _req$body2.subject_id, semester_id = _req$body2.semester_id, score = _req$body2.score;
          if (!(!user_id || !subject_id || !semester_id || !score)) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(200).json({
            EC: 3,
            EM: 'Please enter all necessary information',
            DT: ''
          }));
        case 4:
          _context2.next = 6;
          return User.findOne({
            where: {
              id: user_id
            }
          });
        case 6:
          studentExisted = _context2.sent;
          if (studentExisted) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", res.status(200).json({
            EC: 2,
            EM: 'Not found student',
            DT: ''
          }));
        case 9:
          _context2.next = 11;
          return Subject.findOne({
            where: {
              id: subject_id
            }
          });
        case 11:
          subjectExisted = _context2.sent;
          if (subjectExisted) {
            _context2.next = 14;
            break;
          }
          return _context2.abrupt("return", res.status(200).json({
            EC: 2,
            EM: 'Not found subject',
            DT: ''
          }));
        case 14:
          if (!(score >= 4)) {
            _context2.next = 19;
            break;
          }
          _context2.next = 17;
          return Enrollment.update({
            completed: true
          }, {
            where: {
              user_id: user_id,
              subject_id: subject_id,
              semester_id: semester_id
            }
          });
        case 17:
          _context2.next = 21;
          break;
        case 19:
          _context2.next = 21;
          return Enrollment.update({
            completed: false
          }, {
            where: {
              user_id: user_id,
              subject_id: subject_id,
              semester_id: semester_id
            }
          });
        case 21:
          _context2.next = 23;
          return Enrollment.update({
            score: score
          }, {
            where: {
              user_id: user_id,
              subject_id: subject_id,
              semester_id: semester_id
            }
          });
        case 23:
          return _context2.abrupt("return", res.status(200).json({
            EC: 0,
            EM: 'Update score successful',
            DT: ''
          }));
        case 26:
          _context2.prev = 26;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            EC: 1,
            EM: 'Error from server',
            DT: ''
          }));
        case 30:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 26]]);
  }));
  return function putUpdateScore(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var putUpdateAttendance = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body3, day, isAttendance, user_id, subject_id, semester_id, studentExisted, subjectExisted, enrollment, lastAttendance, newAttendance;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body3 = req.body, day = _req$body3.day, isAttendance = _req$body3.isAttendance, user_id = _req$body3.user_id, subject_id = _req$body3.subject_id, semester_id = _req$body3.semester_id;
          if (!(!user_id || !subject_id || !semester_id || !day || !isAttendance)) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", res.status(200).json({
            EC: 3,
            EM: 'Please enter all necessary information',
            DT: ''
          }));
        case 4:
          _context3.next = 6;
          return User.findOne({
            where: {
              id: user_id
            }
          });
        case 6:
          studentExisted = _context3.sent;
          if (studentExisted) {
            _context3.next = 9;
            break;
          }
          return _context3.abrupt("return", res.status(200).json({
            EC: 2,
            EM: 'Not found student',
            DT: ''
          }));
        case 9:
          _context3.next = 11;
          return Subject.findOne({
            where: {
              id: subject_id
            }
          });
        case 11:
          subjectExisted = _context3.sent;
          if (subjectExisted) {
            _context3.next = 14;
            break;
          }
          return _context3.abrupt("return", res.status(200).json({
            EC: 2,
            EM: 'Not found subject',
            DT: ''
          }));
        case 14:
          _context3.next = 16;
          return Enrollment.findOne({
            where: {
              user_id: user_id,
              subject_id: subject_id,
              semester_id: semester_id
            }
          });
        case 16:
          enrollment = _context3.sent;
          lastAttendance = JSON.parse(enrollment === null || enrollment === void 0 ? void 0 : enrollment.attendance);
          newAttendance = _objectSpread({}, lastAttendance);
          newAttendance[day] = isAttendance;
          _context3.next = 22;
          return Enrollment.update({
            attendance: JSON.stringify(newAttendance)
          }, {
            where: {
              user_id: user_id,
              subject_id: subject_id,
              semester_id: semester_id
            }
          });
        case 22:
          return _context3.abrupt("return", res.status(200).json({
            EC: 0,
            EM: 'Update attendance successful',
            DT: ''
          }));
        case 25:
          _context3.prev = 25;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            EC: 1,
            EM: 'Error from server',
            DT: ''
          }));
        case 29:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 25]]);
  }));
  return function putUpdateAttendance(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getEnrollment = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$query, subject_id, semester_id, data;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$query = req.query, subject_id = _req$query.subject_id, semester_id = _req$query.semester_id;
          _context4.next = 4;
          return Enrollment.findAll({
            where: {
              subject_id: subject_id,
              semester_id: semester_id
            },
            attributes: ['id', 'score', 'attendance', 'completed'],
            include: [{
              model: User,
              attributes: ['id', 'last_name', 'first_name', 'email'],
              include: {
                model: Role,
                attributes: ['id', 'name']
              }
            }, {
              model: Subject,
              attributes: ['name', 'description']
            }, {
              model: Semester,
              attributes: ['semester']
            }]
          });
        case 4:
          data = _context4.sent;
          return _context4.abrupt("return", res.status(200).json({
            EC: 0,
            EM: 'Get enrollment successful',
            DT: data
          }));
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            EC: 1,
            EM: 'Error from server',
            DT: ''
          }));
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function getEnrollment(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteEnrollment = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$query2, user_id, subject_id, semester_id, studentExisted, subjectExisted;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$query2 = req.query, user_id = _req$query2.user_id, subject_id = _req$query2.subject_id, semester_id = _req$query2.semester_id;
          if (!(!user_id || !subject_id || !semester_id)) {
            _context5.next = 4;
            break;
          }
          return _context5.abrupt("return", res.status(200).json({
            EC: 3,
            EM: 'Please enter all necessary information',
            DT: ''
          }));
        case 4:
          _context5.next = 6;
          return User.findOne({
            where: {
              id: user_id
            }
          });
        case 6:
          studentExisted = _context5.sent;
          if (studentExisted) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", res.status(200).json({
            EC: 2,
            EM: 'Not found student',
            DT: ''
          }));
        case 9:
          _context5.next = 11;
          return Subject.findOne({
            where: {
              id: subject_id
            }
          });
        case 11:
          subjectExisted = _context5.sent;
          if (subjectExisted) {
            _context5.next = 14;
            break;
          }
          return _context5.abrupt("return", res.status(200).json({
            EC: 2,
            EM: 'Not found subject',
            DT: ''
          }));
        case 14:
          _context5.next = 16;
          return Enrollment.destroy({
            where: {
              user_id: user_id,
              subject_id: subject_id,
              semester_id: semester_id
            }
          });
        case 16:
          return _context5.abrupt("return", res.status(200).json({
            EC: 0,
            EM: 'Delete enrollment successful',
            DT: ''
          }));
        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            EC: 1,
            EM: 'Error from server',
            DT: ''
          }));
        case 23:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 19]]);
  }));
  return function deleteEnrollment(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var getEnrollmentByStudentId = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$query3, userId, semesterId, data;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$query3 = req.query, userId = _req$query3.userId, semesterId = _req$query3.semesterId;
          _context6.next = 4;
          return Enrollment.findAll({
            where: {
              user_id: userId,
              semester_id: semesterId
            },
            attributes: ['id', 'score', 'attendance', 'completed'],
            include: [{
              model: User,
              attributes: ['id', 'last_name', 'first_name', 'email']
            }, {
              model: Subject,
              attributes: ['id', 'name', 'number_of_credits', 'description', 'tuition']
            }, {
              model: Semester,
              attributes: ['id', 'semester']
            }]
          });
        case 4:
          data = _context6.sent;
          return _context6.abrupt("return", res.status(200).json({
            EC: 0,
            EM: 'Get enrollment by user id successful',
            DT: data
          }));
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          return _context6.abrupt("return", res.status(500).json({
            EC: 1,
            EM: 'Error from server',
            DT: ''
          }));
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function getEnrollmentByStudentId(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var getEnrollmentForTeacher = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$query4, user_id, semester_id, data;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _req$query4 = req.query, user_id = _req$query4.user_id, semester_id = _req$query4.semester_id;
          _context7.next = 4;
          return Enrollment.findAll({
            where: {
              user_id: user_id,
              semester_id: semester_id
            },
            attributes: ['id'],
            include: [{
              model: Subject,
              attributes: ['id', 'name']
            }]
          });
        case 4:
          data = _context7.sent;
          return _context7.abrupt("return", res.status(200).json({
            EC: 0,
            EM: 'Get subject for teacher successful',
            DT: data
          }));
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          return _context7.abrupt("return", res.status(500).json({
            EC: 1,
            EM: 'Error from server',
            DT: ''
          }));
        case 12:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 8]]);
  }));
  return function getEnrollmentForTeacher(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var getStudentForTeacher = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$query5, subject_id, semester_id, data;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _req$query5 = req.query, subject_id = _req$query5.subject_id, semester_id = _req$query5.semester_id;
          _context8.next = 4;
          return Enrollment.findAll({
            where: {
              subject_id: subject_id,
              semester_id: semester_id
            },
            attributes: ['id', 'score', 'attendance', 'completed'],
            include: [{
              model: User,
              attributes: ['id', 'last_name', 'first_name', 'email'],
              include: {
                model: Role,
                attributes: ['id', 'name']
              }
            }]
          });
        case 4:
          data = _context8.sent;
          return _context8.abrupt("return", res.status(200).json({
            EC: 0,
            EM: 'Get student for teacher successful',
            DT: data
          }));
        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          return _context8.abrupt("return", res.status(500).json({
            EC: 1,
            EM: 'Error from server',
            DT: ''
          }));
        case 12:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 8]]);
  }));
  return function getStudentForTeacher(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var getTeacherForAssign = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$query6, searchValue, semester_id, limit, page, offset, data, _yield$Enrollment$fin, count, rows, totalPages, _yield$Enrollment$fin2, _count, _rows, _totalPages;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _req$query6 = req.query, searchValue = _req$query6.searchValue, semester_id = _req$query6.semester_id, limit = _req$query6.limit, page = _req$query6.page;
          offset = limit * (page - 1);
          limit = +limit;
          data = {};
          if (!searchValue) {
            _context9.next = 15;
            break;
          }
          _context9.next = 8;
          return Enrollment.findAndCountAll({
            limit: limit,
            offset: offset,
            where: _defineProperty({
              semester_id: semester_id,
              '$User.Role.name$': 'Instructor'
            }, Op.or, [{
              '$User.first_name$': _defineProperty({}, Op.like, '%' + searchValue + '%')
            }, {
              '$User.last_name$': _defineProperty({}, Op.like, '%' + searchValue + '%')
            }, {
              '$User.id$': _defineProperty({}, Op.like, '%' + searchValue + '%')
            }, {
              '$Subject.id$': _defineProperty({}, Op.like, '%' + searchValue + '%')
            }, {
              '$Subject.name$': _defineProperty({}, Op.like, '%' + searchValue + '%')
            }]),
            include: [{
              model: User,
              attributes: ['id', 'first_name', 'last_name', 'email'],
              include: {
                model: Role,
                attributes: ['id', 'name']
              }
            }, {
              model: Subject,
              attributes: ['id', 'name']
            }]
          });
        case 8:
          _yield$Enrollment$fin = _context9.sent;
          count = _yield$Enrollment$fin.count;
          rows = _yield$Enrollment$fin.rows;
          totalPages = Math.ceil(count / limit); //round
          data = {
            totalRows: count,
            totalPages: totalPages,
            data: rows
          };
          _context9.next = 22;
          break;
        case 15:
          _context9.next = 17;
          return Enrollment.findAndCountAll({
            limit: limit,
            offset: offset,
            where: {
              semester_id: semester_id,
              '$User.Role.name$': 'Instructor'
            },
            include: [{
              model: User,
              attributes: ['id', 'first_name', 'last_name', 'email'],
              include: {
                model: Role,
                attributes: ['id', 'name']
              }
            }, {
              model: Subject,
              attributes: ['id', 'name']
            }]
          });
        case 17:
          _yield$Enrollment$fin2 = _context9.sent;
          _count = _yield$Enrollment$fin2.count;
          _rows = _yield$Enrollment$fin2.rows;
          _totalPages = Math.ceil(_count / limit); //round
          data = {
            totalRows: _count,
            totalPages: _totalPages,
            data: _rows
          };
        case 22:
          return _context9.abrupt("return", res.status(200).json({
            EC: 0,
            EM: 'Get student for teacher successful',
            DT: data
          }));
        case 25:
          _context9.prev = 25;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          return _context9.abrupt("return", res.status(500).json({
            EC: 1,
            EM: 'Error from server',
            DT: ''
          }));
        case 29:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 25]]);
  }));
  return function getTeacherForAssign(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var postCreateAssign = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _req$body4, user_id, subject_id, semester_id, enrollmentExisted, checkDoubleTeacher;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _req$body4 = req.body, user_id = _req$body4.user_id, subject_id = _req$body4.subject_id, semester_id = _req$body4.semester_id;
          if (!(!user_id || !subject_id || !semester_id)) {
            _context10.next = 4;
            break;
          }
          return _context10.abrupt("return", res.status(200).json({
            EC: 3,
            EM: 'Please enter all necessary information',
            DT: ''
          }));
        case 4:
          _context10.next = 6;
          return Enrollment.findOne({
            where: {
              user_id: user_id,
              subject_id: subject_id,
              semester_id: semester_id
            }
          });
        case 6:
          enrollmentExisted = _context10.sent;
          if (!enrollmentExisted) {
            _context10.next = 9;
            break;
          }
          return _context10.abrupt("return", res.status(200).json({
            EC: 1,
            EM: 'You already assign this subject to teacher',
            DT: ''
          }));
        case 9:
          _context10.next = 11;
          return Enrollment.findOne({
            where: {
              subject_id: subject_id,
              semester_id: semester_id,
              '$User.Role.id$': 2
            },
            include: {
              model: User,
              attributes: ['id', 'first_name', 'role_id'],
              include: {
                model: Role,
                attributes: ['id', 'name']
              }
            }
          });
        case 11:
          checkDoubleTeacher = _context10.sent;
          if (!checkDoubleTeacher) {
            _context10.next = 14;
            break;
          }
          return _context10.abrupt("return", res.status(200).json({
            EC: 1,
            EM: 'This subject had teacher',
            DT: ''
          }));
        case 14:
          _context10.next = 16;
          return Enrollment.create(req.body);
        case 16:
          return _context10.abrupt("return", res.status(200).json({
            EC: 0,
            EM: 'Create Assign successful',
            DT: ''
          }));
        case 19:
          _context10.prev = 19;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
          return _context10.abrupt("return", res.status(500).json({
            EC: 1,
            EM: 'Error from server',
            DT: ''
          }));
        case 23:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 19]]);
  }));
  return function postCreateAssign(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
module.exports = {
  postCreateEnrollment: postCreateEnrollment,
  putUpdateScore: putUpdateScore,
  putUpdateAttendance: putUpdateAttendance,
  getEnrollment: getEnrollment,
  deleteEnrollment: deleteEnrollment,
  getEnrollmentByStudentId: getEnrollmentByStudentId,
  getEnrollmentForTeacher: getEnrollmentForTeacher,
  getStudentForTeacher: getStudentForTeacher,
  getTeacherForAssign: getTeacherForAssign,
  postCreateAssign: postCreateAssign
};