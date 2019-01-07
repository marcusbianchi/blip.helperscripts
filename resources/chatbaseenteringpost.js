const getChatBaseEnteringPostScript = () =>{
    return {
        "type": "ProcessHttp",
        "$title": "Requisição HTTP - ChatBase Integration User",
        "$invalid": false,
        "settings": {
            "headers": {},
            "method": "POST",
            "body": "{\n    \"api_key\": \"{{dynamicChatbaseKey}}\",\n    \"type\": \"user\",\n    \"user_id\": \"{{contact.identity}}\",\n    \"time_stamp\": \"{{currentTime}}\",\n    \"platform\": \"{{config.platform}}\",\n    \"message\": \"{{lastUserMessage}}\",\n    \"intent\": \"#intent#\",\n    \"version\": \"{{config.version}}\",\n    \"session_id\": \"{{sessionId}}\"\n}\n",
            "uri": "{{config.chatbaseURL}}"
        }
    }
}

module.exports.getChatBaseEnteringPostScript = getChatBaseEnteringPostScript