const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Fact} = require('../models/fact');
const {User} = require('../models/user');
const {fact, populateFacts, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateFacts);

describe('POST /fact/add', () => {
  it('should create a new todo', (done) => {
    var text = 'Test fact text';

    request(app)
      .post('/fact/add')
      .set('x-auth', users[0].tokens[0].token)
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((fact) => {
          expect(fact.length).toBe(1);
          expect(fact[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/fact/add')
      .set('x-auth', users[0].tokens[0].token)
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Fact.find().then((fact) => {
          expect(fact.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /facts/all', () => {
  it('should get all facts', (done) => {
    request(app)
      .get('/facts/all')
      .expect(200)
      .expect((res) => {
        expect(res.body.fact.length).toBe(1);
      })
      .end(done);
  });
});

describe('GET /facts/get/:id', () => {
  it('should return fact doc', (done) => {
    request(app)
      .get(`/facts/get/${fact[0]._id}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should not return fact doc created by other user', (done) => {
    request(app)
      .get(`/fact/get/${todos[1]._id}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var Object = new ObjectID();

    request(app)
      .get(`/facts/get/${Objet}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/facts/get/123abc')
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /facts/delete/:id', () => {
  it('should remove a fact', (done) => {
    var factid = fact[1]._id;

    request(app)
      .delete(`/facts/delete/${factid}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.fact._id).toBe(factid);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Fact.findById(factid).then((fact) => {
          expect(fact).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should remove a fact', (done) => {
    var factid = fact[0]._id;

    request(app)
      .delete(`/facts/delete/${factid}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Fact.findById(factid).then((fact) => {
          expect(todo).toExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    var fact = new ObjectID();

    request(app)
      .delete(`/facts/delete/${factId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/facts/delete/123abc')
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /facts/update/:id', () => {
  it('should update the fact', (done) => {
    var factId = todos[0]._id;
    var facttext = 'This should be the new text';

    request(app)
      .patch(`/facts/update/${factId}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({
        facttext
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.fact).toBe(facttext);
      })
      .end(done);
  });



describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users/register', () => {
  it('should create a user', (done) => {
    var username = 'example27';
    var password = '123mnb!';

    request(app)
      .post('/users/register')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.username).toBe(username);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        User.findOne({username}).then((user) => {
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return validation errors if request invalid', (done) => {
    request(app)
      .post('/user/register')
      .send({
        username: 'and',
        password: '123'
      })
      .expect(400)
      .end(done);
  });

  it('should not create user if password in use', (done) => {
    request(app)
      .post('/users/register')
      .send({
        email: users[0].username,
        password: 'Password123!'
      })
      .expect(400)
      .end(done);
  });
});

describe('POST /user/login', () => {
  it('should login user and return auth token', (done) => {
    request(app)
      .post('/user/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens[1]).toInclude({

          });
          done();
        }).catch((e) => done(e));
      });
  });

  it('should reject invalid login', (done) => {
    request(app)
      .post('/user/login')
      .send({
        email: users[1].email,
        password: users[1].password + '1'
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens.length).toBe(1);
          done();
        }).catch((e) => done(e));
      });
  });
});
