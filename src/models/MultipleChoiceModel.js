const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    testTitle:{
        type:String,
        required: "The title is required"
    },
    subjectCode:{
        type: String,
        required: 'Kindly enter the subject'
    },
    questionsList:[
        {
            question: {
                type: String,
                required: 'Kindly enter the question'
            },
            choice: {
                type: String
            }, 
            alternatives: [
                {
                    text: {
                        type: String,
                        required: true
                    },
                    isCorrect: {
                        type: Boolean,
                        required: true,
                        default: false
                    }
                }
            ]
        }
    ]
})

module.exports = mongoose.model('Question', QuestionSchema)