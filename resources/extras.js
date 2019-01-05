const getExtrasScripts = () => {
    return JSON.parse({
        "userId": "{{contact.identity}}",
        "originatorMessageId": "{{input.message@id}}",
        "userEmail": "{{contact.email}}",
        "userName": "{{contact.name}}",
        "sessionId": "{{sessionId}}"
    })
}

module.exports.getExtrasScripts