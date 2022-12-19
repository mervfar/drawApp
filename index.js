const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

var subscriberList = [];
var maxSubscriberCount = 5;
var isDrawStarted = false
// Create express app
const app = express()
const port = 80
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());



app.get('/draw', async (req, res, next) => {
    try {
        if (subscriberList.length > 0 && isDrawStarted) {
            // Select random item
            let selected = subscriberList[Math.floor(Math.random() * subscriberList.length)];
            // Remove selected item
            const index = subscriberList.indexOf(selected);
            if (index > -1) { // only splice array when item is found
                subscriberList.splice(index, 1); // 2nd parameter means remove one item only
            }
            let data = {
                message: "Çekiliş sonucun burdaaaa :) ----- " + selected
            }
            res.json(data)
        } else {
            let data = {
                message: "Çekiliş henüz başlamadı ya da sona erdi :("
            }
            res.json(data)
        }
        //console.log(subscriberList);
    } catch (error) {
        res.status(404).json(error);
        next(error)
    }
})

app.get('/addList/:name', async (req, res, next) => {
    try {
        let subscriber = req.params.name
        if (isDrawStarted) {
            let data = {
                message: "Malesef çekiliş çoktan başladı :("
            }
            res.json(data)
        }
        else if (subscriber == null || subscriber == undefined || subscriber.length <= 1 || subscriber == '') {
            let data = {
                message: " Hatalı gönderim yapıldı :("
            }
            res.json(data)
        }
        else if (subscriberList.length < maxSubscriberCount) {
            subscriberList.push(subscriber)
            let data = {
                message: subscriber + " Listeye eklendi :)"
            }
            res.json(data)
        }
        else if (subscriberList.length == maxSubscriberCount) {
            let data = {
                message: "Malesef yeterli katılımcı sayısına ulaşıldı :("
            }
            res.json(data)
        } else {
            let data = {
                message: "hata :("
            }
            res.json(data)
        }
    } catch (error) {
        res.status(404).json(error);
        next(error)
    }
})

app.get('/getList', async (req, res, next) => {
    try {
        if (!isDrawStarted) {
            let data = {
                message: "İşte katılımcı listemiz burda :)",
                data: subscriberList
            }
            res.json(data)
        } else {
            let data = {
                message: "Çekiliş çoktan başladı :)"
            }
            res.json(data)
        }
    } catch (error) {
        res.status(404).json(error);
        next(error)
    }
})

app.get('/switchDrawMode', async (req, res, next) => {
    try {
        if (subscriberList.length == maxSubscriberCount) {
            isDrawStarted = !isDrawStarted
            let data = {
                message: "Çekiliş modu",
                data: isDrawStarted
            }
            res.json(data)
        } else {
            let data = {
                message: "Çekiliş için yeterli kullanıcı yok :("
            }
            res.json(data)
        }
    } catch (error) {
        res.status(404).json(error);
        next(error)
    }
})

app.get('/reset', async (req, res, next) => {
    try {
        if (!isDrawStarted) {
            subscriberList = []
            let data = {
                message: "Çekiliş resetlendi, mevcut kullanıcı listesi",
                data: subscriberList
            }
            res.json(data)
        } else {
            let data = {
                message: "Çekiliş devak ediyor :)"
            }
            res.json(data)
        }
    } catch (error) {
        res.status(404).json(error);
        next(error)
    }
})
app.get('/', async (req, res, next) => {
    try {

        let data = {
            message: "Bir avuç beyaz yakalı🤕 Çekiliş yapıyorrrrr"
        }
        res.json(data)

    } catch (error) {
        res.status(404).json(error);
        next(error)
    }
})

app.listen(port, () => {
    console.log(`Kura Çekme Uygulaması V2 listening at http://localhost:${port}`)
})
