var connection = require('../connection');

function Partituras() {
   this.get = function(res) {
       connection.acquire(function(err, con) {
           con.query('select * from tb_partitura', function(err, result) {
               con.release();
               res.send(result);
           });
       });
   };

   this.getById = function(id, res) {
       connection.acquire(function(err, con) {
           con.query('select * from tb_partitura where id = ?',[id], function(err, result) {
               con.release();
               res.send(result[0]);
           });
       });
   };

   this.create = function(partitura, res) {
      connection.acquire(function(err, con) {
         con.query('insert into tb_partitura set ?', partitura, function(err, result) {
            con.release();
            if (err) {
               res.send({ status: 1, message: err });
            } else {
               res.send({ status: 0, message: 'Partitura created successfully' });
            }
         });
      });
   };

   this.update = function(partitura, res) {
       connection.acquire(function(err, con) {
           con.query('update tb_partitura set ? where id = ?', [partitura, partitura.id], function(err, result) {
               con.release();
               if (err) {
                   res.send({ status: 1, message: 'PARTITURA update failed' });
               } else {
                   res.send({ status: 0, message: 'PARTITURA updated successfully' });
               }
           });
       });
   };

   // this.delete = function(id, res) {
   //     connection.acquire(function(err, con) {
   //         con.query('delete from usuarios where id = ?', [id], function(err, result) {
   //             con.release();
   //             if (err) {
   //                 res.send({ status: 1, message: 'Failed to delete' });
   //             } else {
   //                 res.send({ status: 0, message: 'Deleted successfully' });
   //             }
   //         });
   //     });
   // };

}

module.exports = new Partituras();
