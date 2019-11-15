import React, { Component } from "react";
import { AppRegistry, StyleSheet, View , Button, Text, ActivityIndicator, TextInput} from "react-native";




//Homepage allows the user to choose between authentication or testing
class HomePage extends Component {
    static navigationOptions = {
      title: 'Home',
    };
    

    render() {
        return (
            <View>
            <Button
            title="Connexion"
            onPress={() => this.props.navigation.navigate('Connexion') }/>
            <Button
            title="Use Old Safe"
            onPress={() => this.props.navigation.navigate('Test',{
              safeKey: "0x218d8bF92ED28C4ad82BF109d6f4fb453f6D6121",
              privateKey: "0x4eace079931849c27b1a4e9a9ac6de6ed5f710155e2a4a11a9da31913454c058",
              publicKey: "0x04b89673f67653df9c4a7e8b0d36cdb9ea5092aabbbe8c84bb851598fb8d8bd4abab015d190a88ffd1841c0a500addda093bc4b1826c93266851d2cf4ae60f1ed3"
            })}
            />
            </View>
            
            
        ); 
    }
  }

export default HomePage