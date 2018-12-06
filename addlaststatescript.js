
var addlaststatescript = function() {

    try {
        var blipJson = {}
        var fs = require('fs')
        var jsonPath = process.argv[2]
        var addToAll = process.argv[3]
        var addJustUserInteraction = process.argv[4]

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
        addlaststate.addlaststatescript(blipJson, addToAll, addJustUserInteraction)
        
    } catch (error) {
        console.log(error)
    }
}




addlaststatescript()