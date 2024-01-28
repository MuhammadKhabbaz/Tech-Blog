const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
Post.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});
  
User.hasMany(Comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
Comment.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});
  
Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});
Comment.belongsTo(Post, {
    foreignKey: 'postId',
    as: 'post'
});
  

module.exports = {
    User,
    Post,
    Comment
};