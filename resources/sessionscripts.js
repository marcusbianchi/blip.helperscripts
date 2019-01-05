const getSessionScripts = () => {
    return [
            {
                "type": "ExecuteScript",
                "$title": "Executar script - sessionId",
                "$invalid": false,
                "settings": {
                    "function": "run",
                    "source": "\nfunction run(lastUserInteraction,sessionTime,sessionId) {\n    var curTime = (new Date()).getTime()\n    if(curTime - lastUserInteraction > sessionTime){\n        function s4() {\n            return Math.floor((1 + Math.random()) * 0x10000)\n            .toString(16)\n            .substring(1);\n        }\n        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();\n    }\n    return sessionId\n}",
                    "inputVariables": [
                        "lastUserInteraction",
                        "config.sessionTime",
                        "sessionId"
                    ],
                    "outputVariable": "sessionId"
                }
            },
            {
                "type": "ExecuteScript",
                "$title": "Executar script - lastUserInteraction",
                "$invalid": false,
                "settings": {
                    "function": "run",
                    "source": "\nfunction run() {\n    return (new Date()).getTime()\n}",
                    "inputVariables": [],
                    "outputVariable": "lastUserInteraction"
                }
            },
            {
                "type": "ExecuteScript",
                "$title": "Executar script - Update ChatBaseKey",
                "$invalid": false,
                "settings": {
                    "function": "run",
                    "source": "\nfunction run(dynamicChatbaseKey) {\n    return dynamicChatbaseKey \n}",
                    "inputVariables": [
                        "config.chatbasekey"
                    ],
                    "outputVariable": "dynamicChatbaseKey"
                }
            },
            {
                "type": "ExecuteScript",
                "$title": "Executar script - Last User Message",
                "$invalid": false,
                "settings": {
                    "function": "run",
                    "source": "\nfunction run(lastUserMessage) {\n    return lastUserMessage;\n}",
                    "inputVariables": [
                        "input.content"
                    ],
                    "outputVariable": "lastUserMessage"
                }
            }
        ]
}

module.exports.getSessionScripts = getSessionScripts