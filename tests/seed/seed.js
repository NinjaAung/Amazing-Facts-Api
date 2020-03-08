const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Fact} = require('../../models/todo');
const {User} = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  username: 'userOne',
  password: 'userOnePass',
}, {
  _id: userTwoId,
  username: 'userOne',
  username: 'userTwoPass',
}];

const fact = [{
  _id: new ObjectID(),
  fact: 'First Fact',
  user: userOneId
}, {
  _id: new ObjectID(),
  fact: 'Secound Fact',
  user: userOneId
}];

const populateTodos = (done) => {
  Fact.remove({}).then(() => {
    return Fact.insertMany(fact);
  }).then(() => done());
};

const populateFacts = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {fact, populateFacts, users, populateUsers};