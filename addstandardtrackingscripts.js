var fs = require('fs')

var addstandardtrackingscripts = function() {

    tagChooseAnswer = {}
    tagChooseAnswer['background'] = "#FFBC00"
    tagChooseAnswer['label'] = "ChooseAnswerScripts"
    tagChooseAnswer['canChangeBackground'] = false;
    tagChooseAnswer['id'] = "blip-tag-ce6a9901-5a79-4096-9305-eb072c1e5e34";

    tagInputScripts = {}
    tagInputScripts['background'] = "#CCA2E1"
    tagInputScripts['label'] = "InputScripts"
    tagInputScripts['canChangeBackground'] = false;
    tagInputScripts['id'] = "blip-tag-8cc68c9d-bdf1-45ef-95b7-7824d8eef532";

    taglastStateUpdateEventScript = {}
    taglastStateUpdateEventScript['background'] = "#1FE5BD"
    taglastStateUpdateEventScript['label'] = "LastStateUpdateScript"
    taglastStateUpdateEventScript['canChangeBackground'] = false;
    taglastStateUpdateEventScript['id'] = "blip-tag-62d0f16e-9923-4f7d-b397-fb22de20d57c";

    try {
        var enteringTrackingEvents = JSON.parse(fs.readFileSync('./resources/enteringTrackingEvents.json', 'utf8'))
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
        }

        if (!blipJson) {
            console.log('Unable to parse BlipJSON')
            return null
        }
        Object.keys(blipJson).forEach(function(k) {
            var blipblock = blipJson[k]
            var name = ""
            if(!addtoall)
                name = blipblock['$title'].substring(blipblock['$title'].search(" ") + 1, blipblock['$title'].length).toLowerCase()            
            else{
                if(blipblock['$title'].search('\\]') == -1){
                    name = blipblock['$title'].toLowerCase()
                }
                else{
                    name = blipblock['$title'].substring(blipblock['$title'].search("\\]") + 1, blipblock['$title'].length).toLowerCase()            
                }
            }
            if (blipblock['$title'].search('\\[') != -1|| addtoall) {
                var previousSaved = savePreviousActions(blipblock,name)
                blipblock['$enteringCustomActions'] = []
                blipblock['$tags'] = []
                blipblock['$leavingCustomActions'] = []
                blipblock = AddInputScripts(blipblock, enteringTrackingEvents, name, k, tagInputScripts)
                var possibleAnswers = searchUserInput(blipblock)

                if (possibleAnswers.length > 0) { //add only to interaction blocks    
                    blipblock = AddChooseAnswerScript(blipblock, name, possibleAnswers, tagChooseAnswer)
                }
                if (blipblock['$title'].search('\\[E') == -1 || addtoall)
                    blipblock = UpdateLastStateEvent(blipblock, taglastStateUpdateEventScript, name)
                blipblock = addPreviousScripts(blipblock,previousSaved)
            }


        })
        if(!addtoall){
            var previousSaved = savePreviousActions(blipJson["onboarding"],"onboarding")
            blipJson["onboarding"]['$enteringCustomActions'] = []
            blipJson["onboarding"]['$tags'] = []
            blipJson["onboarding"]['$leavingCustomActions'] = []
            blipJson["onboarding"] = UpdateLastStateEvent(blipJson["onboarding"], taglastStateUpdateEventScript, "onboarding")
            blipJson["onboarding"] = addPreviousScripts(blipJson["onboarding"],previousSaved)
        }
        fs.writeFileSync('./output/ProcessedFileWithTrackingScripts.json', JSON.stringify(blipJson), {
            encoding: 'utf8',
            flag: 'w+'
        })
    } catch (error) {
        console.log(error)
    }
}

function UpdateLastStateEvent(selectedCard, taglastStateUpdateEventScript, name) {
    var lastStateUpdateEventScript = JSON.parse(fs.readFileSync('./resources/lastStateUpdateEventScript.json', 'utf8'))
    lastStateUpdateEventScript['settings']['source'] = lastStateUpdateEventScript['settings']['source'].replace('#LastState#', "\"" + name.toLowerCase() + "\"");
    selectedCard['$leavingCustomActions'].push(lastStateUpdateEventScript)
    selectedCard['$tags'].push(taglastStateUpdateEventScript)
    return selectedCard
}

