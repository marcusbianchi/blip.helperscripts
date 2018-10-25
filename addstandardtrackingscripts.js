var addstandardtrackingscripts = function () {
    try {
      var fs = require('fs')
      var enteringTrackingEvents = JSON.parse(fs.readFileSync('./resources/enteringTrackingEvents.json', 'utf8'))
      var jsonPath = process.argv[2]

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
        var name =   blipblock['$title'].substring(blipblock['$title'].search(" "),blipblock['$title'].length)
          AddInputScripts(blipblock,enteringTrackingEvents,name,k)
          var possibleAnswers = searchUserInput(blipblock)
          if(possibleAnswers.length>0 && blipblock['$title'].search['[']!=-1){ //add only to interaction blocks
              var possibleAnswersStr = JSON.stringify(possibleAnswers).split('"').join('\\\"')
              var chooseAnswerScript = JSON.parse(fs.readFileSync('./resources/chooseAnswerScript.json', 'utf8'))
              var chooseAnswerEvent = JSON.parse(fs.readFileSync('./resources/chooseAnswerEvent.json', 'utf8'))
              chooseAnswerScript['settings']['source'] = chooseAnswerScript['settings']['source'].replace('#cs1#', possibleAnswersStr);
              AddChooseAnswer(blipblock,chooseAnswerScript,name,chooseAnswerEvent)   
          }

          var lastStateUpdateEventScript = JSON.parse(fs.readFileSync('./resources/lastStateUpdateEventScript.json', 'utf8'))
          lastStateUpdateEventScript['settings']['source'] = lastStateUpdateEventScript['settings']['source'].replace('#LastState#', "\""+name+"\"");
          blipblock['$leavingCustomActions'].push(lastStateUpdateEventScript)         
          
          //Add Tags

      })
      fs.writeFileSync('./output/ProcessedFileWithTrackingScripts.json', JSON.stringify(blipJson),{encoding:'utf8',flag:'w+'})
    } catch (error) {
        console.log(error)
    }
  }
  
  function AddInputScripts (selectedCard, enteringTrackingEvents,blockName,key) {    
    enteringTrackingEvents[0]['settings']['category'] = blockName
    enteringTrackingEvents[1]['settings']['category'] = blockName
    if(key!= "onboarding")
      selectedCard['$enteringCustomActions'] = JSON.parse(JSON.stringify(enteringTrackingEvents))
    else{
      selectedCard['$enteringCustomActions'] =  JSON.parse(JSON.stringify([enteringTrackingEvents[1]]))
    }
    return selectedCard
  }

  function AddChooseAnswer (selectedCard, chooseAnswerScript,blockName,chooseAnswerEvent) {    
    chooseAnswerEvent['settings']['category'] = blockName
    selectedCard['$leavingCustomActions'] = JSON.parse(JSON.stringify([chooseAnswerScript,chooseAnswerEvent]))
    return selectedCard
  }
  

    function searchUserInput (searchObject) {
      var actions  = searchObject['$contentActions']
      var possibleAnswers =[]
      if(actions){
        for (let index = 0; index < actions.length; index++) {
          const element = actions[index];

          if(element['action']  && element['action']['settings'] && element['action']['settings']['content'] && element['action']['settings']['content']['options']){
            for (let j = 0; j < element['action']['settings']['content']['options'].length; j++) {
              const element1 = element['action']['settings']['content']['options'][j];
              possibleAnswers.push(element1['text'])
              
            }
          }
        }
      }  
    return possibleAnswers
  }
  
  
  addstandardtrackingscripts()
  
  
  