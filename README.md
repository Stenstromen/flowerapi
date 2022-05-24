# FlowerAPI

[![Flower](https://raw.githubusercontent.com/Stenstromen/stenstromen.github.io/main/public/img/flower.jpg)](https://raw.githubusercontent.com/Stenstromen/stenstromen.github.io/main/public/img/flower.jpg)

FlowerAPI, API for fetching beautiful flower pics <3

## Quickstart
```
Quickstart:

GET
/api/readme   - This Readme!
/api/all      - Get entire DB in JSON
/api/id       - Get specific JSON Object ID
/api/rnd      - Get random JSON Object

POST
/api/add      - Add content using HTTP POST, in format:\
              {
                    "name": "NAME_STRING",
                    "description": "DESCRIPTION_STRING",
                    "author": "AUTHOR_STRING",
                    "imageUrl": "IMAGEURL_STRING"
              }

DELETE
/api/id/{id}  - Remove content using HTTP DELETE 

PUT 
/api/add/{id} - Overwrite existing JSON Object using HTTP PUT, in format :\
              {
                    "id": INT,
                    "name": "NAME_STRING",
                    "description": "DESCRIPTION_STRING",
                    "author": "AUTHOR_STRING",
                    "imageUrl": "IMAGEURL_STRING"
              }

PATCH
/api/add/{id} - Partialy change JSON Object using HTTP PATCH, in format (ex):\
              {
                    "name": "NEW_NAME_STRING",
                    "imageUrl": "NEW_IMAGEURL_STRING"
              }
```

## Todo
* Code cleanup!
* Populate assets/img with beautiful flower pics <3 
* Implement config.js (for hostname, port etc)
* Mimic HTTP PUT logic to HTTP POST logic
* Create Dockerfile 

## Done
* Add randomize logic in javascript (GET /rnd)
* Write basic API (GET) in node.js (GET /name, /desc, /author)
* ... Replaced with GET /api/all (WIP, still...)
* Implement HTTP POST to add stuff. Added logic for server to take care of {"id": #}
* Implement HTTP GET for files in assets/img
* Implement HTTP DELETE for deletion of stuff from DB (/api/id/{id})
* Implement HTTP PUT for full DB change (/api/id/{id})
* Implement HTTP PATCH for partial DB changes (/api/id/{id})
* Write API readme

## Nice to Have
* Input validation for HTTP POST/PUT/PATCH (Schema)