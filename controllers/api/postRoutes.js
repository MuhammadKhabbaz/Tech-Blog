const express = require('express');
const router = express.Router();
const { Post, User } = require('../../models/index');
const withAuth = require('../../utils/auth');

router.get('/', async(req,res)=>{
    try{
        const post = await Post.findAll();
        res.json(post);
    }catch (err) {
        res.status(500).json(err); // Send an error response if something goes wrong
    }
})


// Create a new post
router.post('/', withAuth, async (req, res) => {
    try{
        const userId = req.session.user_id;
        const newPost = await Post.create({
            title: req.body.title,
            blog: req.body.blog,
            userId: userId
        });
        res.status(201).json(newPost); // Send the created post back as the response
    } catch (err) {
        res.status(500).json(err); // Send an error response if something goes wrong
    }
});




// Update a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;
        const postId = req.params.id;

        // Fetch the post first to check if it belongs to the user
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (post.userId !== userId) {
            return res.status(403).json({ message: 'You can only update your own posts' });
        }

        const updatedPost = await Post.update({
            title: req.body.title,
            blog: req.body.blog
        }, {
            where: { id: postId }
        });

        if (updatedPost[0] === 0) { // Check if any rows were updated
            return res.status(404).json({ message: 'No post found with this id' });
        }

        res.status(200).json({ message: 'Post updated successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a post
router.delete('/:id',withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;
        const postId = req.params.id;

        // Fetch the post first to check if it belongs to the user
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (post.userId !== userId) {
            return res.status(403).json({ message: 'You can only delete your own posts' });
        }

        // Delete the post
        await Post.destroy({
            where: { id: postId }
        });

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json(err); // Send an error response if something goes wrong
    }
});

module.exports = router;
