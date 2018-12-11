exports.addlaststatescript = (function () {
    var fs = require('fs')
    var checkuserinteraction = require('./checkuserinteraction')
    var checkbotinteraction = require('./checkbotinteraction')

    var taglastStateUpdateEventScript = {}
    taglastStateUpdateEventScript['background'] = "#1FE5BD"
    taglastStateUpdateEventScript['label'] = "LastStateUpdateScript"
    taglastStateUpdateEventScript['canChangeBackground'] = false;
    taglastStateUpdateEventScript['id'] = "blip-tag-62d0f16e-9923-4f7d-b397-fb22de20d57c";

    function UpdateLastStateEvent(selectedCard, taglastStateUpdateEventScript, name) {
        var lastStateUpdateEventScript = JSON.parse(fs.readFileSync('./resources/lastStateUpdateEventScript.json', 'utf8'))
        lastStateUpdateEventScript['settings']['source'] = lastStateUpdateEventScript['settings']['source'].replace('#LastState#', "\"" + name.toLowerCase() + "\"");
        selectedCard['$leavingCustomActions'].push(lastStateUpdateEventScript)
        selectedCard['$tags'].push(taglastStateUpdateEventScript)
        return selectedCard
    }

    function HasBotOrUserInteraction (blipBlock) {
        return checkuserinteraction.checkuserinteraction(blipBlock) || checkbotinteraction.checkbotinteraction(blipBlock);
    }
    
	return function (blipJson, addToAll, addJustUserInteraction) {

        try {
            
            Object.keys(blipJson).forEach(function(k) {
                var blipblock = blipJson[k]
                var name = blipblock['$title'].substring(blipblock['$title'].search(" ") + 1, blipblock['$title'].length).toLowerCase()
                if (addToAll && !addJustUserInteraction) {
                    blipblock = UpdateLastStateEvent(blipblock, taglastStateUpdateEventScript, name)
                } else if (addToAll && addJustUserInteraction && HasBotOrUserInteraction(blipblock))  {
                    blipblock = UpdateLastStateEvent(blipblock, taglastStateUpdateEventScript, name)
                } else if (blipblock['$title'].search('\\[') != -1 && blipblock['$title'].search('\\[E') == -1) {
                    blipblock = UpdateLastStateEvent(blipblock, taglastStateUpdateEventScript, name)
                }
            })

            blipJson["onboarding"] = UpdateLastStateEvent(blipJson["onboarding"], taglastStateUpdateEventScript, "onboarding")
    
            return blipJson;

        } catch (error) {
            console.log(error)
        }
    }
	
})()