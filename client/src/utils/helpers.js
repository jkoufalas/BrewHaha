//sets up how to iteract with browser idb
export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    //open indexed db
    const request = window.indexedDB.open("brew-haha", 1);
    let db, tx, store;

    request.onupgradeneeded = function (e) {
      const db = request.result;
      //setup cart store
      /* db.createObjectStore("products", { keyPath: "_id" });
      db.createObjectStore("categories", { keyPath: "_id" }); */
      db.createObjectStore("cart", { keyPath: "_id" });
    };

    //on setup error
    request.onerror = function (e) {
      console.log("There was an error");
    };

    //on setup sucess
    request.onsuccess = function (e) {
      db = request.result;
      tx = db.transaction(storeName, "readwrite");
      store = tx.objectStore(storeName);

      db.onerror = function (e) {
        console.log("error", e);
      };

      //switch for input methid
      switch (method) {
        //if put to database
        case "put":
          store.put(object);
          resolve(object);
          break;
        //if getting from database
        case "get":
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        //if deleting from
        case "delete":
          store.delete(object._id);
          break;
        //otherwise not valid method
        default:
          console.log("No valid method");
          break;
      }

      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}
