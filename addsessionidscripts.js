var addsessionidscript = function () {

  try {
    var fs = require('fs')
    var jsonPath = process.argv[2]
    var blipJson = {}

    try {
      blipJson = JSON.parse(fs.readFileSync(jsonPath))
    } catch (error) {
      console.log(error)
    }

    if (!blipJson) {
      console.log('Unable to parse BlipJSON')
      return null
    }
    var sessionId = require ('./Modules/addsessionid')
    sessionId.addsessionidscript(blipJson)
  } catch (error) {
      console.log(error)
  }
}

addsessionidscript()


