import React from 'react';
import {
  Alert, Dimensions, KeyboardAvoidingView, StyleSheet, Platform,
} from 'react-native';
import Parse from 'parse/react-native';
import { AsyncStorage } from 'react-native';
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize("Discou");
Parse.serverURL = 'https://d-srv-main.herokuapp.com/parse'

import { Font } from 'expo';

// galio component
import {
  Block, Button, Input, NavBar, Text,
} from 'galio-framework';
import theme from '../theme';

const { height, width } = Dimensions.get('window');

class Register extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      'FontAwesome': require("../../assets/fonts/fa-regular-400.ttf"),
    });
  }
  state = {
    email: '-',
    password: '-',
    registerButtonText: 'Зарегистрироваться',
    registerButtonColor: 'info'
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  }

  render() {
    const { navigation } = this.props;
    const { email, password } = this.state;

    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        <NavBar
          title="Регистрация"
          onLeftPress={() => navigation.openDrawer()}
          style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
        />
        <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
          <Block flex center style={{ marginTop: theme.SIZES.BASE * 1.875, marginBottom: height * 0.1 }}>
            <Text muted center size={theme.SIZES.FONT * 0.875} style={{ paddingHorizontal: theme.SIZES.BASE * 2.3 }}>
              Пройдите регистрацию для того что бы продолжить работу с нашим приложением.
            </Text>
            <Block row center space="between" style={{ marginVertical: theme.SIZES.BASE * 1.875 }}>
              <Block flex middle right>
                <Button
                  round
                  onlyIcon
                  iconSize={theme.SIZES.BASE * 1.625}
                  icon="map"
                  iconFamily="FontAwesome"
                  color={theme.COLORS.FACEBOOK}
                  shadowColor={theme.COLORS.FACEBOOK}
                  iconColor={theme.COLORS.WHITE}
                  style={styles.social}
                />
              </Block>
              <Block flex middle center>
                <Button
                  round
                  onlyIcon
                  iconSize={theme.SIZES.BASE * 1.625}
                  icon="location-on"
                  iconFamily="FontAwesome"
                  color={theme.COLORS.TWITTER}
                  shadowColor={theme.COLORS.TWITTER}
                  iconColor={theme.COLORS.WHITE}
                  style={styles.social}
                />
              </Block>
              <Block flex middle left>
                <Button
                  round
                  onlyIcon
                  iconSize={theme.SIZES.BASE * 1.625}
                  icon="person-pin"
                  iconFamily="FontAwesome"
                  color={theme.COLORS.DRIBBBLE}
                  shadowColor={theme.COLORS.DRIBBBLE}
                  iconColor={theme.COLORS.WHITE}
                  style={styles.social}
                />
              </Block>
            </Block>
          </Block>

          <Block flex={2} center space="evenly">
            <Block flex={2}>
              <Input
                rounded
                type="email-address"
                placeholder="Почта"
                autoCapitalize="none"
                style={{ width: width * 0.9 }}
                onChangeText={text => this.handleChange('email', text)}
              />
              <Input
                rounded
                password
                viewPass
                placeholder="Пароль"
                style={{ width: width * 0.9 }}
                onChangeText={text => this.handleChange('password', text)}
              />
            </Block>
            <Block flex middle>
              <Button
                round
                color={this.state.registerButtonColor}
                onPress={async () => {
                  this.setState({ registerButtonColor: "warning" });
                  this.setState({ registerButtonText: "В процессе..." });
                  let user = new Parse.User();
                  user.set("username", email);
                  user.set("password", password);
                  user.set("email", email);
                  try {
                    await user.signUp();
                    this.setState({ registerButtonColor: "success" });
                    this.setState({ registerButtonText: "Вы зарегистрированы!" });
                    setTimeout(() => navigation.navigate('App'), 1500)
                  } catch (error) {
                    // Show the error message somewhere and let the user try again.
                    Alert.alert("Ошибка: " + error.code + " " + error.message);
                    this.setState({ registerButtonText: "Ошибка: " + error.code });
                    this.setState({ registerButtonColor: "error" });
                  }

                }}
              >
                {this.state.registerButtonText}

              </Button>
              <Button color="transparent" shadowless onPress={() => navigation.navigate('Home')}>
                <Text center color={theme.COLORS.ERROR} size={theme.SIZES.FONT * 0.65}>
                  {"Уже есть аккаунт?"}
                </Text>
              </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: theme.SIZES.BASE * 0.3,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
});

export default Register;
