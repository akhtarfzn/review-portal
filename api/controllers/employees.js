const bcrypt = require('bcrypt');
const config = require('config');
// const Employee = require('../schemas/employee');
const model = require('../models')
const jwtHandler = require('../jwtHandler');
class Employee {
    
    constructor(){
        console.log("reached controller")
    }

    async create(req,res) {
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        let employeeObj ={
            firstName: req.body.firstName,
            lastName : req.body.lastName,
            email: req.body.email,
            designation: req.body.designation,
            password:req.body.password,
            reviewer : req.body.reviewer,
            qualityAnalyst : req.body.qualityAnalyst,
        }
        console.log(employeeObj);
        const employee= await model.employee.save(employeeObj)
        res.send(employee)
    }
  
    async show(req,res){
        console.log("Reached SHOW");
        const employee = await model.employee.getUserData({"_id": req.params.id})
        res.send(employee[0]);
    }


    async index(req,res){
        const employeeList = await model.employee.get();
        res.send(employeeList);
    }

    async showUser(req,res){
        const employee = await model.employee.get({_id: req.params.parameter})
        res.send(employee[0])
    }

    async update(req,res) {
        let updateObj= req.body;
        console.log(updateObj);
        const employee= await model.employee.update({_id: req.params.parameter},  updateObj);
        res.send(employee);
    }    

    async delete(req,res){
        console.log(req.params.parameter);
        const employee =await model.employee.delete({_id: req.params.parameter});
        res.send("deleted");
    }
 
    async login(req, res) {
        //Verify token here
        let user = await model.employee.get({$and : [{"email": req.body.email},{"password": req.body.password}]
                                                }, 
                                                {"email": 1,
                                                "firstName": 1,
                                                "lastName": 1,
                                                "totalExperience": 1,
                                                "phoneNo": 1,
                                                "_id": 1,
                                                "designation": 1
                                            });
        console.log(user);
        if(user != null || user != []){
            let token = jwtHandler.tokenGenerator(user);
            if(token != null){
                res.status(200).send(token);
                console.log(token);   //mine
            }
        }
        else{
            res.status(401).send("Unauthorized, Invalid Username or Password");
            console.log("token is null");    //mine
        }
    }
}

module.exports = new Employee();
