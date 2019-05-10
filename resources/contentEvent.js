const getcontentEvent = () => {
    return {
        "type": "TrackEvent",
        "$title": "Registro de eventos - Conteudo",
        "$invalid": false,
        "settings": {
            "extras": {
                "userId": "{{contact.identity}}",
                "originatorMessageId": "{{input.message@id}}",
                "userEmail": "{{contact.email}}",
                "userName": "{{contact.name}}",
                "sessionId": "{{sessionId}}"
            },
            "category": "Cartao pre-pago - cliques",
            "action": "{{inputContentSubstring}}"
        }
    }
}
module.exports.getcontentEvent = getcontentEvent