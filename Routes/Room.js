const express = require('express');
const router = express.Router();
const { Roomsget, Roomspost, Roomsput, Roomsdelete  } = require('../Controllers/RoomController');
const {validateSchema} =require('../Controllers/roomvalidate')

router.post('/api/roompost',validateSchema, Roomspost);


router.get('/api/roomget', Roomsget);


router.put('/api/room/:room_no', Roomsput);

router.delete('/api/roomdelete/:room_no', Roomsdelete);

module.exports = router;
