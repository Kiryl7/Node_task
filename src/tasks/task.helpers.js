const statusResponce = (task, res) => {
    res.status(200)
    res.json(task)
}

module.exports = statusResponce