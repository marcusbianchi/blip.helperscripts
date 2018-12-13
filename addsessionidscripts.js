var addsessionidscript = function () {

  try {
    var fs = require('fs')
    var exportfile = require('./Modules/exportfile')
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
    var flow = sessionId.addsessionidscript(blipJson)
    
    exportfile.savefile(flow)

  } catch (error) {
      console.log(error)
  }
}

addsessionidscript()