function AddInputScripts(selectedCard, enteringTrackingEvents, blockName, key, tagInputScripts) {
    enteringTrackingEvents[0]['settings']['category'] = blockName.toLowerCase() + " - origem"
    enteringTrackingEvents[1]['settings']['category'] = blockName.toLowerCase()
    if (key != "onboarding")
        selectedCard['$enteringCustomActions'] = JSON.parse(JSON.stringify(enteringTrackingEvents))
    else {
        selectedCard['$enteringCustomActions'] = JSON.parse(JSON.stringify([enteringTrackingEvents[1]]))
    }
    selectedCard['$tags'].push(tagInputScripts)
    return selectedCard
}

function AddChooseAnswerScript(selectedCard, blockName, possibleAnswers, tagChooseAnswer) {
    var possibleAnswersStr = JSON.stringify(possibleAnswers)
    var chooseAnswerScript = JSON.parse(fs.readFileSync('./resources/chooseAnswerScript.json', 'utf8'))
    var chooseAnswerEvent = JSON.parse(fs.readFileSync('./resources/chooseAnswerEvent.json', 'utf8'))
    chooseAnswerScript['settings']['source'] = chooseAnswerScript['settings']['source'].replace('#cs1#', possibleAnswersStr);
    chooseAnswerEvent['settings']['category'] = blockName.toLowerCase() + " - cliques"
    selectedCard['$leavingCustomActions'] = JSON.parse(JSON.stringify([chooseAnswerScript, chooseAnswerEvent]))
    selectedCard['$tags'].push(tagChooseAnswer)

    return selectedCard
}

function addPreviousScripts(selectedCard,previousSaved){
    previousSaved['leavingCustomActions'].forEach(function(action){
        selectedCard['$leavingCustomActions'].push(action)
    })
    previousSaved['enteringCustomActions'].forEach(function(action){
        selectedCard['$enteringCustomActions'].push(action)
    })
    previousSaved['tags'].forEach(function(tag){
        selectedCard['$tags'].push(tag)
    })
    return selectedCard
}

function savePreviousActions(selectedCard, blockName){
    previousSaved = {}
    //enteringCustomActions
    previousSaved['enteringCustomActions'] = []
    selectedCard['$enteringCustomActions'].forEach(function(action){
        if(action['settings']['category']){
            if(action['settings']['category']===blockName)
                return
            if(action['settings']['category'].search(" - origem")!= -1)
                return
        }
        previousSaved['enteringCustomActions'].push(action)
    })
    //leavingCustomActions
    previousSaved['leavingCustomActions'] = []
    selectedCard['$leavingCustomActions'].forEach(function(action){      
        if(action['title']==='Executar script - Choose Answer')
                return
        if(action['settings']['category']){
            if(action['settings']['category'].search(" - cliques")!= -1)
                return
        }
        previousSaved['leavingCustomActions'].push(action)
    })
    //tags
    previousSaved['tags'] = []
    selectedCard['$tags'].forEach(function(tag){
        if(tag['label']==='ChooseAnswerScripts' ||
           tag['label']==='InputScripts'||
           tag['label']==='LastStateUpdateScript')
            return
        previousSaved['tags'].push(tag)
    })
    return previousSaved
}

function searchUserInput(searchObject) {
    var actions = searchObject['$contentActions']
    var possibleAnswers = []
    if (actions) {
        for (let index = 0; index < actions.length; index++) {
            const element = actions[index];

            if (element['action'] &&
                element['action']['settings'] &&
                element['action']['settings']['content'] &&
                element['action']['settings']['content']['options']) {
                for (let j = 0; j < element['action']['settings']['content']['options'].length; j++) {
                    const element1 = element['action']['settings']['content']['options'][j];
                    possibleAnswers.push(element1['text'])

                }
            } else if (element['action'] &&
                element['action']['settings'] &&
                element['action']['settings']['content'] &&
                element['action']['settings']['content']['items']) {
                for (let k = 0; k < element['action']['settings']['content']['items'].length; k++) {
                    const element2 = element['action']['settings']['content']['items'][k];
                    if (element2['options']) {
                        for (let n = 0; n < element2['options'].length; n++) {
                            const element3 = element2['options'][n];
                            if (element3['label']['type'] == 'text/plain') {

                                possibleAnswers.push(element3['label']['value'])
                            }
                        }
                    }
                }
            }


        }
    }

    return possibleAnswers
}



addstandardtrackingscripts()