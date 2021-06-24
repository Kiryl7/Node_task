const buildResponse = (task, res) => {
    res.status(200)
    res.json(task)
}

module.exports = buildResponse