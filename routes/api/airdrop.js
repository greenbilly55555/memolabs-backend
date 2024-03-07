const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.get('/', async(req, res) => {
  res.send("This is Airdrop Api");
});

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}

router.post('/createnew', async (req, res) => {
  try {
    const randomString = generateRandomString(6);

    const newUser = new User({
      walletaddress: req.body.walletaddress,
      invitecode: randomString
    });

    const user = await newUser.save();
    res.json({result: "success", invitecode: randomString});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('failed');
  }
});

router.post('/isRegistered', async (req, res) => {
  try {
    const user = await User.find({walletaddress: req.body.walletaddress});

    if(user.length != 0) {
      res.json({result: "registered"});
    }
    else {
      res.json({result: "newuser"});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('failed to search');
  }
});

router.post('/bridgetoken', async (req, res) => {
  try {
    const user = await User.find({walletaddress: req.body.walletaddress});

    if(user.length != 0) {
      res.json({result: "success", bridgedtoken: user[0].bridgedtoken});
    }
    else {
      res.json({result: "user not found"});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('failed to search');
  }
});

router.post('/getinvitelist', async (req, res) => {
  try {
    const user = await User.find({walletaddress: req.body.walletaddress});

    if(user.length != 0) {
      res.json({result: "success", invitelist: user[0].invitedfriends});
    }
    else {
      res.json({result: "user not found"});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('failed to search');
  }
});

router.post('/getinvitecode', async (req, res) => {
  try {
    const user = await User.find({walletaddress: req.body.walletaddress});

    if(user.length != 0) {
      res.json({result: "success", invidecode: user[0].invitecode});
    }
    else {
      res.json({result: "user not found"});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('failed to search');
  }
});

// Should add calculation of reward based on period
router.post('/getairdroppoint', async (req, res) => {
  try {
    const user = await User.find({walletaddress: req.body.walletaddress});

    if(user.length != 0) {
      res.json({result: "success", airdroppoint: user[0].point});
    }
    else {
      res.json({result: "user not found"});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('failed to search');
  }
});

router.post('/addinvitelist', async (req, res) => {
  try {
    const searchedUser = await User.find({invitecode: req.body.invitecode});

    if(searchedUser.length != 0){
      const user = await User.updateOne({invitecode: req.body.invitecode}, {invitedfriends: [...searchedUser[0].invitedfriends, req.body.walletaddress]});
      res.json(user);
    }
    else {
      res.json({result: "user with that invite code not found"});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('failed to update');
  }
});

router.post('/setbridgestartday', async (req, res) => {
  try {
    const searchedUser = await User.find({walletaddress: req.body.walletaddress});

    if(searchedUser.length != 0){
      const user = await User.updateOne({walletaddress: req.body.walletaddress}, {startday: req.body.startday});
      res.json(user);
    }
    else {
      res.json({result: "user with that walletaddress not found"});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('failed to update');
  }
});

module.exports = router;
