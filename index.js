const http = require('http')
const rword = require('rword')
const port = 3000

const requestHandler = (request, response) => {
    let croppedUrl = request.url.substring(1)

    if (request.url.startsWith("/json/")) {
        croppedUrl = request.url.substring(6)
    }

    const count = parseInt(croppedUrl)

    if (isNaN(count)) {
        response.end("Not a number...")
    } else {
        let words = rword.generate(count)

        let sentence = ""

        for (let word of words) {
            sentence += word + " "
        }

        if (request.url.startsWith("/json/")) {
            response.end(JSON.stringify({ words }))
        } else {
            response.end(sentence)
        }
    }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.log("Something bad happened: ", err)
    }

    console.log(`Server is listening on ${port}.`)
})
