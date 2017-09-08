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

var addFollowers = function(data) {
  for (var user in data) {
    data[user].followers = [];
  }
  for (user in data) {
    for (var i in data[user].follows) {
      data[data[user].follows[i]].followers.push(user);
    }
  }
};

var listNames = function (data) {
  for (var user in data) {
    var statement = data[user].name + ' follows ';
    for (var i in data[user].follows) {
      var userFollows = data[user].follows[i];
      statement += data[userFollows].name + ', ';
    }
    statement += 'and is followed by ';
    for (var j in data[user].followers) {
      var userFollowers = data[user].followers[j];
      statement += data[userFollowers].name + ', ';
    }
    console.log(statement.slice(0,-2) + '.');
  }
};

var mostFollows = function (data) {
  var winner = [Object.keys(data)[0]];
  for (var user in data) {
    if (data[user].follows.length > data[winner[0]].follows.length) {
      winner = [user];
    } else
    if (data[user].follows.length === data[winner[0]].follows.length) {
      winner.push(user);
    }
  }
  console.log(winner + ' follows the most people.');
};

var mostFollowers = function(data) {
  var winner = [Object.keys(data)[0]];
  for (var user in data) {
    if (data[user].followers.length > data[winner[0]].followers.length) {
      winner = [user];
    } else
    if (data[user].followers.length === data[winner[0]].followers.length) {
      winner.push(user);
    }
  }
  console.log(winner + ' has the most followers.');
};

addFollowers(data);
// listNames(data);
mostFollows(data);
mostFollowers(data);