var regexifybot = function () {

    var fs = require('fs')
    var jsonPath = process.argv[2]
    var regexify = require ('./Modules/regexify')
    var argv = require('minimist')(process.argv);
    var exportfile = require('./Modules/exportfile')

		if (argv['value']) {
      var result = regexify.regexify.regexifyvalue(argv['value'])
      console.log(result)
      return
		}

    var blipJson = {}

    try {
      blipJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    } catch (error) {
      console.log(error)
    }

    var flow = regexify.regexify.regexifyall(blipJson)

    exportfile.savefile(flow)
   
}

regexifybot()
