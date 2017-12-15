const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let query = 'SELECT * FROM Departments';
    connection.query(query, (err, data) =>{
        if(err) return console.log(err);
        res.send(data);
    })
});

module.exports = router;