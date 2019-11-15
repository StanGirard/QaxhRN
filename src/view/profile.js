import React, { Component } from "react";
import { AppRegistry, StyleSheet, View , Button, Text, ActivityIndicator, TextInput} from "react-native";
import axios from 'axios';
const Web3 = require('web3');
import '../../global'
import '../../shim.js'


//The user is redirected here after authentification on France Connect
class Profile extends Component {
    static navigationOptions = {
      title: 'Accept Identity',
    };
    constructor(props){
        super(props);
        this.state = { 
            isLoading: true,
            passwordVerification: "",
            password: ""
      }
    }
      componentWillMount() {
        const web3 = new Web3(
          new Web3.providers.HttpProvider('https://mainnet.infura.io/')
        );
      }
    
    async componentDidMount() {
      await this.setState({
        privateKey: JSON.stringify(this.props.navigation.getParam('privateKey')).replace(/"/g, ""),
        publicKey: JSON.stringify(this.props.navigation.getParam('publicKey')).replace(/"/g, "")
      })
      console.log("HAHAHAHAHAHAHAHA")
      console.log("PrivateKey:", this.state.privateKey, "PublicKey:", this.state.publicKey)
        axios.get(JSON.stringify(this.props.navigation.getParam('url', 'Error')).replace(/"/g, ""), {timeout: 500000})
          .then(
            (result) => {
                console.log(result.data)
                var matches = result.data.match(/<title[^>]*>([^<]+)<\/title>/)[1];
                console.log(matches)
                var splited = matches.split(",")
                console.log(splited)
                var params = []
                for (const hello of splited) {
                    console.log(hello)
                    params.push(hello.split(":")[1].replace(/_/g, " "))
                }
                console.log(params)
              this.setState({
                isLoading: false,
                title: matches,
                data: params,
                status: params[0],
                firstname: params[1],
                lastname: params[2],
                sexe: params[3],
                birthdate: params[4],
                birthcountry: params[5],
                birthplace: params[6],
                email: params[7],
                identityLevel: params[8],
                identityprovider: params[9],
                saltqi: params[10],
                saltqe: params[11],
                safekey: params[12].replace(/(\r\n|\n|\r)/gm, "").replace(/ /g,'')
              });
            },
            // Remarque : il est important de traiter les erreurs ici
            // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
            // des exceptions provenant de réels bugs du composant.
            (error) => {
                console.log(error)
              this.setState({
                isLoading: false,
                error: true
                
              });
            }
          )
        }
        changePasswordVerification = (text) => {
            this.setState({
                passwordVerification: text
            })
        }
        changePassword = (text) => {
            this.setState({
                password: text
            })
        }
        validateData = () => {
            if (this.state.password == this.state.passwordVerification){
                this.setState({
                    password: "success",
                    passwordVerification: "success"
                })
                this.props.navigation.navigate('Test', {
                  safeKey: this.state.safekey,
                  privateKey: this.state.privateKey,
                  publicKey: this.state.publicKey
                })

            } else {
                this.setState({
                    password: "error",
                    passwordVerification: "error"
                })
            }
        }

    render() {
        const { navigation } = this.props;
        if(this.state.isLoading){
            return(
              <View style={{flex: 1, padding: 20}}>
              <Text>This can take up to a minute. Please do not quit this page</Text>
                <ActivityIndicator/>
              </View>
            )
          }
        if(this.state.error){
          return(
            <View style={{flex: 1, padding: 20}}>
              <Text>There was an error with the request. Please retry</Text>
                
              </View>
          )
        }
        return (
            <View>
            <Text>Status: {this.state.status}</Text>
            <Text>Prénom: {this.state.firstname}</Text>
            <Text>Nom: {this.state.lastname}</Text>
            <Text>Sexe: {this.state.sexe}</Text>
            <Text>Date de naissance: {this.state.birthdate}</Text>
            <Text>Lieu de naissance: {this.state.birthplace},{this.state.birthcountry}</Text>
            <Text>email: {this.state.email}</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.changePassword(text)}
                value={this.state.password}
                />
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.changePasswordVerification(text)}
                value={this.state.passwordVerification}
                />
            <Button
            title="Accept Identity"
            onPress={() => this.validateData()}
            />
            </View>
            
            
        ); 
    }
  }

export default Profile