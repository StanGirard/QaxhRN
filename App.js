import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MyWebComponent from './src/view/webview';
import Profile from './src/view/profile'
import HomePage from './src/view/homepage';
import Test from './src/view/test';
import './global';
// Global helps Web3js work in react native
import './shim.js'
// Shim helps Nodejs core code run in react native
// A post-install script is ran after each install - See in package.json -> postinstall script


//Create a StackNavigator Between Screens
const MainNavigator = createStackNavigator({
  Home: {screen: HomePage},
  Profile: {screen: Profile},
  Connexion:{screen: MyWebComponent},
  Test:{screen: Test}

});

const App = createAppContainer(MainNavigator);


export default App;