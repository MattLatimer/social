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
            is supplied, only users over that age will be returned.
*/

var getFollowers = function(uid, age) {
  var minAge = (age) ? age : 0;
  var followers = [];
  for (var user in data) {
    var follows = data[user].follows.includes(uid);
    var overAge = data[user].age > minAge;
    if (follows && overAge) {
      followers.push(user);
    }
  }
  return followers;
};







// var addFollowers = function(data) {
//   for (var user in data) {
//     data[user].followers = [];
//   }
//   for (user in data) {
//     for (var i in data[user].follows) {
//       data[data[user].follows[i]].followers.push(user);
//     }
//   }
// };

// var listNames = function (data) {
//   for (var user in data) {
//     var statement = data[user].name + ' follows ';
//     for (var i in data[user].follows) {
//       var userFollows = data[user].follows[i];
//       statement += data[userFollows].name + ', ';
//     }
//     statement += 'and is followed by ';
//     for (var j in data[user].followers) {
//       var userFollowers = data[user].followers[j];
//       statement += data[userFollowers].name + ', ';
//     }
//     console.log(statement.slice(0,-2) + '.');
//   }
// };

// var mostFollows = function (data) {
//   var winner = [Object.keys(data)[0]];
//   for (var user in data) {
//     if (data[user].follows.length > data[winner[0]].follows.length) {
//       winner = [user];
//     } else
//     if (data[user].follows.length === data[winner[0]].follows.length) {
//       winner.push(user);
//     }
//   }
//   console.log(winner + ' follows the most people.');
// };

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