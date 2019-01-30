import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants} from 'expo';
import { openDatabase } from 'react-native-sqlite-storage';


const db = openDatabase('db.db');


export default class App extends React.Component {
  
  constructor(props)
  {
    super(props);
  }

  


  render() {

    //var user = this.getUser(0);
    var user;
    db.transaction(tx => {
      console.log("Transaction");
      tx.executeSql('CREATE TABLE IF NOT EXISTS Users(uid INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20)) ');
      tx.executeSql('INSERT INTO Users(name) VALUES("Amanda")');
      tx.executeSql('SELECT name FROM Users a WHERE a.uid = ?', 
      [0], (_, results) => {
        
        user = results.row.item(0);

      });

    });
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Hello {user}
        </Text>
      </View>
    );
  }
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
