import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import routes from './src/routes/crmRoutes';

const app = express();
const PORT = 3000;

// helmet setup
app.use(helmet());

// rate limiting setup
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying
});

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb');

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);