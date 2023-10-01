const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2/promise');

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

let connection = null;

mysql
  .createConnection(config)
  .then(conn => {
    connection = conn;
    return connection.query(
      "create table if not exists people(id int not null auto_increment, name varchar(255), primary key(id));"
    );
  })
  .then(result => {
    app.listen(port, function() {
      console.log("Server is listening on port " + port);
    });
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

function getPeople() {
    return connection
      .query("SELECT * FROM people")
      .then(([rows, fields]) => {
        return new Promise((resolve, reject) => {
          resolve(rows);
        });
    });
}

function addPerson(name, definition) {
    return connection.query(`INSERT INTO people(name) values('${name}');`);
}

function printResponse(peopleRecords) {
    const peopleRowsArray = peopleRecords.map(record => 
        `<tr><td>${record.id}</td>
         <td>${record.name}</td></tr>`
    );

    let finalTable = `<table border="1"><tr><td>Id</td><td>Nome</td></tr>`;
    let peopleRows = '';
    peopleRowsArray.forEach(element => {
        peopleRows += element;
    });
    finalTable = finalTable + peopleRows + '</table>'
    return '<h1>Full Cycle Rocks!</h1>' + finalTable
}

app.get('/:name', async (req, res) => {
    const name = req.params.name;

    if (name !== 'favicon.ico') {
        addPerson(name)
            .then(getPeople)
            .then(peopleRecords => {
                const response = printResponse(peopleRecords);
                res.send(response);
            })
            .catch(function(err) {
                console.log(err);
                response.status(500).send(err);
            });
    }
})