"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.tasks = void 0;
var express_1 = __importDefault(require("express"));
var buildResponce_1 = require("../helpers/buildResponce");
var validation_body_1 = require("../helpers/validation.body");
var tasks_service_1 = require("./tasks.service");
exports.tasks = express_1["default"].Router();
exports.tasks.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, task;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4, tasks_service_1.getOneTask(parseInt(id))];
            case 1:
                task = _a.sent();
                try {
                    if (Object.keys(task).length === 0)
                        throw new Error;
                    buildResponce_1.buildResponse(task, res);
                }
                catch (error) {
                    res.status(404).send('Task not found.');
                }
                return [2];
        }
    });
}); });
exports.tasks.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tasks_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, tasks_service_1.getTasks()];
            case 1:
                tasks_1 = _a.sent();
                buildResponce_1.buildResponse(tasks_1, res);
                return [3, 3];
            case 2:
                error_1 = _a.sent();
                res.status(404).send('Tasks not found.');
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
exports.tasks.post('/', validation_body_1.validateBody, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var task, savedTask, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                task = req.body;
                return [4, tasks_service_1.saveTask(task)];
            case 1:
                savedTask = _a.sent();
                if (Object.keys(task).length > 2)
                    throw new Error;
                else
                    buildResponce_1.buildResponse(savedTask, res);
                return [3, 3];
            case 2:
                error_2 = _a.sent();
                res.status(404).send("Task doesn't save. Your request has invalid data.");
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
exports.tasks["delete"]('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedTask, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4, tasks_service_1.delTask(parseInt(id))];
            case 1:
                deletedTask = _a.sent();
                if (typeof (deletedTask) !== 'number')
                    throw new Error;
                buildResponce_1.buildResponse("Object with id: " + id + " has been deleted.", res);
                return [3, 3];
            case 2:
                error_3 = _a.sent();
                res.status(404).send('This object cannot been deleted.');
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
exports.tasks.patch('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, task, updatedTask, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                task = req.body;
                if (Object.keys(task).length > 2)
                    throw new Error;
                return [4, tasks_service_1.updateTask(parseInt(id), task)];
            case 1:
                updatedTask = _a.sent();
                buildResponce_1.buildResponse(updatedTask, res);
                return [3, 3];
            case 2:
                error_4 = _a.sent();
                res.status(404).send('This object cannot be updated. You send invalid data.');
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
//# sourceMappingURL=tasks.controller.js.map