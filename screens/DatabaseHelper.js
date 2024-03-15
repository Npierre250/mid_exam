// DatabaseHelper.js
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase(
  {name: 'MainDb', location: 'default'},
  () => {
    console.log('Database opened successfully.');
  },
  (error) => {
    console.log('Error:', error);
  }

);

const createTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, FullName TEXT, email TEXT, password TEXT)',
        [],
        () => {
          console.log('Table created successfully.');
          resolve();
        },
        (error) => {
          console.log('Error creating table:', error);
          reject(error);
        }
      );
    });
  });
};


const insertUserData = async (fullName, email, password, onSuccess, onError) => {
  return new Promise((resolve, reject) => {
      db.transaction(
          async (tx) => {
              await tx.executeSql(
                  'INSERT INTO users (FullName, email, password) VALUES (?, ?, ?)',
                  [fullName, email, password],
                  (tx, results) => {
                      if (results.rowsAffected > 0) {
                          console.log('User inserted successfully.');
                          resolve(results.insertId); // Resolve with the ID of the inserted row
                      } else {
                          console.log('No rows affected. Data might not have been inserted.');
                          reject({ message: 'No rows affected. Data might not have been inserted.' });
                      }
                  },
                  (error) => {
                      console.log('Error inserting user:', error);
                      reject(error);
                  }
              );
          },
          (error) => {
              console.log('Transaction error:', error);
              onError(error);
          },
          () => {
              console.log('Transaction successful.');
              onSuccess();
          }
      );
  });
};

export {createTable, insertUserData };

