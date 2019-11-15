import React, { Component } from "react";
import { AppRegistry, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import '../../global'
import '../../shim.js'
const Web3 = require('web3');
const web3 = new Web3(
    new Web3.providers.HttpProvider('https://mainnet.infura.io/'),
  );

console.disableYellowBox = true;




class MyWebComponent extends Component {
    static navigationOptions = {
        title: 'Welcome',
      };
    state = {url: "0x09673Aee968e7d2499Ad6aabb5FAbC055F1eCd21" }
    _onNavigationStateChange(webViewState){
        // If the url of the webviewstate changes to that then we move to the profile View
        if (webViewState.url.includes("http://companiontest2.qaxh.io/identification/france_connect?")) {
            this.props.navigation.navigate('Profile', {
            url: webViewState.url,
            privateKey: this.state.privateKey,
            publicKey: this.state.address,
            }
            )
        }
        else {
            console.log(webViewState.url)
        }
        
      }

    componentWillMount() {
        //Generates a private & public key for the user
    const address = web3.eth.accounts.create();
    console.log("privateKey: " + address.privateKey);
    console.log("address: " + address.address);
    this.setState({
        url: "http://companiontest2.qaxh.io/identification/id?public_key=" + address.address,
        privateKey: address.privateKey,
        publicKey: address.address
    })
    }
    
    render() {
        const {navigate} = this.props.navigation;
        return ( 
       <View style={styles.container} >
        <WebView
       ref="webview"
       source={{uri:this.state.url}}
       onNavigationStateChange={this._onNavigationStateChange.bind(this)}
       javaScriptEnabled = {true}
       domStorageEnabled = {true}
       injectedJavaScript = {this.state.cookie}
       startInLoadingState={false}
     />
     </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
// http://companiontest2.qaxh.io/identification/id?public_key=0xB1a5Dcc5712637E0d962f4e3e8815538EA8CDe22
export default MyWebComponent;