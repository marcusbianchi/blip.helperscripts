var fs = require('fs')

var addtrackingandsessionscriptsandchatbase = function () {

	try {
		var jsonPath = process.argv[2]
		var argv = require('minimist')(process.argv.slice(3));
		var exportfile = require('./Modules/exportfile')

		var addtoall = false
		if (argv['all']) {
			addtoall = argv['all']
		}
		var platform = 'Blip chat'
		if (argv['platform']) {
			platform = argv['platform']
		}
		var addContentEvent = false
		if (argv['addContentEvent']) {
			addContentEvent = argv['addContentEvent']
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
		var blipJson = addstandardtracking.addstandardtrackingscript(blipJson,addtoall,addContentEvent)

		var addchatbaseintegration = require ('./Modules/addchatbaseintegration')
		var blipJson = addchatbaseintegration.addchatbaseintegration(blipJson,platform)	
        var sessionId = require ('./Modules/addsessionid')
		var flow = sessionId.addsessionidscript(blipJson)
		
		exportfile.savefile(flow)

	} catch (error) {
		console.log(error)
	}
}




addtrackingandsessionscriptsandchatbase()