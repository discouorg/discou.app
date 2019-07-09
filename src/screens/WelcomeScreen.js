import React from 'react';
import {
  Alert, Dimensions, StyleSheet, StatusBar, Image,
} from 'react-native';
import { Constants, LinearGradient } from 'expo';
import Parse from 'parse/react-native';
import { AsyncStorage } from 'react-native';
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize("Discou");
Parse.serverURL = 'https://d-srv-main.herokuapp.com/parse'



// galio components
import {
  Text, Button, Block,
} from 'galio-framework';
import theme from '../theme';

const { width } = Dimensions.get('screen');
const iphoneImage = require('../../assets/iphone.png');

class Presentation extends React.Component {
  async componentDidMount() {
    try {
      await Parse.User.currentAsync();
      this.props.navigation.navigate('App');
    } catch (error) {
      //Alert.alert("Ошибка: " + error.code + " " + error.message);
    }
  }
  render() {
    return (
      <Block flex>
        <StatusBar hidden={false} barStyle="light-content" />
        <LinearGradient
          colors={['#ad5389', '#3c1053']}
          end={[0.5, 0.9]}
          style={styles.backgroundGradient}
        />
        <Block flex center style={styles.container}>
          <Block flex middle style={{ justifyContent: 'flex-end', marginBottom: theme.SIZES.BASE * 2.5 }}>
            <Text center size={theme.SIZES.FONT * 1.575} bold color={theme.COLORS.WHITE} style={{ marginBottom: theme.SIZES.BASE }}>
              Это бета версия приложения
        </Text>
            <Text center size={theme.SIZES.FONT * 0.875} color={theme.COLORS.WHITE} style={{ marginBottom: theme.SIZES.BASE * 1.875, paddingHorizontal: theme.SIZES.BASE * 2 }}>
              Нажимая кнопку далее вы соглашаетесь передавать данные аналитики (Гео-данные, ошибки приложения...).
        </Text>
            <Button size="large" color="warning" round onPress={() => {
              props.navigation.navigate("Auth");
              console.log("Auth");
            }
            }>
              Далее
        </Button>
          </Block>
          <Block flex style={{ marginBottom: -Constants.statusBarHeight * 2 }}>
            <Image source={iphoneImage} style={{ width }} />
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 0,
  },
  container: {
    paddingHorizontal: theme.SIZES.BASE,
  },
  navbar: {
    top: Constants.statusBarHeight,
    left: 0,
    right: 0,
    zIndex: 9999,
    position: 'absolute',
  },
});

export default Presentation;
