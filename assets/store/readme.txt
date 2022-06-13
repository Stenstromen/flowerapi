Registration required!:

POST /register -     (Request)
               {
                     "username": "STRING",
                     "email": "STRING",
                     "password": "STRING               
               }
                     (Response)
               {
                     "username": "STRING",
                     "email": "STRING",
                     "password": "STRING MD5SUM"
               }

Login:

POST /login    -     (Request)
               {
                     "email": "STRING",
                     "password": "STRING               
               }
                     (Response)
                     "Long Bearer token"

Check User DB (Requires Bearer token):
GET /welcome   -     (Request)

                     (Response)
                     Current user DB

Set Bearer token <authorization:"Long Bearer token"> for all the following requests.

Quickstart:

GET
/readme         - This Readme!
/flowers        - Get entire DB in JSON
/flowers/{id}   - Get specific JSON Object ID
/flowers/random - Get random JSON Object

POST
/flowers        - Add content using HTTP POST, in format:\
                {
                      "name": "NAME_STRING",
                      "description": "DESCRIPTION_STRING",
                      "author": "AUTHOR_STRING",
                      "imageUrl": "IMAGEURL_STRING"
                }

DELETE
/flowers/{id}   - Remove content using HTTP DELETE 

PUT 
/flowers/{id}   - Overwrite existing JSON Object using HTTP PUT, in format :\
                {
                      "name": "NAME_STRING",
                      "description": "DESCRIPTION_STRING",
                      "author": "AUTHOR_STRING",
                      "imageUrl": "IMAGEURL_STRING"
                }

PATCH
/flowers/{id}   - Partialy change JSON Object using HTTP PATCH, in format (ex):\
                {
                      "name": "NEW_NAME_STRING",
                      "imageUrl": "NEW_IMAGEURL_STRING"
                }