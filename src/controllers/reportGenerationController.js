var mongoose = require('mongoose'), StudentMarks = mongoose.model('StudentMarks'), Students = mongoose.model('Students');

exports.generateReports = async function(_req, res) {
    var reportCount = 0;
    var studentReportsFinal = [];
    var resultStudents = [];
    var resultMarks = [];

    Students.find({}, async function (err, students) {
        try {
            if (err)
                res.send(err);
            for (const element of students) {
                StudentMarks.find({studentId: element.studentId}, async function(err, marks) {
                    resultMarks= await marks;
                    console.log(resultMarks);
                    if(marks.length >0){
                        if (err){
                            res.send(err);
                        }else{
                            const stud = {
                                studentName: element.name+' '+element.surname,
                                results: marks
                            };
                            studentReportsFinal.push(stud);
                        }
                    }
                    console.log('-----Inside----->>>>>>>'); 
                });
                console.log('-----Outside----->>>>>>>'); 
                console.log(studentReportsFinal); 
                reportCount = reportCount + 1;
            }
            // students.forEach(element => );

            res.send(
                {
                    'reportsGenerated':reportCount,
                    'results': studentReportsFinal,
                    'success':true
                }
            );
        } catch (error) {
            console.log(error);
            res.send({success:false, message:'Oops, an internal error occured. We are fixing it'});
        }
    });
};

exports.generateSingleChildReport = async function(req, res) {
    var reportCount = 0;
    var studentReportsFinal = [];
    var resultStudents = [];
    var resultMarks = [];
    try {
        StudentMarks.find({studentId: req.params.studentId}, async function(err, marks) {
            resultMarks= marks;
            if(marks.length >0){
                if (err){
                    res.send(err);
                }else{
                    const stud = {
                        studentName: element.name+' '+element.surname,
                        results: marks
                    };
                    studentReportsFinal.push(stud);
                }
            }
        });
        console.log(studentReportsFinal); 
        reportCount = reportCount + 1;

        res.send(
            {
                'reportsGenerated':reportCount,
                'results': studentReportsFinal,
                'success':true
            }
        );
        
    } catch (error) {
        console.log(error);
        res.send({success:false, message:'Oops, an internal error occured. We are fixing it'});
    }

};