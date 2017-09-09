var data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03", "f04"]
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06"]
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"]
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"]
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04"]
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05"]
  }
};

/*
  Function Name: getFollowers
  Inputs: string[, number]
  Return: array
  Contract: takes a user id from the data set and returns an array
            of user ids of those who follow the input id. If an age
            is supplied, only includes users over that age.
*/
var getFollowers = function(uid, age) {
  minAge = (age) ? age : 0;
  var followers = [];
  for (var user in data) {
    var connected = data[user].follows.includes(uid);
    var overAge = data[user].age > minAge;
    if (connected && overAge) {
      followers.push(user);
    }
  }
  return followers;
};

/*
  Function Name: getFollows
  Inputs: string[, number]
  Return: array
  Contract: takes a user id from the data set and returns an array
            of user ids of those who the input id follows. If an age
            is supplied, only includes users over that age.
*/
var getFollows = function(uid, age) {
  var follows = [];
  for (var user in data[uid].follows) {
    if (data[data[uid].follows[user]].age > minAge) {
      follows.push(user);
    }
  }
  return follows;
};

/*
  Function Name: idToName
  Inputs: array
  Return: array
  Contract: takes an array of user ids from the data set and returns
            an array of user names that match the ids.
*/
var idsToName = function(arr) {
  var nameList = [];
  for (var i in arr) {
    nameList.push(data[arr[i]].name);
  }
  return nameList;
};
/*
  Function Name: nameFollows
  Inputs: string
  Return: string
  Contract: takes a user id from the data set and returns a string
            that lists the names of users that the input id follows
            as comma separated entries.
*/
var nameFollows = function(uid) {
  return idsToName(data[uid].follows).join(', ');
};

/*
  Function Name: nameFollowers
  Inputs: string
  Return: string
  Contract: takes a user id from the data set and returns a string
            that lists the names of users that follow the input id
            as comma separated entries.
*/
var nameFollowers = function(uid) {
  return idsToName(getFollowers(uid)).join(', ');
};

/*
  Function Name: listConnections
  Inputs: string
  Return: string
  Contract: takes a user id from the data set and returns a string
            that lists their name and the names of all their
            connections in the network.
*/
var listConnections = function(uid) {
  var message = 'Name: ' + data[uid].name + '\n';
  message += 'Follows: ' + nameFollows(uid) + '\n';
  message += 'Followers: ' + nameFollowers(uid) + '\n';
  return message;
};

/*
  Function Name: fullList
  Inputs: object
  Return: string
  Contract: takes a social network data set and returns a string
            containing all users names and connections.
*/
var fullList = function (dataSet) {
  message = '';
  for (var user in dataSet) {
    message += listConnections(user);
  }
  return message;
};

/*
  Function Name: mostFollows
  Inputs: object
  Return: array
  Contract: takes a social network data set and returns an array
            that lists the user ids that follow the most others.
            If an age is supplied, only includes users over that age.
*/
var mostFollows = function(dataSet, age) {
  count = {};
  highest = 0;
  for (var user in dataSet) {
    count[user] = data[user].follows.length;
    highest = (count[user] > highest) ? count[user] : highest;
  }
  winners = [];
  for (var uid in count) {
    if (count[uid] === highest) {
      winners.push(uid);
    }
  }
  return winners;
};

/*
  Function Name: mostFollowers
  Inputs: object
  Return: array
  Contract: takes a social network data set and returns an array
            that lists the user ids that others follow the most.
            If an age is supplied, only includes users over that age.
*/
var mostFollowers = function(dataSet, age) {
  count = {};
  highest = 0;
  for (var user in dataSet) {
    count[user] = getFollowers(user, age).length;
    highest = (count[user] > highest) ? count[user] : highest;
  }
  winners = [];
  for (var uid in count) {
    if (count[uid] === highest) {
      winners.push(uid);
    }
  }
  return winners;
};



console.log(fullList(data));
console.log('Follows the most others: ' + idsToName(mostFollows(data)));
console.log('Has the most followers: ' + idsToName(mostFollowers(data)));
console.log('Follows the most others over 30: ' + idsToName(mostFollows(data, 30)));
console.log('Has the most followers over 30: ' + idsToName(mostFollowers(data, 30)));




// var mostFollowers = function(data) {
//   var winner = [Object.keys(data)[0]];
//   for (var user in data) {
//     if (data[user].followers.length > data[winner[0]].followers.length) {
//       winner = [user];
//     } else
//     if (data[user].followers.length === data[winner[0]].followers.length) {
//       winner.push(user);
//     }
//   }
//   console.log(winner + ' has the most followers.');
// };

// var mostFollowsOver30 = function (data) {
//   var count = {};
//   for (var user in data) {
//     count[user] = 0;
//     for (var i in data[user].follows) {
//       var userFollow = data[user].follows[i];
//       if (data[userFollow].age > 30) {
//         count[user] += 1;
//       }
//     }
//   }
//   winner = [Object.keys(count)[4]];
//   for (user in count) {
//     if (count[user] > count[winner]) {
//       winner = [user];
//     } else
//     if (count[user] === count[winner]) {
//       winner.push(user);
//     }
//   }
//   console.log(winner + 'follows the most people over 30.');
// };

// var mostFollowersOver30 = function(data) {
//   var count = {};
//   for (var user in data) {
//     count[user] = 0;
//     for (var i in data[user].followers) {
//       var userFollow = data[user].followers[i];
//       if (data[userFollow].age > 30) {
//         count[user] += 1;
//       }
//     }
//   }
//   winner = [Object.keys(count)[2]];
//   for (user in count) {
//     if (count[user] > count[winner]) {
//       winner = [user];
//     } else
//     if (count[user] === count[winner]) {
//       winner.push(user);
//     }
//   }
//   console.log(winner + 'has the most followers over 30.');
// };


// addFollowers(data);
// // listNames(data);
// // mostFollows(data);
// // mostFollowers(data);
// mostFollowsOver30(data);
// mostFollowersOver30(data);