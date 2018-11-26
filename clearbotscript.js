var clearbotscript = function () {

    var fs = require('fs')
    var jsonPath = process.argv[2]

    var blipJson = {}

    try {
      blipJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    } catch (error) {
      console.log(error)
    }

    var clearbot = require ('./Modules/clearbot')
    clearbot.clearbot(blipJson)
   
}

clearbotscript()
