var fs = require('fs')

var addtrackingandsession = function () {

	try {
		var jsonPath = process.argv[2]
		var addtoall = false
		if (process.argv[3] && process.argv[3] === '-all') {
			addtoall = true
		}
		var blipJson = {}
		try {
			blipJson = JSON.parse(fs.readFileSync(jsonPath))
		} catch (error) {
			console.log(error)
			return
		}

		if (!blipJson) {
			console.log('Unable to parse BlipJSON')
			return
		}
		var addstandardtracking = require ('./Modules/addstandardtracking')
        addstandardtracking.addstandardtrackingscript(blipJson,addtoall)
        blipJson = JSON.parse(fs.readFileSync('./output/ProcessedFileWithTrackingScripts.json'))
        var sessionId = require ('./Modules/addsessionid')
        sessionId.addsessionidscript(blipJson)

	} catch (error) {
		console.log(error)
	}
}




addtrackingandsession()