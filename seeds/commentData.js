const { Comment } = require('../models/index');

const commentData = [
    {
        comment:"This article on AI and machine learning is very insightful. It's fascinating to see how these technologies are evolving and what the future might hold.",
        userId:"5",
        postId:"1",
    },
    {
        comment:"Great overview of web development trends! I'm especially interested in how progressive web apps are changing the landscape.",
        userId:"5",
        postId:"2",
    },
    {
        comment:"The points raised about cybersecurity are very pertinent. It's a reminder of how important it is to stay informed about digital threats.",
        userId:"4",
        postId:"3",
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;