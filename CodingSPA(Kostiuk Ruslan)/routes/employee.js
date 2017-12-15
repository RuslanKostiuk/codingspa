const express = require('express');
const router = express.Router();

router.get("/", (req,res)=>{
    var query = `
        SELECT * FROM company.main_view
        LIMIT 10`;

    connection.query(query,(err,data) => {
        if(err) return console.log(err);
        res.send(data);
    });
});

router.get("/search", (req,res)=>{
    var query = `
        SELECT * FROM company.main_view
        WHERE company.main_view.Name LIKE ${connection.escape(req.query.search + "%")}
        LIMIT ${connection.escape(+req.query.limit)} 
        OFFSET ${connection.escape(+req.query.offset)}`;

    connection.query(query,(err,data) => {
        if(err) return console.log(err);
        res.send(data);
    });
})

router.get("/count", (req,res) => {
    var query = `
        SELECT Count(Employees.idEmployee) FROM Employees
        WHERE Employees.Name LIKE '${connection.escape(req.query.search)}%'`;

    connection.query(query,(err,data) => {
        if(err) return console.log(err);
        res.send(data[0]);
    });
})

router.delete("/delete", (req, res) => {
    var query = `
        DELETE from Employees
        WHERE idEmployee = ${connection.escape(+req.query.idEmployee)}`;

    connection.query(query, (err, data) => {
        if(err) return console.log(err);
        res.send(data);
    });
});

router.put("/update",(req, res)=>{
    var query = 'update employees set ? where idEmployee=?';
    connection.query(query, [req.body.employee, req.body.employee.idEmployee], (err, data) => {
        if(err) return console.log(err);
        res.send(data);
    });    
});

module.exports = router;