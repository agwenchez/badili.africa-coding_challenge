const express = require('express')
const app = express()
var fs = require('fs');
const logger = require('morgan')
app.use(logger('dev'))


app.use(express.static('public'));

const PORT = 5500
app.use(express.json())

app.get('/', (req, res) => {
    const { integer } = req.body

    // check if its a number
    if (typeof integer !== 'number') {
        res.status(400).send('Please send a number')
    } else {
        if (integer % 5 === 0 && integer % 7 === 0) {

            const result = "LR"

            saveResultToPublicFolder(result, function (err) {
                if (err) {
                    res.status(500).send(`Error occured:${err}`);
                    return;
                }

                res.status(200).json({ "Message": `Result:${result} save succesfully` })
            });

        } else if (integer % 7 === 0) {
            
            const result = "R"

            saveResultToPublicFolder(result, function (err) {
                if (err) {
                    res.status(500).send(`Error occured:${err}`);
                    return;
                }

                res.status(200).json({ "Message": `Result:${result} save succesfully` })
            });
        } else if (integer % 5 === 0) {
            const result = "L"

            saveResultToPublicFolder(result, function (err) {
                if (err) {
                    res.status(500).send(`Error occured:${err}`);
                    return;
                }

                res.status(200).json({ "Message": `Result:${result} save succesfully` })
            });
        } else {
            const result = integer

            saveResultToPublicFolder(result, function (err) {
                if (err) {
                    res.status(500).send(`Error occured:${err}`);
                    return;
                }
                res.status(200).json({ "Message": `Result:${result} save succesfully` })
            });
        }
    }
})

const saveResultToPublicFolder = (result, callback) => {
    fs.writeFile('./public/result.json', JSON.stringify(result), callback);
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))