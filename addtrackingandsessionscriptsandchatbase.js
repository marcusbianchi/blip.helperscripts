var fs = require('fs')

var addtrackingandsessionscriptsandchatbase = function () {

	try {
		var jsonPath = process.argv[2]
		var argv = require('minimist')(process.argv.slice(3));

		var addtoall = false
		if (argv['all']) {
			addtoall = argv['all']
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
		var addchatbaseintegration = require ('./Modules/addchatbaseintegration')
		addchatbaseintegration.addchatbaseintegration(blipJson)
	   
		blipJson = JSON.parse(fs.readFileSync('./output/ProcessedwithChatbase.json'))
		var addstandardtracking = require ('./Modules/addstandardtracking')
		addstandardtracking.addstandardtrackingscript(blipJson,addtoall)
		
        blipJson = JSON.parse(fs.readFileSync('./output/ProcessedFileWithTrackingScripts.json'))
        var sessionId = require ('./Modules/addsessionid')
        sessionId.addsessionidscript(blipJson)

	} catch (error) {
		console.log(error)
	}
}




addtrackingandsessionscriptsandchatbase()