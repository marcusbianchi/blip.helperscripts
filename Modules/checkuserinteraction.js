exports.checkuserinteraction = function (searchObject) {
    var actions = searchObject['$contentActions']
    if (actions) {
        const element = actions[actions.length - 1];
        if (element['input']) {
            if (element['input']['bypass']==true)
                return false;
        }
    }
    return true
}