const config = require('config');

const model = require('../models');
const jwtHandler = require('../jwtHandler');

class Review {
    constructor(){
        console.log("reached controller")
    }

    async getById(req,res){
        const reviewData = await model.review.get({"_id": req.params.id});
        console.log(reviewData);
        res.send(reviewData);
    }

    async show(req,res){
        let arr = [];
        let criteria;
        let i = 0; 
        for (const key in req.query) {
            criteria = { };
            criteria[key] = req.query[key];
            arr[i] = criteria;
            i = i + 1;
        } 
        // console.log("---------------------------");
        // console.log(arr);
        // console.log(arr.length);
        if(arr.length == 1){
            const review = await model.review.get(arr[0]);
            // console.log("Length 1",review);
            // console.log(review.length);
            res.send(review);
        }
        else if(arr.length == 2){
            const review = await model.review.get({$and : arr});
            console.log("Length 2", review);
            res.send(review);
        }
    }

    async update(req, res) {
        console.log(req.body);
        const review = await model.review.update({"_id": req.params.id}, req.body);
        res.status(200).send({
            "message": "Updated",
            "Data": review
        });
        // console.log("Reached UPDATE");
        // let updateObj= req.body
        // console.log(updateObj)
        // let arr = [];
        // let criteria;
        // for (const key in req.query) {
        //     // console.log(key, req.query[key]);
        //     criteria = { };
        //     let i = 0;
        //     criteria[key] = req.query[key];
        //     arr[i] = criteria;
        //     i = i + 1;
        // }        
        // console.log(arr);
        // const review= await model.review.update({$and : arr}, updateObj);
        // res.send(review)
    }  

    async createReview(req, res) {
        console.log(req.body);
        let addReview={
            employeeId: req.body.employeeId,
            reviewer: req.body.reviewer,
            qualityAnalyst: req.body.qualityAnalyst,
            reviewCycle: req.body.reviewCycle,
            formName: req.body.formName
        };
        console.log("reached create review");
        const review = await model.review.save(addReview);
        res.send(review);
    }
    
    async getByCgiCode(req,res){
        console.log("Reached Get CGI Code");
        const reviewValues = await model.review.get({"cgiCode": req.params.cgiCode})
        res.send(reviewValues);
    }

}

module.exports = new Review();