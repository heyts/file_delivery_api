#!/bin/bash

curl -H "Content-Type: application/json" -d '{"name": "A"}' localhost:3000/host
curl -H "Content-Type: application/json" -d '{"name": "B"}' localhost:3000/host
curl -H "Content-Type: application/json" -d '{"name": "C"}' localhost:3000/host
curl -H "Content-Type: application/json" -d '{"name": "D"}' localhost:3000/host
curl -H "Content-Type: application/json" -d '{"name": "E"}' localhost:3000/host
curl -H "Content-Type: application/json" -d '{"name": "F"}' localhost:3000/host
curl -H "Content-Type: application/json" -d '{"name": "G"}' localhost:3000/host
curl -H "Content-Type: application/json" -d '{"name": "H"}' localhost:3000/host

curl -H "Content-Type: application/json" -d '{"origin": "A", "destination": "B", "description": "scp"}' localhost:3000/link
curl -H "Content-Type: application/json" -d '{"origin": "B", "destination": "C", "description": "ftp"}' localhost:3000/link
curl -H "Content-Type: application/json" -d '{"origin": "B", "destination": "D", "description": "ftp"}' localhost:3000/link
curl -H "Content-Type: application/json" -d '{"origin": "A", "destination": "D", "description": "scp"}' localhost:3000/link
curl -H "Content-Type: application/json" -d '{"origin": "C", "destination": "D", "description": "rsync"}' localhost:3000/link
curl -H "Content-Type: application/json" -d '{"origin": "D", "destination": "E", "description": "samba"}' localhost:3000/link
curl -H "Content-Type: application/json" -d '{"origin": "F", "destination": "G", "description": "scp"}' localhost:3000/link
curl -H "Content-Type: application/json" -d '{"origin": "F", "destination": "H", "description": "scp"}' localhost:3000/link
curl -H "Content-Type: application/json" -d '{"origin": "G", "destination": "H", "description": "rsync"}' localhost:3000/link
