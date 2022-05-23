API Docs

Quickstart:

GET
/api/readme   - This Readme!
/api/all      - Get entire DB in JSON
/api/id       - Get specific JSON Object ID
/api/rnd      - Get random JSON Object

POST
/api/add      - Add content using HTTP POST, in format:\
              {
                    "id": INT,
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
