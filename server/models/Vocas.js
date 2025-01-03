const mongoose = require('mongoose')

const VocaSchema = new mongoose.Schema({
    image: String,
    name: String,
    ep: Number,
    date: String,
    desmi: String,
    intro: String,
    intropara: String,
    phrasalverb: String
})

const VocaModel = mongoose.model("vocas", VocaSchema)
module.exports = VocaModel