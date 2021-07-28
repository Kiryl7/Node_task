"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var error_1 = require("./helpers/error");
var tasks_controller_1 = require("./tasks/tasks.controller");
exports.app = express_1["default"]();
exports.app.use(express_1["default"].json());
exports.app.use(express_1["default"].urlencoded({ extended: true }));
exports.app.get('/error', function () {
    throw new error_1.ErrorHandler(500, 'Internal server error');
});
exports.app.use('/tasks', tasks_controller_1.tasks);
exports.app.use(function (err, req, res) {
    error_1.handleError(err, res);
});
//# sourceMappingURL=app.js.map