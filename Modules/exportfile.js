exports.savefile = (function () {
    var fs = require('fs');

    return function (blipJson) {
        try {
            console.log('entrou aqui');
            fs.writeFileSync('./output/flow.json', JSON.stringify(blipJson), {
                encoding: 'utf8',
                flag: 'w+'
            })
        } catch (error) {
            console.log(error);
        }
    }
})()