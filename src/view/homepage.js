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
            title="Test"
            onPress={() => this.props.navigation.navigate('Test')}
            />
            </View>
            
            
        ); 
    }
  }

export default HomePage