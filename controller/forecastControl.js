var redis = require('../libraries/Redis');

var forecastAQI = {

    addForecast: function (data, callback) {
        var day = data.day;
        var month = data.month;
        var year = data.year;
        var places = data.places;
        var forecasts = JSON.stringify(data.forecasts);
        var extract = {
            day: day,
            month: month,
            places: places,
            year: year,
            forecasts: forecasts
        };

        redis.add_set({key: {"dmyp": day+month+year+places}, data: extract}, function (resp) {
            if (resp){
                return callback({err: false, response: "Data was added successfully "}, 200);
            }else{
                return callback({err: true, response: "Data was not added successfully "}, 400);
            }
        })
    },

    getForecast: function (data, callback) {
        redis.get_set({"dmyp": data.day+data.month+data.year+data.places}, null, function (resp) {
            if (resp){
                return callback({err: false, response: "Data found successfully", data: resp}, 200);
            }else{
                return callback({err: true, response: "Data was not found", data: null}, 404);
            }
        })

    },
};

module.exports = forecastAQI;