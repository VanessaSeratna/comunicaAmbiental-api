const express = require("express");
const mongoose = require('mongoose');

const app = express()
app.use(express.json())
const port = 3000


const Informations = mongoose.model('Informations',{
    title: String,
    description: String,
    image_url: String,
    link_url: String,
});

app.get("/", async (req, res) => {
    const informations = await Informations.find()
    return res.send(informations)
})

app.delete("/:id", async (req, res) => {
    const informations = await Informations.findByIdAndDelete(req.params.id)
    return res.send(informations)
})

app.put("/:id", async (req, res) => {
    const informations = await Informations.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        link_url: req.body.link_url,
    })
    return res.send(informations)
})


app.post("/", async (req, res) => {
    const informations = new Informations ({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        link_url: req.body.link_url,
    })
    
    await informations.save()
    return res.send(informations)
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://vanessapdev:Raellindo8*@comunicaambiental.rgbcp.mongodb.net/?retryWrites=true&w=majority&appName=ComunicaAmbiental')
    console.log('App running')
})