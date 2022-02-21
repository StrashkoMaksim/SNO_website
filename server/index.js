const express = require('express')
const mongoose = require('mongoose')
const formData = require("express-form-data")
require('dotenv').config()

const app = express();

app.use(express.static('static'))

app.use(express.json())
app.use(formData.parse({
    uploadDir: '.\\server\\tmp',
    autoClean: true
}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/news', require('./routes/news.routes'))
app.use('/api/tag', require('./routes/tag.routes'))
app.use('/api/council', require('./routes/council.routes'))
app.use('/api/supervisor', require('./routes/supervisor.routes'))
app.use('/api/event', require('./routes/event.routes'))

const PORT = process.env.PORT || 5000

async function start () {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()