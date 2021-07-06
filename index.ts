import { app } from './src/app'
import { config } from 'dotenv'
config()

app.listen(process.env.PORT, () => {
    console.log(`Server start on http://localhost:${process.env.PORT}`)
})