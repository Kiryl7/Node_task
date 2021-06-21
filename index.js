const app = require('./src/app')
require('dotenv').config()
const getById = require('./src/tasks/tasks.repository')


const call = Promise.resolve(getById(1))
console.log(call)

app.listen(process.env.PORT, () => {
    console.log(`Server start on http://localhost:${process.env.PORT}`)
})