const mongoose = require("mongoose");
const bmiShema = new mongoose.Schema({
    results: {
        type: String,
    },
    suggest: {
        type: Array,
    },
    typeBMI: {
        type: Number,
    },
}, {
    timestamps: true,
});

const bmiModel = mongoose.model("BMI", bmiShema);

module.exports = bmiModel;