import React from 'react';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import {
  Image, StyleSheet, ScrollView, SafeAreaView, Platform,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItems,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import Parse from 'parse/react-native';
import { AsyncStorage } from 'react-native';
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize("Discou");
Parse.serverURL = 'https://d-srv-main.herokuapp.com/parse'
// screens
//import ArticleCover from './src/screens/DetailsticleCover';
import Cards from './src/screens/Cards';
import HomeScreen from './src/screens/HomeScreen';
import Login from './src/screens/Login';
import News from './src/screens/News';
import OrderConfirmed from './src/screens/OrderConfirmed';
import WelcomeScreen from './src/screens/WelcomeScreen';
import Details from './src/screens/Details';
import Register from './src/screens/Register';
import ScannerScreen from './src/screens/Scanner';
import Registerv2 from './src/screens/Registerv2';
import Grid from './src/screens/Products';

import theme from './src/theme';
import { Block, Icon, Text } from 'galio-framework';



class GalioDrawer extends React.Component {
  constructor() {
    super()
  }
  state = {
    user: { email: "some.one@somemail.com" }
  }
  async componentDidMount() {
    try {
      const user = await Parse.User.currentAsync();
      console.log(user);
      if (user !== undefined && user !== null) {
        console.log(user);
        this.setState({ user });
      }
    } catch (error) {
      //Alert.alert("Ошибка: " + error.code + " " + error.message);
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.drawer} forceInset={{ top: 'always', horizontal: 'never' }}>
        <Block space="between" row style={styles.header}>
          <Block flex={0.3}><Image source={{ uri: 'http://i.pravatar.cc/100' }} style={styles.avatar} /></Block>
          <Block flex style={styles.middle}>
            <Text size={theme.SIZES.FONT * 0.875}>Discou</Text>
            <Text muted size={theme.SIZES.FONT * 0.875}>{this.state.user.email}</Text>
          </Block>
        </Block>
        <ScrollView>
          <DrawerItems {...this.props} />
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 0.6875,
    paddingBottom: theme.SIZES.BASE * 1.6875,
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 0.5,
    marginTop: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : null,
  },
  avatar: {
    width: theme.SIZES.BASE * 2.5,
    height: theme.SIZES.BASE * 2.5,
    borderRadius: theme.SIZES.BASE * 1.25,
  },
  middle: {
    justifyContent: 'center',
  },
});

const MenuIcon = ({ name, family, focused }) => (
  <Icon
    name={name}
    family={family}
    size={theme.SIZES.FONT}
    color={focused ? theme.COLORS.WHITE : '#5D5D5D'}
  />
);

MenuIcon.defaultProps = {
  name: null,
  family: null,
  focused: false,
};

MenuIcon.propTypes = {
  name: PropTypes.string,
  family: PropTypes.string,
  focused: PropTypes.bool,
};

const AppScreens = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Рядом с вами',
      drawerIcon: props => <MenuIcon name="location-arrow" family="font-awesome" focused={props.focused} />,
    },
  },
  Details: {
    screen: Details,
  },
  Scanner: {
    screen: ScannerScreen,
    navigationOptions: {
      drawerLabel: 'Сканнер карт',
      drawerIcon: props => <MenuIcon name="credit-card" family="font-awesome" focused={props.focused} />,
    },
  }
};

const AuthScreens = {
  Home: {
    screen: Login,
    navigationOptions: {
      drawerLabel: 'Войти',
      drawerIcon: props => <MenuIcon name="sign-out" family="font-awesome" focused={props.focused} />,
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      drawerLabel: 'Зарегистрироваться',
      drawerIcon: props => <MenuIcon name="sign-in" family="font-awesome" focused={props.focused} />,
    },
  }
};

const options = {
  contentComponent: props => <GalioDrawer {...props} />,
  contentOptions: {
    labelStyle: {
      fontWeight: '500',
      color: theme.COLORS.GREY,
      fontSize: theme.SIZES.FONT * 0.875,
      marginLeft: theme.SIZES.BASE * 0.75,
    },
    activeLabelStyle: {
      color: theme.COLORS.WHITE,
    },
    activeBackgroundColor: theme.COLORS.THEME,
    itemsContainerStyle: {
      paddingVertical: 0,
    },
    iconContainerStyle: {
      marginHorizontal: 0,
      marginLeft: theme.SIZES.BASE * 1.65,
      // marginRight: theme.SIZES.BASE * 0.76,
    },
  },
};

const GalioApp = createDrawerNavigator(AppScreens, options);
const AuthStack = createDrawerNavigator(AuthScreens, options);

export default createAppContainer(createSwitchNavigator(
  {
    Welcome: WelcomeScreen,
    App: GalioApp,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Welcome',
  }
));
