const app = require('./src/app')
require('dotenv').config()
const { getAll, getById, delObjById, update, saveObj } = require('./src/tasks/tasks.repository')

update(1, {title: 'test', description: 'changed element'})


app.listen(process.env.PORT, () => {
    console.log(`Server start on http://localhost:${process.env.PORT}`)
})