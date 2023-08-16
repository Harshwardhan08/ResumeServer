require("dotenv").config();
const express = require("express");
const path = require("path");
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;

//-cors
const allowedOrigins = [
    'http://localhost:3000'
];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}
//cors-

app.use('/', express.static('static'));
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
// app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/index'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'pages', 'notFound.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 - Not Found' })
    } else {
        res.type('txt').send('404 - Not Found')
    }
})
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server running on ${PORT}`));