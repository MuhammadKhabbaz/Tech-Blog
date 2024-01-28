const { Post } = require('../models/index')

const postData = [
    {
        title: 'The Future of Technology: AI and Machine Learning',
        blog: "In this blog post, we explore the exciting advancements in artificial intelligence (AI) and machine learning. We'll discuss how these technologies are shaping the future, from smart home devices to self-driving cars. We'll also delve into the ethical considerations and potential impact on various industries.",
        userId:'1',
    },
    {
        title:"Web Development Trends in 2024",
        blog:"As we move further into 2024, several key trends are emerging in the world of web development. This post examines these trends, including the rise of progressive web apps, the increasing importance of responsive design, and the ongoing shift towards serverless architectures.",
        userId:'2',
    },
    {
        title:"The Importance of Cybersecurity in the Digital Age",
        blog:"Cybersecurity is more critical than ever in our increasingly digital world. This post discusses the latest threats in cyberspace, from sophisticated phishing attacks to ransomware. We'll provide tips on how individuals and businesses can protect themselves against these growing threats.",
        userId:'3',
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;