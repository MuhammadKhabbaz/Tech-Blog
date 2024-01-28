const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models/index');
const withAuth = require('../utils/auth')

//get all posts for homepage
router.get('/', async (req, res) => {
    console.log('Logged in status:', req.session.logged_in);
    console.log(req.session)
    try {

        // Fetch the latest blog posts
        const postData = await Post.findAll({
            include: [
                {
                  model: User,
                  as: 'user',
                  attributes: ['name']
                },
                {
                    model: Comment,
                    as: 'comments',
                    attributes: ['comment'],
                    include: [
                      {
                        model: User,
                        as: 'user',
                        attributes: ['name']
                      }
                    ]
                }
            ]
        });

        // Convert the postData into a plain object to handlebars can render it
        const posts = postData.map((post) => post.get({ plain: true }));
        const loggedIn = req.session.logged_in || false;
        // Render the homepage template with the posts data
        res.render('homepage', {
            posts,
            logged_in: loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET one gallery
// Use the custom middleware before allowing the user to access the gallery
router.get('/posts/:id', withAuth, async (req, res) => {
    try {
        const postId = req.params.id;
        const postData = await Post.findByPk(postId, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name'] // Include user's name
                },
                {
                    model: Comment,
                    include:[{model: User, as: 'user', attributes:['name']}]
                }
            ]
        });

        if (postData) {
            const post = postData.get({ plain: true });
            res.render('post', { post, logged_in: req.session.logged_in }); // Render the post.handlebars page with the post data
        } else {
            res.status(404).send('Post not found');
        }
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).send('Server Error');
    }
});

router.get('/api/users/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login', { onLoginPage: true });
});

module.exports = router;
