var redis = require('../libraries/Redis');
var Request = require("request");

var dataUsers = {

    addUser: function (data, callback) {
        var phone = data.phone;
        var nik = data.nik;
        var name = data.name;
        var email = data.email;
        var nama = data.name;
        var hp = data.phone;
        var verify = Math.floor((Math.random() * 9999) + 1000); 
        var kode = verify;
        var extract = {
            phone: phone,
            nik: nik,
            name: name,
            email: email,
            verify: verify,
        };

        redis.add_set({key: {"phone": phone}, data: extract}, function (resp) {
            if (resp){
                return callback({err: false, response: "Data was added successfully "}, 200);
            }else{
                return callback({err: true, response: "Data was not added successfully "}, 400);
            }
        })
         Request.post({
            uri: 'https://api.mainapi.net/smsbroadcast/1.0.0/send',
            headers: {'Content-Type': 'application/json','Accept': 'application/json','Authorization': 'Bearer d1f6e1da4fb0a27db01c8f754ebeb132'},
            body: JSON.stringify({"msisdns": [hp], "text": "Halo, "+nama+"! Kode untuk login ke WarnMyLungs adalah "+kode+"."})
        });
    },    
    
    verifyUser: function (data, callback) {
        redis.get_set({"phone": data.phone}, null, function (resp) {
            if (resp){
                return callback({err: false, response: "Data found successfully", kode: resp.verify}, 200);
            }else{
                return callback({err: true, response: "Data was not found", data: null}, 404);
            }
        })

    },

    loginUser: function (data, callback) {
        redis.get_set({"phone": data.phone}, null, function (resp) {
            if (resp){
                var hp = data.phone;
                var name = resp.name;
                var kode = resp.verify;
                Request.post({
                    uri: 'https://api.mainapi.net/smsbroadcast/1.0.0/send',
                    headers: {'Content-Type': 'application/json','Accept': 'application/json','Authorization': 'Bearer d1f6e1da4fb0a27db01c8f754ebeb132'},
                    body: JSON.stringify({"msisdns": [hp], "text": "Halo, "+name+"! Kode untuk login ke WarnMyLungs adalah "+kode+"."})
                });
                return callback({err: false, response: "Message sent successfully", kode: resp.verify}, 200);
            }else{
                return callback({err: true, response: "Data was not found", data: null}, 404);
            }
        })

    },

    getUser: function (data, callback) {
        redis.get_set({"phone": data.phone}, null, function (resp) {
            if (resp){
                return callback({err: false, response: "Data found successfully", data: resp}, 200);
            }else{
                return callback({err: true, response: "Data was not found", data: null}, 404);
            }
        })

    },

    deleteUser: function (data, callback) {
        redis.delete_set({"phone": data.phone}, function (resp) {
            if (resp){
                return callback({err: false, response: "User was deleted successfully "}, 200);
            }else{
                return callback({err: true, response: "No user found with this phone"}, 404);
            }
        })

    }

};

module.exports = dataUsers;