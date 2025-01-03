const mongoose = require('mongoose')

const NewSchema = new mongoose.Schema({
    image: String,
    name: String,
    ep: Number,
    date: String,
    desmi: String,
    audio: String,
    story: String,
    storypara: String,
    headlines: String,
    headlinespara: String,
    wordnphrases: String,
    key1: String,
    key2: String,
    key3: String,
    phrases1: String,
    phrases2: String,
    phrases3: String,
    phrasespara1: String,
    phrasespara2: String,
    phrasespara3: String,

})

const NewModel = mongoose.model("news", NewSchema)
module.exports = NewModel