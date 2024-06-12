/**
 * Author: Evelyn Zepeda
 * Title: app.js
 * Date: 6/9/2024
 */
'use strict'

// Require statements
const express = require('express')
const createServer = require('http-errors')
const path = require('path')
const employeeRoute = require("./routes/employee-route");

// Create the Express app
const app = express()

//Swagger API documentation variables from package.json
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

//Swagger object literal/Routing to routes folder
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nodebucket',
      version: '1.00',
    },
  },
  apis: [path.join(__dirname, './routes/*.js')]
}

// Configure the app
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../dist/nodebucket')))
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')))

//Swagger setup/Routing
const openAPISpecification = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openAPISpecification))


//Must be before error handling
app.use("/api/employees", employeeRoute)



// error handler for 404 errors
app.use(function(req, res, next) {
  next(createServer(404)) // forward to error handler
})

// error handler for all other errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500) // set response status code

  // send response to client in JSON format with a message and stack trace
  res.json({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  })
})

module.exports = app // export the Express application