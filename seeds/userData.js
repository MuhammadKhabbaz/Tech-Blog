const {User} = require('../models/index');

const userData = [
    {
        name: 'Tech Enthusiast',
        email: 'tech.enthusiast@example.com',
        password: 'Tech123!',
    },
    {
        name: 'Coding Guru',
        email: 'coding.guru@example.com',
        password: 'CodeMaster2024!',
    },
    {
        name: 'Data Wizard',
        email: 'data.wizard@example.com',
        password: 'DataCruncher@2024',
    },
    {
        name: 'Web Dev Genius',
        email: 'webdev.genius@example.com',
        password: 'WebDev$2024',
    },
    {
        name: 'Cloud Architect',
        email: 'cloud.architect@example.com',
        password: 'Cloud#2024',
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers