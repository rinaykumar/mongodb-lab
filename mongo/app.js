const { MongoClient } = require('mongodb');
const express = require('express');

const app = express();

// mongodb: instead of http:
const url = 'mongodb://localhost:27017';
const dbName = '667Demo';
const collectionName = 'users';

const client = new MongoClient(url);

client.connect((error) => {
  if (error) {
    console.log(error);
    process.exit(1); // Exit if connecion fails
  }
  // Connection successful
  console.log('Connection worked');

  // Get references to db and collection
  const db = client.db(dbName);
  const userCollection = db.collection(collectionName);

  app.get('/listUsers', (req, res) => {
    // Network call
    userCollection.find({})
      .toArray() // Convert documents found to JS array
      .then((docs) => {
        res.send(docs);
      })
      .catch((e) => {
        console.log(e);
        res.send('Failed');
      })
  });

  app.get('/logIn', (req, res) => {
    const matcher = {
      userName: req.query.userName,
      password: req.query.password,
    };
    userCollection.findOne(matcher)
      .then((result) => {
        if (result) {
          return res.send({
            success: true,
          });
        }
        return res.send({
          success: false,
          error: 'Username or password invalid',
        });
      })
      .catch((e) => {
        console.log(e);
        res.send('Failed');
      })
  });

  // Should be post not get
  app.get('/register', (req, res) => {
    if (!req.query.userName || !req.query.password) {
      return res.send('Username and password must be entered');
    }
    const matcher = {
      userName: req.query.userName,
    };
    userCollection.findOne(matcher)
      .then((result) => {
        if (result) {
          // Manually reject promise (throw)
          // Jump to next catch, skip all .then's
          return Promise.reject('Sorry username already taken');
          // Promise.resolve(); - Manually trigger sucess
        }
        // res.send('TODO: Make user')
        const newUser = {
          userName: req.query.userName,
          password: req.query.password,
        };
        // Insert is also async, does not happen instantly
        return userCollection.insertOne(newUser); // Chain a promise

      })
      .then((result) => {
        // User has been inserted
        res.send('User has been inserted');
      })
      .catch((e) => {
        console.log(e);
        res.send(e);
      })

  });

  app.get('/updatePassword', (req, res) => {
    if (!req.query.userName || !req.query.password) {
      return res.send('Username and password must be entered');
    }
    const matcher = {
      userName: req.query.userName,
    };
    const updater = {
      // Override only one part of document
      $set : {
        password: req.query.password,
      },
    }
    // Does not fail if it doesn't match anything
    userCollection.findOneAndUpdate(matcher, updater)
      .then(() => res.send('Password updated'))
      .catch((e) => {
        console.log(e);
        res.send(e);
      })

  });

  app.listen(4000, () => console.log('App listening on port 4000'));
});