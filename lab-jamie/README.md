# Lab 11: Express
##### January 29, 2018
&nbsp;

## Feature Tasks
&nbsp;
create an HTTP server using express
create a object constructor that creates a simple resource with at least 3 properties
it can not have the same properties as the in-class sample code (other than the id)
a unique _id property should be included (uuid)
include two additional properties of your choice
use the JSON parser included with the body-parser module as a middleware component to parse the request body on POST and PUT routes
use the npm debug module to log the methods in your application
create any npm scripts to automate the development process
persist your API data using the storage module and file system persistence
&nbsp;
## Server Endpoints
/api/v1/simple-resource-name
POST request
pass data as stringifed JSON in the body of a POST request to create a new resource
GET request
pass /:_id as a parameter to retrieve a specific resource (as JSON)
PUT request
pass /:_id as a parameter with a body of data to UPDATE a pre-existing resource
DELETE request
pass /:_id as a parameter to DELETE a specific resource
this should return a 204 status code with no content in the body