const router = require('express').Router();
const pool = require('../config')
router.get('/pasajeros', (_, response) => {
    pool.getConnection().then(conn => {
        conn.query('SELECT * FROM pasajeros').then(rows => {
            response.json(rows)
        });
        conn.end();
    }).catch(err => {
        console.log(err);
    });
});

router.post('/pasajeros/insert', (request, response) => {
    const { idVuelos, idUsuarios, asiento, clase } = request.body;
    pool.getConnection().then(conn => {
        const sql = `INSERT INTO 
                            pasajeros (id_vuelos, id_usuarios, asiento, clase)
                                values (?, ?, ?, ?)`;
        conn.query(sql, [idVuelos, idUsuarios, asiento, clase])
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

router.post('/pasajeros/update', (request, response) => {
    const { idPasajeros, idVuelos, idUsuarios, asiento, clase } = request.body;
    pool.getConnection().then(conn => {
        const sql = `UPDATE 
                            pasajeros 
                        SET 
                            id_vuelos = ?, 
                            id_usuarios = ?,
                            asiento = ?,
                            clase = ?
                        WHERE
                            id_pasajeros = ?`;
        conn.query(sql, [idVuelos, idUsuarios, asiento, clase, idPasajeros])
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
router.post('/pasajeros/delete', (request, response) => {
    const { idpasajeros } = request.body;
    pool.getConnection().then(conn => {
        const sql = `DROP 
                        pasajeros
                    WHERE
                        id_pasajeros = ?`;
        conn.query(sql, idpasajeros)
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