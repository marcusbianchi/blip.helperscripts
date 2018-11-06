exports.checkbotinteraction = function (searchObject) {
    var actions = searchObject['$contentActions']
    if (actions) {
        for (let index = 0; index < actions.length; index++) {      
            const element = actions[index];
            
            if (element['action'] && element['action']['type'] =='SendMessage') {
                
                return true;
            }
        }
    }
    return false
}