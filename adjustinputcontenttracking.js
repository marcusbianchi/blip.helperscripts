
var adjustinputcontenttracking = function() {
    try {
        var blipJson = {}
        var fs = require('fs')
        var exportfile = require('./Modules/exportfile')
        var jsonPath = process.argv[2]

        try {
            blipJson = JSON.parse(fs.readFileSync(jsonPath))
        } catch (error) {
            console.log(error)
        }

        if (!blipJson) {
            console.log('Unable to parse BlipJSON')
            return null
        }
        var adjustInputContentTrackingScript = require ('./Modules/adjustInputContentTracking')
        var flow = adjustInputContentTrackingScript.adjustInputContentTrackingScript(blipJson)
        
        exportfile.savefile(flow)

        
    } catch (error) {
        console.log(error)
    }
}




adjustinputcontenttracking()