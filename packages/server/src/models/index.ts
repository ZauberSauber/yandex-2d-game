import Comment from './Comment.js';
import Reaction from './Reaction.js';
import Theme from './Theme.js';
import Topic from './Topic.js';
import User from './User.js';

Topic.hasMany(Comment, {
  foreignKey: 'topicId',
  as: 'Comments',
});

export { Topic, Comment, Reaction, User, Theme };
