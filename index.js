const app = require('./src/app')
require('dotenv').config()

app.listen(process.env.PORT, () => {
    console.log(`Server start on http://localhost:${process.env.PORT}`)
})