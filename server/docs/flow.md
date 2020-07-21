#Server
##Flow
  Incoming request ->
  App Middlewares (cors, compression, profilers, time limiters, etc.) ->
  Business Middlewares (authenticate, authorize, validateInput, etc.) ->
  Controllers (get, patch, put, post, delete) ->
  Services (will carry all business logic, if there is something too specialized separated in an internal service, example: manipulate data, images, send an email, etc., this services will add in case of failure an internal stack called point of failure)

##Definitions

###App Middlewares 