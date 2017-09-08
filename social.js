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




addFollowers(data);
listNames(data);