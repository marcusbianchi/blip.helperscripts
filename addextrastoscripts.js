var addextrastoscripts = function () {

    var fs = require('fs')
    var exportfile = require('./Modules/exportfile')
    var jsonPath = process.argv[2]
    var replace = true
    
    if (process.argv[3] && process.argv[3] === 'a') {
      replace = false
    }

    var blipJson = {}

    try {
      blipJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    } catch (error) {
      console.log(error)
    }

    var addextras = require ('./Modules/addextras')
    let flow = addextras.addextrastoscripts(blipJson,replace)

    exportfile.savefile(flow)
   
}

addextrastoscripts()
