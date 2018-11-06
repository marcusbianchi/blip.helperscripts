
var addlaststatescript = function() {

    try {
        var blipJson = {}
        var fs = require('fs')
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
        var addlaststate = require ('./Modules/addlaststate')
        addlaststate.addlaststatescript(blipJson)
        
    } catch (error) {
        console.log(error)
    }
}




addlaststatescript()