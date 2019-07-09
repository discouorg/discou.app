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

const Article = props => (
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
        height: height * 0.55,
      }}
    />

    <Block center style={{ marginTop: -theme.SIZES.BASE * 2 }}>
      <Block flex style={styles.header}>
        <Block>
          <Text size={theme.SIZES.BASE * 1.875}>{props.navigation.getParam('name')}</Text>
          <Card
            borderless
            style={styles.stats}
            title={props.navigation.getParam('discountfield')}
            avatar={props.navigation.getParam('logo')}
            location={props.navigation.getParam('locationfield')}
          />
        </Block>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <Text style={styles.text} color={theme.COLORS.ERROR}>Собрать пакет</Text>
      </Block>
    </Block>
  </Block>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.COLORS.WHITE,
    borderTopLeftRadius: theme.SIZES.BASE * 1.5,
    borderTopRightRadius: theme.SIZES.BASE * 1.5,
    paddingVertical: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE * 1.5,
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
    paddingLeft: theme.SIZES.BASE / 2,
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
