var addsessionidscript = function () {
  try {
    var fs = require('fs')
    var sessionscripts = JSON.parse(fs.readFileSync('./resources/sessionscripts.json', 'utf8'))
    var jsonPath = process.argv[2]
    var replace = true
    if (process.argv[3] && process.argv[3] === 'a') {
      replace = false
    }

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
    Object.keys(blipJson).forEach(function (k) {
      var blipblock = blipJson[k]
      if(searchUserInput(blipblock))
      {
        AddScripts(blipblock,sessionscripts)
      }
      
    })
    fs.writeFileSync('./output/ProcessedFileWithId.json', JSON.stringify(blipJson),{encoding:'utf8',flag:'w+'})
  } catch (error) {
      console.log(error)
  }
}

function AddScripts (selectedCard, sessionscripts) {
  for (let index = sessionscripts.length-1; index >= 0; index--) {
    const element = sessionscripts[index];  
    selectedCard['$leavingCustomActions'].unshift(element)  
  }
  return selectedCard
}

function searchUserInput (searchObject) {
    var actions  = searchObject['$contentActions']
    if(actions){
      const element = actions[actions.length-1];
      if (element['input']){
       if(!element['input']['bypass'])
          return true;
      }         
    }  
  return false
}


addsessionidscript()


