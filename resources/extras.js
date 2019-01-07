const getExtrasScripts = () => {
    return {
        "userId": "{{contact.identity}}",
        "originatorMessageId": "{{input.message@id}}",
        "userEmail": "{{contact.email}}",
        "userName": "{{contact.name}}",
        "sessionId": "{{sessionId}}"
    }
}

module.exports.getExtrasScripts = getExtrasScripts