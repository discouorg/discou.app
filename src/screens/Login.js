import React from 'react';
import {
  Alert, Dimensions, KeyboardAvoidingView, StyleSheet, Platform,
} from 'react-native';

import { Font } from 'expo';

// galio component
import {
  Block, Button, Input, NavBar, Text,
} from 'galio-framework';
import theme from '../theme';
import Parse from 'parse/react-native';
import { AsyncStorage } from 'react-native';
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize("Discou");
Parse.serverURL = 'https://d-srv-main.herokuapp.com/parse'


const { height, width } = Dimensions.get('window');

class Login extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      'FontAwesome': require("../../assets/fonts/fa-regular-400.ttf"),
    });
  }
  state = {
    email: '-',
    password: '-',
    loginButtonText: 'Войти',
    loginButtonColor: 'info'
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
          title="Войти"
          onLeftPress={() => navigation.openDrawer()}
          style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
        />
        <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
          <Block flex center style={{ marginTop: theme.SIZES.BASE * 1.875, marginBottom: height * 0.1 }}>
            <Text muted center size={theme.SIZES.FONT * 0.875} style={{ paddingHorizontal: theme.SIZES.BASE * 2.3 }}>
              Пройдите авторизацию для того что бы продолжить работу с нашим приложением.
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
                placeholder="Email"
                autoCapitalize="none"
                style={{ width: width * 0.9 }}
                onChangeText={text => this.handleChange('email', text)}
              />
              <Input
                rounded
                password
                viewPass
                placeholder="Password"
                style={{ width: width * 0.9 }}
                onChangeText={text => this.handleChange('password', text)}
              />
              <Text
                color={theme.COLORS.ERROR}
                size={theme.SIZES.FONT * 0.75}
                onPress={() => Alert.alert('Сброс пароля в данной версии не доступен.')}
                style={{ alignSelf: 'flex-end', lineHeight: theme.SIZES.FONT * 2 }}
              >
                Забыли пароль?
              </Text>
            </Block>
            <Block flex middle>
              <Button
                round
                color={this.state.loginButtonColor}
                onPress={async () => {
                  this.setState({ loginButtonColor: "warning" });
                  this.setState({ loginButtonText: "В процессе..." });
                  try {
                    await Parse.User.logIn(email, password);
                    this.setState({ loginButtonColor: "success" });
                    this.setState({ loginButtonText: "Вы авторизированы!" });
                    setTimeout(() => navigation.navigate('App'), 1500)
                  } catch (error) {
                    Alert.alert("Ошибка: " + error.code + " " + error.message);
                    this.setState({ loginButtonText: "Ошибка: " + error.code });
                    this.setState({ loginButtonColor: "error" });
                  }

                }}
              >
                {this.state.loginButtonText}
              </Button>
              <Button color="transparent" shadowless onPress={() => navigation.navigate('Register')}>
                <Text center color={theme.COLORS.ERROR} size={theme.SIZES.FONT * 0.65}>
                  {"Нет аккаунта? Не проблема! Зарегистрируйтесь."}
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

export default Login;
