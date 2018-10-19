var addsessionidtoscripts = function () {
    try {
      var fs = require('fs')
      var jsonPath = process.argv[2]     
  
      var blipJson = {}
  
      try {
        blipJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
      } catch (error) {
        console.log(error)
      }
  
      if (!blipJson) {
        console.log('Unable to parse BlipJSON')
        return null
      }
      Object.keys(blipJson).forEach(function (k) {
        var blipblock = blipJson[k]
        blipblock['$leavingCustomActions'] = ReplaceExtras(blipblock['$leavingCustomActions'])
        blipblock['$enteringCustomActions'] = ReplaceExtras(blipblock['$enteringCustomActions'])
      })
      fs.writeFileSync('ProcessedFileWithIdInScripts.json', JSON.stringify(blipJson),{encoding:'utf8',flag:'w+'})
    } catch (error) {
        console.log(error)
    }
  }
  
  function ReplaceExtras (searchObject,) {
    Object.keys(searchObject).forEach(function (k) {
      var searchArea = searchObject[k]
      if (searchArea['type'] && searchArea['type'] === 'TrackEvent') {
          searchArea['label'] = "{{sessionId}}"
      }
    })
    return searchObject
  }
  
  addsessionidtoscripts()
  