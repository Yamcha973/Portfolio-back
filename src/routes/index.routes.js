const router = require('express').Router();
const cors = require('cors');
const contactRouter = require('./contact.routes');

const ALLOWED_ORIGINS = process.env.CLIENT_APP_ORIGIN.split(',');

const corsOptions = {
    origin: ALLOWED_ORIGINS,
  };
  
  router.use(cors(corsOptions));
  router.use('/contact', contactRouter);


module.exports = router;