const router = require('express').Router();
const pool = require('../config')
router.get('/vuelos', (_, response) => {
    pool.getConnection().then(conn => {
        conn.query('SELECT * FROM vuelos').then(rows => {
            response.json(rows)
        });
        conn.end();
    }).catch(err => {
        console.log(err);
    });
});

router.post('/vuelos/insert', (request, response) => {
    const { fecha, origen, destino } = request.body;
    pool.getConnection().then(conn => {
        const sql = `INSERT INTO 
                            vuelos (fecha, origen, destino)
                                values (?, ?, ?)`;
        conn.query(sql, [fecha, origen, destino])
        .then(rows => {
            if (rows.affectedRows > 0) {
                response.status(200).send('Se inserto correctamente');
            }
        }).catch(err => console.log(err));
        conn.end();
    }).catch(err => {
        console.log(err);
    })
});

router.post('/vuelos/update', (request, response) => {
    const { idVuelos, fecha, origen, destino } = request.body;
    pool.getConnection().then(conn => {
        const sql = `UPDATE 
                            vuelos 
                        SET 
                            fecha = ?,
                            origen = ?,
                            destino = ?
                        WHERE
                            id_vuelos = ?`;
        conn.query(sql, [fecha, origen, destino, idVuelos])
        .then(rows => {
            if (rows.affectedRows > 0) {
                response.status(200).send('Se actualizo correctamente');
            }
        }).catch(err => console.log(err));
        conn.end();
    }).catch(err => {
        console.log(err);
    })
});
router.post('/vuelos/delete', (request, response) => {
    const { idvuelos } = request.body;
    pool.getConnection().then(conn => {
        const sql = `DROP 
                        vuelos
                    WHERE
                        id_vuelos = ?`;
        conn.query(sql, idvuelos)
        .then(rows => {
            if (rows.affectedRows > 0) {
                response.status(200).send('Se ELIMINO correctamente');
            }
        }).catch(err => console.log(err));
        conn.end();
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;