function getUser(id, callback) {
  return new Promise((res) => {
    setTimeout(() => {
      console.log("User aus der Datenbank abgerufen");
      res({ id: id, username: "MaxMustermann" });
    }, 1000);
  });
}

function getPermissions(user, callback) {
  return new Promise((res) => {
    setTimeout(() => {
      console.log(`Berechtigungen für ${user.username} abgerufen`);
      res(["admin", "editor"]);
    }, 1000);
  });
}

function getArticles(permissions, callback) {
  return new Promise((res) => {
    setTimeout(() => {
      console.log(
        `Artikel basierend auf Berechtigungen ${permissions.join(", ")} abgerufen`,
      );
      res(["Artikel 1", "Artikel 2"]);
    }, 1000);
  });
}

async function getUserData() {
    try {
        const user = await getUser(1);
        const permissions = await getPermissions(user);
        const articles = await getArticles(permissions);
        console.log(articles);
        
    }
    catch(err) {
        console.log(err);
    }
}

// Verwendung der Funktionen mit Callbacks
getUser(1, (user) => {
  getPermissions(user, (permissions) => {
    getArticles(permissions, (articles) => {
      console.log(articles);
    });
  });
});

getUserData();