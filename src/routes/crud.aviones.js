const router = require('express').Router();
const pool = require('../config')
router.get('/aviones', (_, response) => {
    pool.getConnection().then(conn => {
        conn.query('SELECT * FROM aviones').then(rows => {
            response.json(rows)
        });
        conn.end();
    }).catch(err => {
        console.log(err);
    });
});

router.post('/aviones/insert', (request, response) => {
    const { fabricante, modelo, capacidad, autonomia } = request.body;
    pool.getConnection().then(conn => {
        const sql = `INSERT INTO 
                            aviones (fabricante, modelo, capacidad, autonomia)
                                values (?, ?, ?, ?)`;
        conn.query(sql, [fabricante, modelo, capacidad, autonomia])
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

router.post('/aviones/update', (request, response) => {
    const { idAviones, fabricante, modelo, capacidad, autonomia } = request.body;
    pool.getConnection().then(conn => {
        const sql = `UPDATE 
                            aviones 
                        SET 
                            fabricante = ?, 
                            modelo = ?,
                            capacidad = ?,
                            autonomia = ?
                        WHERE
                            id_aviones = ?`;
        conn.query(sql, [fabricante, modelo, capacidad, autonomia, idAviones])
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
router.post('/aviones/delete', (request, response) => {
    const { idAviones } = request.body;
    pool.getConnection().then(conn => {
        const sql = `DROP 
                        aviones
                    WHERE
                        id_aviones = ?`;
        conn.query(sql, idAviones)
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