exports.addusernavigationhistory = (function () {    
    function InsertUserNavigationHistory(selectedCard) {
        var historyNavigationScript = {
            "type": "ExecuteScript",
            "$title": "Executar script",
            "$invalid": false,
            "settings": {
                "function": "run",
                "source": "/**\n            * All input variables needs to be passed as function param;\n            * Objects received as param needs to be parsed. Ex.: JSON.parse(inputVariable1);\n            * Objects returned needs to be stringfied. Ex.: JSON.stringify(inputVariable1);\n            **/\n            function run(input) {\n                let json = JSON.parse(input);\n                return json.id;\n            }",
                "inputVariables": [
                    "input.message"
                ],
                "outputVariable": "messageId"
            }
        }

        var historyNavigationRequest = {
            "type": "ProcessHttp",
            "$title": "Requisição HTTP - User Navigation",
            "$invalid": false,
            "settings": {
                "headers": {
                    "Content-Type": "application/json"
                },
                "method": "POST",
                "body": "{\n\t\"UserIdentity\": \"{{contact.identity}}\",\n  \"MessageId\": \"{{messageId}}\",\n  \"UserLastState\": \"{{lastState}}\",\n  \"InteractionDate\": \"{{calendar.datetime}}\", \n  \"IsCustomer\": \"{{flagCustomer}}\", \n \"BotIdentity\": \"{{config.BotIdentifier}}\"\n}",
                "uri": "{{config.userNavigationAPI}}/BlipInteraction",
                "responseStatusVariable": "apiStatus",
                "responseBodyVariable": "apiResponse"
            }
        }

        // selectedCard['$enteringCustomActions'].push(historyNavigationScript)
        selectedCard['$enteringCustomActions'].push(historyNavigationRequest)
        return selectedCard
    }
    
	return function (blipJson, addToAll, addJustUserInteraction) {

        try {
            
            Object.keys(blipJson).forEach(function(k) {
                var blipblock = blipJson[k]
                if (k !== 'onboarding' & blipblock['$title'].indexOf('[') !== -1)
                    InsertUserNavigationHistory(blipblock)
            })
            return blipJson;

        } catch (error) {
            console.log(error)
        }
    }
})()