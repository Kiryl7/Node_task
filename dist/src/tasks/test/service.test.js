"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.__esModule = true;
var tasksRepository = __importStar(require("../tasks.repository"));
var tasks_service_1 = require("../tasks.service");
describe('tasks.service: getTasks', function () {
    var spyGetAll = jest.spyOn(tasksRepository, 'getAll');
    test('should return all tasks', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockTasks, expetedTasks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockTasks = [
                        { id: 1, title: 'title1', description: 'description1' },
                        { id: 2, title: 'title2', description: 'description2' },
                    ];
                    spyGetAll.mockImplementation(function () { return Promise.resolve(mockTasks); });
                    return [4, tasks_service_1.getTasks()];
                case 1:
                    expetedTasks = _a.sent();
                    expect(spyGetAll).toHaveBeenCalled();
                    expect(expetedTasks).toEqual(mockTasks);
                    return [2];
            }
        });
    }); });
    test('should return an error message after an error occur', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockError, expectedTasks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockError = 'mock error';
                    spyGetAll.mockImplementationOnce(function () { return Promise.reject(mockError); });
                    return [4, tasks_service_1.getTasks()];
                case 1:
                    expectedTasks = _a.sent();
                    expect(expectedTasks).toBe(mockError);
                    return [2];
            }
        });
    }); });
});
describe('task.service: getById', function () {
    var spyGetById = jest.spyOn(tasksRepository, 'getById');
    test('should return one task, used ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockTask, expectedTask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockTask = { id: 1, title: 'element', description: 'first element' };
                    spyGetById.mockImplementation(function () { return Promise.resolve([mockTask]); });
                    return [4, tasks_service_1.getOneTask(1)];
                case 1:
                    expectedTask = _a.sent();
                    expect(spyGetById).toHaveBeenCalled();
                    expect(expectedTask).toEqual(mockTask);
                    return [2];
            }
        });
    }); });
    test('should return message when task not found', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockTaskResult, expected, received;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockTaskResult = [];
                    expected = 'object';
                    spyGetById.mockImplementation(function () { return Promise.resolve(mockTaskResult); });
                    return [4, tasks_service_1.getOneTask(2)];
                case 1:
                    received = _a.sent();
                    expect(spyGetById).toHaveBeenCalled();
                    expect(typeof (received)).toEqual(expected);
                    return [2];
            }
        });
    }); });
    test('should return an error message after an error occur', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockError, expectedTask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockError = 'test case error';
                    spyGetById.mockImplementationOnce(function () { return Promise.reject(mockError); });
                    return [4, tasks_service_1.getOneTask(1)];
                case 1:
                    expectedTask = _a.sent();
                    expect(expectedTask).toBe(mockError);
                    return [2];
            }
        });
    }); });
});
describe('task.service: delTask', function () {
    var spyDelById = jest.spyOn(tasksRepository, 'delById');
    test('should delete one task, used ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockTask, expectedTask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockTask = 1;
                    spyDelById.mockImplementation(function () { return Promise.resolve(mockTask); });
                    return [4, tasks_service_1.delTask(1)];
                case 1:
                    expectedTask = _a.sent();
                    expect(spyDelById).toHaveBeenCalled();
                    expect(expectedTask).toEqual(mockTask);
                    return [2];
            }
        });
    }); });
    test('should return message when task not found', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockTaskResult, expected, received;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockTaskResult = 666;
                    expected = 'object';
                    spyDelById.mockImplementation(function () { return Promise.resolve(mockTaskResult); });
                    return [4, tasks_service_1.getOneTask(666)];
                case 1:
                    received = _a.sent();
                    expect(spyDelById).toHaveBeenCalled();
                    expect(typeof (received)).toEqual(expected);
                    return [2];
            }
        });
    }); });
    test('should return an error message after an error occur', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockError, expectedTask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockError = 'test case error';
                    spyDelById.mockImplementationOnce(function () { return Promise.reject(mockError); });
                    return [4, tasks_service_1.delTask(1)];
                case 1:
                    expectedTask = _a.sent();
                    expect(expectedTask).toBe(mockError);
                    return [2];
            }
        });
    }); });
});
describe('task.service: update', function () {
    var spyUpdate = jest.spyOn(tasksRepository, 'update');
    test('should update tasks', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockTask, expectedTask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockTask = { id: 1, title: 'element', description: 'updated el' };
                    spyUpdate.mockImplementation(function () { return Promise.resolve(mockTask); });
                    return [4, tasks_service_1.updateTask(1, { id: 1, title: 'element', description: 'updated el' })];
                case 1:
                    expectedTask = _a.sent();
                    expect(spyUpdate).toHaveBeenCalled();
                    expect(expectedTask).toEqual(mockTask);
                    return [2];
            }
        });
    }); });
    test('should return message when task not found', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockTaskResult, expected, received;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockTaskResult = { id: 100, title: 'element', description: 'magick el' };
                    expected = { id: 100, title: 'element', description: 'NewEl' };
                    spyUpdate.mockImplementation(function () { return Promise.resolve(mockTaskResult); });
                    return [4, tasks_service_1.getOneTask(100)];
                case 1:
                    received = _a.sent();
                    expect(spyUpdate).toHaveBeenCalled();
                    expect(received).toEqual(expected);
                    return [2];
            }
        });
    }); });
    test('should return an error message after a error occur', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockError, expectedTask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockError = 'Test case Error!';
                    spyUpdate.mockImplementationOnce(function () { return Promise.reject(mockError); });
                    return [4, tasks_service_1.updateTask(1, { id: 1, title: 'element', description: 'updated el' })];
                case 1:
                    expectedTask = _a.sent();
                    expect(expectedTask).toBe(mockError);
                    return [2];
            }
        });
    }); });
});
describe('task.service: save', function () {
    var spySave = jest.spyOn(tasksRepository, 'save');
    test('should save tasks', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockTask, expectedTask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockTask = { id: 1, title: 'element', description: 'saved el' };
                    spySave.mockImplementation(function () { return Promise.resolve(mockTask); });
                    return [4, tasks_service_1.saveTask({ id: 1, title: 'element', description: 'saved el' })];
                case 1:
                    expectedTask = _a.sent();
                    console.log(expectedTask);
                    expect(spySave).toHaveBeenCalled();
                    expect(expectedTask).toEqual(mockTask);
                    return [2];
            }
        });
    }); });
    test('should return message when task not found', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockTaskResult, expected, received;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockTaskResult = { id: 100, title: 'element', description: 'magick el' };
                    expected = { id: 100, title: 'element', description: 'NewEl' };
                    spySave.mockImplementation(function () { return Promise.resolve(mockTaskResult); });
                    return [4, tasks_service_1.getOneTask(100)];
                case 1:
                    received = _a.sent();
                    expect(spySave).toHaveBeenCalled();
                    expect(received).toEqual(expected);
                    return [2];
            }
        });
    }); });
    test('should return an error message after a error occur', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockError, expectedTask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockError = 'Error save test';
                    spySave.mockImplementationOnce(function () { return Promise.reject(mockError); });
                    return [4, tasks_service_1.saveTask({ id: 1, title: 'element', description: 'saved el' })];
                case 1:
                    expectedTask = _a.sent();
                    expect(expectedTask).toBe(mockError);
                    return [2];
            }
        });
    }); });
});
//# sourceMappingURL=service.test.js.map