import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Platform,
  Image,
  Link
} from 'react-native';

import theme from '../theme';

// galio components
import {
  Text, Button, Block, NavBar,
} from 'galio-framework';

const { height, width } = Dimensions.get('window');
const orderConfirmedImage = require('../../assets/order_confirmed.png');

class OrderConfirmed extends React.Component {
  static navigationOptions = {
    drawerLabel: () => null
  }
  render() {
    const { navigation } = this.props;
    return (
      <Block safe flex>
        <NavBar
          title="Заказ отправлен в обработку"
          onLeftPress={() => navigation.openDrawer()}
          style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
        />
        <Block flex center space="around" style={styles.container}>
          <Block center flex={2}>
            <Block center style={{ marginBottom: theme.SIZES.BASE * 2 }}>
              <Image
                source={orderConfirmedImage}
                style={{ marginBottom: theme.SIZES.BASE * 2 }}
              />
              <Text h4 color={theme.COLORS.BLACK}>
                Спасибо за то что воспользовались сервисом Сбор Пакета!
              </Text>
            </Block>
            <Text
              color={theme.COLORS.BLACK}
              style={{ marginBottom: theme.SIZES.BASE }}
            >
              <Text
                size={theme.SIZES.FONT * 1.675}
                bold
              >
                #45C23B&nbsp;
              </Text>
              <Text >
                Ваш номер заказа
              </Text>
            </Text>
          </Block>
          <Button size="large" color="info" round onPress={() => { this.props.navigation.goBack() }}>
            Вернуться
          </Button>
        </Block>
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.SIZES.BASE * 0.3,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
    marginTop: theme.SIZES.BASE * 1.875,
    marginBottom: height * 0.1
  }
});

export default OrderConfirmed;
