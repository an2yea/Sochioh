const queue = require('../config/kue');
const commentMailer = require('../mailers/commentMailer');

queue.process('emails', function(job,done)
{
    console.log("Email worker processing Jobs", job.data);

    commentMailer.newComment(job.data);

    done();
})