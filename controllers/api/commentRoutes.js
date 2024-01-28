const express = require('express');
const router = express.Router();
const { Comment } = require('../../models/index');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
    try{
        const comments = await Comment.findAll();
        res.json(comments)
    }catch (err) {
        // Handle errors, such as duplicate email, etc.
        res.status(400).json(err);
    }
})

router.post('/', withAuth, async (req, res) => {
    console.log('Received data:', req.body);
    try {
        const newComment = await Comment.create({
            comment: req.body.comment,
            postId: req.body.postId, // Assuming the frontend sends the ID of the post being commented on
            userId: req.session.user_id // ID of the user making the comment
        });

        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.session.user_id;

        // Fetch the comment first
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if the logged-in user is the author of the comment
        if (comment.userId !== userId) {
            return res.status(403).json({ message: 'You can only update your own comments' });
        }

        const updatedComment = await Comment.update(
            { content: req.body.content },
            { where: { id: commentId } }
        );

        res.status(200).json({ message: 'Comment updated successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.session.user_id;

        // Fetch the comment first
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if the logged-in user is the author of the comment
        if (comment.userId !== userId) {
            return res.status(403).json({ message: 'You can only delete your own comments' });
        }

        await Comment.destroy({ where: { id: commentId } });

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;