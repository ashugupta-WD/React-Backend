const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();
const port = 5000;
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

const Note = require('./models/Note');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Ashwani');
}

main().then(() => { console.log("Connected to mongo successfully") }).catch(err => { console.log(err) });


router.get('/fetchnotes', async (req, res) => {
    try {
        const result = await Note.find({});
        res.status(200).send(result);
    } catch (error) {
        res.status(404).send({ msg: "Some error occurred!" });
    }
});

router.post('/addnote', async (req, res) => {
    try {
        const noteData = new Note(req.body);
        noteData.save();
        res.status(200).send({ msg: 'Note added successfully!' });
    } catch (error) {
        res.status(404).send({ msg: "Some error occurred!" });
    }
})

router.delete('/deletenote', async (req, res) => {
    try {
        await Note.deleteOne({ _id: req.body.id }).then(() => { console.log("Success") }).catch(() => { console.log("Error") });
        res.status(200).send({ msg: 'Deleted note successfully!' });
    } catch (error) {
        res.status(404).send({ msg: 'Some Error Occurred!' });
    }
});

router.put('/editnote', async (req, res) => {
    try {
        await Note.updateOne({ _id: req.body.id }, { title: req.body.title, text: req.body.text, timestamp: req.body.timestamp }).then(() => { console.log("Success") }).catch(() => { console.log("Error") });
        res.status(200).send({ msg: 'Edit note successfully!' });
    } catch (error) {
        res.status(404).send({ msg: 'Some Error Occurred!' });
    }
});

app.use('/', router);
app.listen(port, () => {
    console.log(`Cloudnotes app listening on port ${port}`);
});