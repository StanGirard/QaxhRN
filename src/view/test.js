import React, { Component } from "react";
import { AppRegistry, StyleSheet, View , Button, Text, ActivityIndicator, TextInput} from "react-native";
import axios from 'axios';
const Web3 = require('web3');
import '../../global'
import '../../shim.js'
import abi from '../abi/abi.json';
import ModulesManager from '../abi/ModulesManager.json'
import QaxhModule from '../abi/QaxhModule.json'

//Test class to run call to Smart Contract via infura
class Test extends Component {
    static navigationOptions = {
      title: 'Accept Identity',
    };
    constructor(props){
      super(props);
      this.state = { 
          isLoading: true,
      }
    }
    
    async componentDidMount() {
      // Creates connection to the infura api in order to make request to the blockchain
      safeKey = JSON.stringify(this.props.navigation.getParam('safeKey', 'null')).replace(/"/g, "")
      publicKey = JSON.stringify(this.props.navigation.getParam('publicKey', 'null')).replace(/"/g, "")
      privateKey = JSON.stringify(this.props.navigation.getParam('privateKey', 'null')).replace(/"/g, "")
      console.log("Safekey: ", safeKey, "PublicKey: ", publicKey, "privateKey: ", privateKey )
      this.setState({
        safeKey: safeKey,
        publicKey: publicKey,
        privateKey: privateKey
      })
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
      const Contract = new web3.eth.Contract(abi["abi"], safeKey)
      console.log(Contract)

      //Creates new contract
      const Modules_Contract = new web3.eth.Contract(ModulesManager["abi"], safeKey)
      //Calls the getModules call on the contract at the address given above
      await Modules_Contract.methods.getModules().call(async (error, result) => {
        if (error) throw error;
        console.log("Modules Response", result)


        // Code to validate the identity with the answer to module response as address
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        web3.eth.accounts.wallet.add(account);
        const from = web3.eth.accounts.wallet[0].address;
        const nonce =  await web3.eth.getTransactionCount(from, "pending");
        const QaxhModuleContract = new web3.eth.Contract(QaxhModule["abi"], result[0])
        gas = Math.round(100000 * 1.5);
        // Sends the acceptidentity transaction with all the parameters and waits for the answer.
        QaxhModuleContract.methods.acceptIdentity().send({gas:gas,from:from, nonce:nonce},(error, result)=> {
          if (error) throw error;
          console.log("Accept Identity", result)
          this.setState({
            acceptIdentity: result
          })
        })
        this.setState({
          isLoading: false, 
          response: result[0]
        });
    });
      /*
      MANDATORY VERIFICATIONS TODO BEFORE GOING ON
      TODO
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
            <Text>Accept identity: {this.state.acceptIdentity}</Text>
            <Text>Private key: {this.state.privateKey}</Text>
            <Text>Public key: {this.state.publicKey}</Text>
            <Text>Safe key: {this.state.safeKey}</Text>
            </View>
            
            
        ); 
    } }
  }

export default Test