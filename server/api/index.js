const express = require('express')
const router = express.Router()

require('./routes/User')(router)
require('./routes/Transaction')(router)

module.exports = router