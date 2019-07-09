import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

import { Constants } from 'expo';

// galio components
import {
  Block, Card, Text, Icon, NavBar, Button
} from 'galio-framework';
import MapView from 'react-native-maps';
import theme from '../theme';

const { width, height } = Dimensions.get('screen');

const bgImage = 'https://images.unsplash.com/photo-1516651029879-bcd191e7d33b?fit=crop&w=900&q=80';

class Article extends React.Component {
  static navigationOptions = {
    drawerLabel: () => null
  }

  render() {
    const props = this.props;
    return (
      <Block>
        <StatusBar barStyle="light-content" />
        <Block style={styles.navbar}>
          <NavBar transparent leftIconColor={theme.COLORS.WHITE} onLeftPress={() => props.navigation.openDrawer()} />
        </Block>

        <Image
          source={{ uri: props.navigation.getParam('image') }}
          resizeMode="cover"
          style={{
            width,
            height: height * 0.35,
          }}
        />

        <Block center style={{ marginTop: -theme.SIZES.BASE * 2 }}>
          <Block flex style={styles.header}>
            <Block center>
              <MapView
                initialRegion={{
                  latitude: 50.444932,
                  longitude: 30.421050,
                  latitudeDelta: 0.0122,
                  longitudeDelta: 0.0421,
                }}
                style={{
                  width,
                  height: height / 3.456789,
                }}

              />
              <Card
                borderless
                style={styles.stats}
                title={props.navigation.getParam('name') + " / " + props.navigation.getParam('discountfield')}
                avatar={props.navigation.getParam('logo')}
                location={props.navigation.getParam('locationfield')}
              />
            </Block>

            <Button left style={styles.text} onPress={() => props.navigation.navigate("Products", {
              name: props.navigation.getParam('name'), logo: props.navigation.getParam('logo'), image: props.navigation.getParam('image'), locationfield: props.navigation.getParam('locationfield'), discountfield: props.navigation.getParam('discountfield')
            })} h2 color={theme.COLORS.PRIMARY}>Продукция</Button>
            <Text />
            <Button left style={styles.text} onPress={() => props.navigation.navigate("Orders")} h2 color={theme.COLORS.BLACK}>Заказы</Button>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.COLORS.WHITE,
    borderTopLeftRadius: theme.SIZES.BASE,
    borderTopRightRadius: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE,
    width,
  },
  navbar: {
    top: Constants.statusBarHeight,
    left: 0,
    right: 0,
    zIndex: 9999,
    position: 'absolute',
  },
  stats: {
    borderWidth: 0,
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 4,
    marginVertical: theme.SIZES.BASE * 0.875,
  },
  title: {
    justifyContent: 'center',
    paddingLeft: theme.SIZES.BASE / 4,
  },
  avatar: {
    width: theme.SIZES.BASE * 2.5,
    height: theme.SIZES.BASE * 2.5,
    borderRadius: theme.SIZES.BASE * 1.25,
  },
  middle: {
    justifyContent: 'center',
  },
  text: {
    fontSize: theme.SIZES.FONT * 0.875,
    lineHeight: theme.SIZES.FONT * 1.25,
  },
});

export default Article;
