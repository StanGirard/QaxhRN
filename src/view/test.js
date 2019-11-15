import React, { Component } from "react";
import { AppRegistry, StyleSheet, View , Button, Text, ActivityIndicator, TextInput} from "react-native";
import axios from 'axios';
const Web3 = require('web3');
import '../../global'
import '../../shim.js'
import abi from '../abi/abi.json';
import ModulesManager from '../abi/ModulesManager.json'

//Test class to run call to Smart Contract via infura
class Test extends Component {
    static navigationOptions = {
      title: 'Test',
    };
    constructor(props){
      super(props);
      this.state = { 
          isLoading: true,
      }
    }
    
    componentDidMount() {
      // Creates connection to the infura api in order to make request to the blockchain
      const web3 =
        new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/b5995aabe55246c8bb6d68cf7f5c5231")
      );
      //https://rinkeby.infura.io/v3/c4fe63acc6574c06a9f12d9b507a2b36 <- Qaxh.io token string for infura


      // Example function get balance
      web3.eth.getBalance("0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c", function(err, result) {
        if (err) {
          console.log(err)
        } else {
          console.log(web3.utils.fromWei(result, "ether") + " ETH")
        }
      })

      //Creates new contract
      const Contract = new web3.eth.Contract(abi["abi"], "0x218d8bF92ED28C4ad82BF109d6f4fb453f6D6121")
      console.log(Contract)

      //Creates new contract
      const Modules_Contract = new web3.eth.Contract(ModulesManager["abi"], "0x218d8bF92ED28C4ad82BF109d6f4fb453f6D6121")
      //Calls the getModules call on the contract at the address given above
      Modules_Contract.methods.getModules().call((error, result) => {
        if (error) throw error;
        console.log("Modules Response", result)
        this.setState({
          isLoading: false, 
          response: result[0]
        });
    });
      /*
      Functions to get all the information about the user in its vault.

      const age = Contract.methods.getAgeOfMajority().call().catch(function(error){ console.log(error)})
      const QE_hash = Contract.methods.QE_hash().call().catch(function(error){ console.log(error)})
      const QI_hash = Contract.methods.QI_hash().call().catch(function(error){ console.log(error)})
      const ageOfMajority = Contract.methods.ageOfMajority().call().catch(function(error){ console.log(error)})
      const identityLevel = Contract.methods.identityLevel().call().catch(function(error){ console.log(error)})
      const safeType = Contract.methods.safeType().call().catch(function(error){ console.log(error)})
      const safeVersion = Contract.methods.safeVersion().call().catch(function(error){ console.log(error)})
      console.log(age, QE_hash, QI_hash, ageOfMajority, identityLevel,safeType,safeVersion)
      */
      
      



    }
    render() {
      if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20}}>
          <Text>This can take up to a minute. Please do not quit this page</Text>
            <ActivityIndicator/>
          </View>
        )
      }
      else {
        return (
            <View>
            <Text>Modules Response {this.state.response}</Text>
            </View>
            
            
        ); 
    } }
  }

export default Test