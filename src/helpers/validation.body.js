const { ErrorHandler } = require("../helpers/error")

const validateBody = (req, res, next) => {
    const task = req.body
        if (!task.id || task.id == null || !task.title || task.title == null ||
            !task.description || task.description == null
        ) throw new ErrorHandler(404, "Invalid req data")
    next()
}

module.exports = validateBody