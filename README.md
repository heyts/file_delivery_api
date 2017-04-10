## File Delivery API

This is a coding exercise. This is not ready or ever will be ready for any type of production use.

### Installation
- Minimum reqs. : Node 6.9.0 (LTS)
- `npm install`
- `npm start`

### Tests
- Tests can be run: `npm run test`
- Test coverage is insufficient, currently testing only the Link class

### Run
- `npm start`
- Seed data: `./bin/test.sh`
- This creates the data specified in the problem statement

## How it works
- The links endpoint define a directed graph of origins / destinations
- To find the shortest path between two points we can perform a breadth-first search of the graph
- Each origin can only have one Link so we map origins with the most efficient destinations
- We then turns the object into an array of its values
