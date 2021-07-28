"use strict";
exports.__esModule = true;
exports.validateBody = void 0;
var error_1 = require("../helpers/error");
var validateBody = function (req, res, next) {
    var task = req.body;
    if (!task.title || task.title == null || !task.description || task.description == null)
        throw new error_1.ErrorHandler(404, 'Invalid req data');
    next();
};
exports.validateBody = validateBody;
//# sourceMappingURL=validation.body.js.map