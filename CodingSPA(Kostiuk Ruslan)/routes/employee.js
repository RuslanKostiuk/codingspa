const express = require('express');
const router = express.Router();

router.get("/", (req,res)=>{
    var query = `
        SELECT *, Active=1 as Active 
        FROM company.main_view
        LIMIT ${connection.escape(+req.query.limit)} 
        OFFSET ${connection.escape(+req.query.offset)};
        SELECT Count(Employees.idEmployee) AS TotalItems FROM Employees
        `;

    connection.query(query,(err,data) => {
        if(err) return console.log(err);

        res.send({
            items: data[0],
            count: data[1][0]['TotalItems']
        });
    });
});

router.get("/search", (req,res)=>{
    var query = `
        SELECT *, Active=1 as Active FROM company.main_view
        WHERE company.main_view.Name LIKE ${connection.escape(req.query.search + "%")}
        LIMIT ${connection.escape(+req.query.limit)} 
        OFFSET ${connection.escape(+req.query.offset)}
        `;

    connection.query(query,(err,data) => {
        if(err) return console.log(err);
        res.send(data);
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

router.put("/update",(req, res) => {

    var query = 'update employees set ? where idEmployee=?';
    
    connection.query(query, [req.body.employee, req.body.employee.idEmployee], (err, data) => {
        if(err) return console.log(err);
        res.send(data);
    });    
});

module.exports = router;