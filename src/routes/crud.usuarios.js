const router = require('express').Router();
const pool = require('../config')
router.get('/usuarios', (_, response) => {
    pool.getConnection().then(conn => {
        conn.query('SELECT * FROM usuarios').then(rows => {
            response.json(rows)
        });
        conn.end();
    }).catch(err => {
        console.log(err);
    });
});

router.post('/usuarios/insert', (request, response) => {
    const { nombre } = request.body;
    pool.getConnection().then(conn => {
        const sql = `INSERT INTO 
                            usuarios (nombre)
                                values (?)`;
        conn.query(sql, nombre)
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

router.post('/usuarios/update', (request, response) => {
    const { nombre } = request.body;
    pool.getConnection().then(conn => {
        const sql = `UPDATE 
                            usuarios 
                        SET 
                            nombre = ?,
                        WHERE
                            id_usuarios = ?`;
        conn.query(sql, nombre)
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
router.post('/usuarios/delete', (request, response) => {
    const { idusuarios } = request.body;
    pool.getConnection().then(conn => {
        const sql = `DROP 
                        usuarios
                    WHERE
                        id_usuarios = ?`;
        conn.query(sql, idusuarios)
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