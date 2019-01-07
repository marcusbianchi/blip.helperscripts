const getChatBaseLeavingPostScript = () => {
    return {
        "type": "ProcessHttp",
        "$title": "Requisição HTTP - ChatBase Integration Bot",
        "$invalid": false,
        "settings": {
            "headers": {},
            "method": "POST",
            "body": "{\n    \"api_key\": \"{{dynamicChatbaseKey}}\",\n    \"type\": \"agent\",\n    \"user_id\": \"{{contact.identity}}\",\n    \"time_stamp\": \"{{currentTime}}\",\n    \"platform\": \"{{config.platform}}\",\n    \"message\": \"#message#\",\n    \"version\": \"{{config.version}}\",\n    \"session_id\": \"{{sessionId}}\"\n}\n",
            "uri": "{{config.chatbaseURL}}"
        }
    }
}

module.exports.getChatBaseLeavingPostScript = getChatBaseLeavingPostScript