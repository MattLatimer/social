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
  message += '  Follows: ' + nameFollows(uid) + '\n';
  message += '  Followers: ' + nameFollowers(uid) + '\n';
  return message;
};

/*
  Function Name: fullList
  Inputs: none
  Return: string
  Contract: returns a string containing all users names
            and connections.
*/
var fullList = function () {
  message = '';
  for (var user in data) {
    message += listConnections(user);
  }
  return message;
};

/*
  Function Name: mostFollows
  Inputs: none
  Return: array
  Contract: returns an array that lists the user ids that follow the most others.
            If an age is supplied, only includes users over that age.
*/
var mostFollows = function(age) {
  count = {};
  highest = 0;
  for (var user in data) {
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
  Inputs: none
  Return: array
  Contract: returns an array that lists the user ids that others follow the most.
            If an age is supplied, only includes users over that age.
*/
var mostFollowers = function(age) {
  count = {};
  highest = 0;
  for (var user in data) {
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

/*
  Function Name: noFollowBack
  Inputs: string
  Return: array
  Contract: takes a user id from the data set and returns an array
            of user ids that they follow, but who don't follow them back.
*/
var noFollowBack = function (uid) {
  oneWays = [];
    for (var i in data[uid].follows) {
      user = data[uid].follows[i];
      if (!data[user].follows.includes(uid)) {
        oneWays.push(user);
      }
    }
  return oneWays;
};

/*
  Function Name: listNoFollowBack
  Inputs: none
  Return: string
  Contract: returns a string that lists who follows a user that doesn't
            follow them back, and who that user is.
*/
var listNoFollowBack = function() {
  var message = '';
  var noBacksies = {};
  for (var user in data) {
    var arr = noFollowBack(user);
    if (arr.length > 0) {
      noBacksies[user] = arr;
    }
  }
  for (var key in noBacksies) {
    message += data[key].name + ' is not followed back by ' + idsToName(noBacksies[key]) + '\n';
  }
  return message;
};

/*
  Function Name: reach
  Inputs: string
  Return: number
  Contract: takes a user id from the data set and returns a number
            that is the sum of their followers and followers followers.
*/
var reach = function(uid) {
  followers = getFollowers(uid);
  number = followers.length;
  for (var i in followers) {
    number += getFollowers(followers[i]).length;
  }
  return number;
};

/*
  Function Name: listReach
  Inputs: none
  Return: string
  Contract: returns a list of users and their reach (sum of followers and
            followers of followers, prone to overlap)
*/
var listReach = function() {
  var message = '';
  for (var user in data) {
    message += data[user].name + ' has a reach of ' + reach(user) + '\n';
  }
  return message;
}



console.log(fullList());
console.log('Follows the most others: ' + idsToName(mostFollows()));
console.log('Has the most followers: ' + idsToName(mostFollowers()));
console.log('Follows the most others over 30: ' + idsToName(mostFollows(30)));
console.log('Has the most followers over 30: ' + idsToName(mostFollowers(30)));
console.log('\n' + listNoFollowBack());
console.log(listReach());
