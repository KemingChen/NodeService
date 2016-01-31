var exec = require('exec');
var path = require('path');
var promise = require('promise');
var fs = require('fs');


module.exports = function(root, express) {
    var service = express();
    service.get('*.js', handleJsFile);
    service.get('*', handleOtherFile);

    return service;

    ////////

    function handleOtherFile(req, res) {
        res.status(403);
        res.send("Node Execute Error!!!");
    }

    function handleJsFile(req, res) {
        var filePath = path.join(root, req.params[0]);
        var query = req.query;
        if (fs.existsSync(filePath + ".js")) {
            node(filePath).then(function(data) {
                res.send(data.replace(/\n/g, "<br />"));
            });
        } else {
            res.sendStatus(404);
        }
    }

    function node(filePath) {
        return new promise(function(resolve, reject) {
            exec(["node", filePath], function(err, out, code) {
                resolve(err ? err : out);
            });
        });
    }
};
