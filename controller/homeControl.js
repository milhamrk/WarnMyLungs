var redis = require('../libraries/Redis');

var dataAQI = {

    addAQI: function (data, callback) {
        var id = data.id;
        var extract = {
            id: id,
            namaKota: data.namaKota,
            detailKota: data.detailKota,
            scoreAQI: data.scoreAQI,
            statusAQI: data.statusAQI,
            celcius: data.celcius,
            moreDetails: data.moreDetails,
            humidity: data.humidity,
            wind: data.wind,
        };

        redis.add_set({key: {"id": id}, data: extract}, function (resp) {
            if (resp){
                return callback({err: false, response: "Data was added successfully "}, 200);
            }else{
                return callback({err: true, response: "Data was not added successfully "}, 400);
            }
        })
    },

    getAQI: function (data, callback) {
        redis.get_set({"id": data.id}, null, function (resp) {
            if (resp){
                return callback({err: false, response: "Data found successfully", data: resp}, 200);
            }else{
                return callback({err: true, response: "Data was not found", data: null}, 404);
            }
        })

    },

    getAQIs: function (data, callback) {
        redis.get_set({"id": data.id}, null, function (resp) {
            if (resp){
                return callback({err: false, response: "Data found successfully", data: resp.scoreAQI}, 200);
            }else{
                return callback({err: true, response: "Data was not found", data: null}, 404);
            }
        })

    },
};

module.exports = dataAQI;