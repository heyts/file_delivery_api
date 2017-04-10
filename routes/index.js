var express = require('express');
var router = express.Router();
var Link = require('../models/link');

// Links contains instances of the Link class
var links = [];

// To keep the design lean and simple, `hosts` will be an array of strings,
// in this case. Each string representing a unique hostname. We just need 
// to ensure that a given hostname is unique.
//
// In a production settings, however, each host is likely to containes more than an 
// identifier (SSH keys, login, password, etc.) so it probably should be expanded into
// a class in the future as needed.

var hosts = [];

router.post('/host', function(req, res, next) {
    // a name is currently any string of characters
    if (!req.body.name) throw new Error('parameter `name` is required');
    
    // If the host to be added already exist, we send back status 409 Conflict
    if (hosts.includes(req.body.name)) return res.status(409).end();
    
    // Else we add the host to the hosts array and return a 201 Created status
    hosts.push(req.body.name)
    return res.status(201).end();
});

router.get('/hosts', function(req, res, next) {
  return res.json(hosts);
});

router.post('/link', function(req, res, next) {
  // If origin doesnt exist in hosts throw an error
  if (!req.body.origin) throw new Error('Missing required parameter: `origin`')
  if (!req.body.destination) throw new Error('Missing required parameter: `destination`')
  if (!req.body.description) throw new Error('Missing required parameter: `description`')
  
  // We need to check origin and destination against hosts
  if (!(hosts.includes(req.body.origin))) throw new Error('Host ' + req.body.origin + ' not found');
  if (!(hosts.includes(req.body.destination))) throw new Error('Host ' + req.body.destination + ' not found');
  
  // Ideally we would need to ensure the link doesn't already exist
  // and reject the link if it does 
  var link = new Link({ origin: req.body.origin, destination: req.body.destination, description: req.body.description });
  links.push(link);
  return res.json(link.asObject());
});

router.get('/links', function(req, res, next) {
  return res.json(links.map(function (link) { return link.asObject() }));
});

// If empty, returns an empty array
router.get('/path/:origin/to/:destination', function(req, res, next) {
    if (!hosts.includes(req.params.origin)) throw new Error('Origin Host ' +  req.params.origin + ' does not exist')
    if (!hosts.includes(req.params.destination)) throw new Error('Destination Host ' +  req.params.destination + ' does not exist')
    
    var graph = buildGraph();
    var resp = findInGraph(req.params.origin, req.params.destination, graph);
    return res.json(resp);
});

function buildGraph() {
    var graph = {};
    
    hosts.forEach(function (host) {
        graph[host] = [];
    });
    links.forEach(function (link) {
        graph[link.options.origin].push(link);
    });
    return graph;
}

// edge , graph, children
function findInGraph(origin, destination, graph) {
    var stack = [];
    var visited = [];
    var result = {};
    
    graph[origin].forEach(function (node) {
        stack.push(node); 
    });
    
    while (stack.length) {
        var node = stack.shift();
        if (!visited.includes(node.options.destination)) {
            if (node.options.destination === destination) {
                result[node.options.origin] = node.asObject();
                var resultArr = [];
                
                for (var key in result) {
                    resultArr.push(result[key]);
                }
                return resultArr;

            } else {
                if (graph[node.options.destination].length) result[node.options.origin] = node.asObject();
                graph[node.options.destination].forEach(function (child) {
                    stack.push(child); 
                });
                visited.push(node.options.destination); 
            }
        }
    }
    return [];
};

module.exports = router;
