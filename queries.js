var promise = require('bluebird');

var options = {
   promiseLib: promise

};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://pcsehgnuiydpgc:5xveCapOrt3VRZJ2Y0Bk3tIQeE@ec2-184-73-196-82.compute-1.amazonaws.com:5432/d1tict7o6invli?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory';
var db = pgp(connectionString);

// add query functions
function get(res) {
   db.any('select * from tb_partitura')
      .then(function(data) {
         res.send(data);
      })
      .catch(function(err) {
         return console.log(err);
      });
}

function getById(req, res) {
   db.one('select * from tb_partitura where id = $1', req)
      .then(function(data) {
         res.send(data);
      })
      .catch(function(err) {
         return console.log(err);
      });
}

function create(partitura, res) {
   db.none('insert into tb_partitura(conteudo, titulo) values(${conteudo}, ${titulo})', partitura)
      .then(function() {
         res.send({ status: 0, message: 'Partitura created successfully' });
      })
      .catch(function(err) {
         console.log(err);
         res.send({ status: 1, message: 'Partitura created failed' });
      });
}

function update(partitura, res) {
   db.none('update tb_partitura set titulo=$1, conteudo=$2 where id=$3', [partitura.titulo, partitura.conteudo, partitura.id])
      .then(function() {
         res.send({ status: 0, message: 'Partitura update successfully' });
      })
      .catch(function(err) {
         console.log(err);
         res.send({ status: 1, message: 'Partitura update failed' });
      });
}

function remove(id, res) {
   db.result('delete from tb_partitura where id = $1', id)
      .then(function() {
         res.send({ status: 0, message: 'Partitura delete successfully' });
      })
      .catch(function(err) {
         console.log(err);
         res.send({ status: 1, message: 'Partitura delete failed' });
      });
}

module.exports = {
   get: get,
   getById: getById,
   create: create,
   update: update,
   remove: remove
};
