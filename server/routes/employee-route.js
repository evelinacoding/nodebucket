"use strict";

const express= require('express');
const router = express.Router();

const { mongo } = require("../utils/mongo");
const createError = require('http-errors')
const Ajv = require('ajv')
const { ObjectId } = require('mongodb'); // require the mongo module from the utils folder
const { EMPTY } = require('rxjs');

const ajv = new Ajv(); //creates a new instance of the Ajv object from the npm package



//Base: http://localhost:3000/api/employees/:empId
//Valid: http://localhost:3000/api/employees/1007

//Invalid http://localhost:3000/api/employees/foo
//^the above would be NAN(not a number)

//Invalid http://localhost:3000/api/employees/9999
//^the above would be 404
//Status code represents the behavior of your API
//They are important for debugging and for the client to know whats wrong

/**
 * findEmployeeById:
 * @openapi
 * /api/employees/{empId}:
 *  get:
 *   summary: An API that returns the employees by empId(employeeId)
 *   description: API for returning a single employee from MongoDB
 *   parameters:
 *     - name: empId
 *       in: path
 *       description: Employee ID
 *       schema:
 *         type: Number
 *   responses:
 *    '200':
 *      description: OK Employee Document
 *    '400':
 *      description: Bad Request
 *    '500':
 *      description: Internal Server Error
 *   tags:
 *    - Get Employee by ID
 */

router.get("/:empId", (req, res, next) => {

  //We need error handling for string values because we only accept Int32 values(numerical values)
  try {
    //Grab empId from the request params
    let { empId } = req.params;
    //ParseInt returns a numerical value or NAN(not a number)
    empId = parseInt(empId, 10)

    // early return - design pattern
    //All you're doing is calling the return statement in the app
    if (isNaN(empId)) {
      console.error("Input must be a number")
      return next(createError(400, "Input must be a number"));
    }

    //database query is handled
    mongo(async db => {
      const employee = await db.collection("employees").findOne({empId});

      if (!employee) {
        //If the employee is not found
        const err = new Error('Unable to find employee with empId ' + empId)
        err.status = 404
        console.log('err', err);
        next(err) //forward the error to the error handler
        return// return to exit the function
      }

      res.send(employee);
      //Represents the next parameter in the get
    }, next)

  } catch(err) {
    console.error("Error", err);
    next(err);
    return
  }
})
/**
 * findAllTasks API
 * @returns JSON array of all tasks
 * @throws { 500 error} - if there is a server error
 * @throws { 400 } - if the employee id is not a number
 * @throws { 404 } - if no tasks are found
 */

/**
 * findAllTasks
 * @openapi
 * /api/employees/{empId}/tasks:
 *  get:
 *   summary: Finds all the tasks by empId
 *   description: API for returning tasks
 *   parameters:
 *     - name: empId
 *       in: path
 *       description: Employee ID
 *       schema:
 *         type: Number
 *   responses:
 *    '200':
 *      description: OK
 *    '400':
 *      description: Bad Request
 *    '404':
 *      description: Not Found
 *    '500':
 *      description: Internal Server Error
 *   tags:
 *    - Find All Tasks
 */

router.get('/:empId/tasks', (req, res, next) => {
  try {

    let { empId } = req.params;
    empId = parseInt(empId, 10); //takes a string value and returns either a number or NAN(not a number)

    //Check to determine if the returned value from parseInt is NaN(data validation)
    if(isNaN(empId)) {
      return next(createError(400, 'Employee ID must be a number'));
    }

    // Call our mongo module and return a list of tasks by employee ID
    mongo(async db => {

      //By using projections you're limiting the amount of checks done in the background
      //You should only return the data that you need
      //Otherwise the request will also take longer
      // Await = waiting for the task to be completed, if we dont use await its possible nothing will be returned
      // ^ means wait for the response from the database, if there is an error it is thrown and that's why we have the catch block
      //The following is a declared variable for the response from the database
      const tasks = await db.collection('employees').findOne({ empId: empId}, { projection: {empId: 1, todo: 1, done: 1}});

      console.log('tasks', tasks);

      //If there are no tasks found for the employee ID; return a 404 error object to our middleware error handler
      if (!tasks) {
        return next(createError(404, `Tasks not found for employee ID ${empId}`));
      }

      //Respond and send the tasks variable
      res.send(tasks)
    }, next)


  } catch(err) {
    console.log('err', err);
    next(err);
  }
})

/**
 * Create Task API
 */



const taskSchema = {
  type: 'object',
  properties: {
    text: { type: 'string' }
  },

  required: ['text'],
  additionalProperties: true
};

/**
 * createTask
 * @openapi
 * /api/employees/{empId}/tasks:
 *   post:
 *     tags:
 *       - Employees
 *     description: Creates a task by empId
 *     summary: Creates task by empId
 *     parameters:
 *        - name: empId
 *          in: path
 *          required: true
 *          description: Create task by empId
 *          schema:
 *            type: number
 *     requestBody:
 *       description: Creates a new task by empId
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Task Created
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Server Exception
 */


router.post('/:empId/tasks', (req, res, next)=> {
  try {

    //Check if the empId from the req params is a number
    let {empId} = req.params;

    //Check to see if the parseInt function returns a number of NaN; if NaN it means the empId is not a number.
    empId = parseInt(empId, 10)

    if(isNaN(empId)) {
      return next(createError(400, 'Employee ID must be a number'));

    }

    mongo(async db => {
      const employee = await db.collection('employees').findOne( { empId: empId });

      //if the employee is not found return a 404 error
      if(!employee) {
        return next(createError(404, 'Employee not found with empId ', empId))
      }

      //this is taking the property text out of the request body. We need the entire payload to validate against the schema
      const { text } = req.body;

      console.log(text)

      //Checks to see if the rules of the taskSchema are being followed
      const validator = ajv.compile(taskSchema);
      const valid = validator(req.body)

      //if the payload is not valid return a 400 error and append the errors to the err.errors property
      if(!valid) {
        return next(createError(400, 'Invalid task payload', validator.errors))
      }

      const newTask = {
        _id: new ObjectId(),
        text: req.body.text
      }
      // whenever you use update one it only returns the
      // call the mongo module and update the employee collection with the new task in the todo column
      const result = await db.collection('employees').updateOne({ empId: empId }, {
        $push: { todo: newTask }

      })

      if(!result.modifiedCount) {
        return next(createError(400, 'Unable to create task'))
      }

      /*
       If only one person knows how to use an API it only benefits that person
       -----------------------------------
       201 means created
       200 means success
       400 means bad request
       401 means unauthorized
       404 means not found
      */

      // Sending ID that was generated
      res.status(201).send( { id: newTask._id })

    })



    //Catch is to catch any errors from mongo
  } catch(err) {
    console.error('err', err);
    next(err)
  }
})


module.exports = router;