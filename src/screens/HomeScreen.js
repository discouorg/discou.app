import React from 'react';
import {
  Dimensions, StyleSheet, ScrollView, Alert, Platform, TouchableWithoutFeedback
} from 'react-native';

import Carousel from 'react-native-snap-carousel';

// galio components
import {
  Text, Block, Button, Card, NavBar, Input,
} from 'galio-framework';
import theme from '../theme';
import Parse from 'parse/react-native';
import { AsyncStorage } from 'react-native';
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize("Discou");
Parse.serverURL = 'https://d-srv-main.herokuapp.com/parse'
const { width } = Dimensions.get('screen');

export default class Components extends React.Component {
  constructor() {
    super()
    this.state = {
      entries: [{
        name: "  АТБ", logo: "data:image/png;base64,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", image: "http://www.myvin.com.ua/uploads/article/img_large/3310/4f8ad9ce962ea620ad5b4fff9ae86f58.jpeg", locationfield: "181м от вас", discountfield: "  -18%"
      },
      { name: 'Сильпо', logo: 'data:image/png;base64,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', image: 'https://rubryka.com/wp-content/uploads/2018/11/silpo-620x420-c-1.jpg', locationfield: '142м от вас', discountfield: '     -11%' }
      ],
    }
  }
  _renderItem({ item }) {
    return (
      <TouchableWithoutFeedback onPress={() => {
        window.navigation.navigate('Details', item);
        console.log("detals", item);
      }}>
        <Card
          flex
          borderless
          shadowColor={theme.COLORS.BLACK}
          style={styles.card}
          title={item.name}
          caption={item.discountfield}
          location={item.location}
          avatar={item.logo}
          imageStyle={styles.cardImageRadius}
          imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
          image={item.image}
        />
      </TouchableWithoutFeedback>
    );
  }
  render() {
    const { navigation } = this.props;
    window.navigation = navigation;
    return (
      <Block safe flex>
        <NavBar
          title="Discou"
          right={(
            <Button
              onlyIcon
              icon="sign-out"
              iconFamily="font-awesome"
              iconSize={theme.SIZES.BASE}
              iconColor={theme.COLORS.ICON}
              color="transparent"
              onPress={() => {
                Parse.User.logOut();
                AsyncStorage.clear();
                navigation.navigate("Auth");
              }}
            />
          )}
          onLeftPress={() => navigation.openDrawer()}
          style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
        />


        <Block style={styles.container}>
          <ScrollView style={{ position: "absolute", top: 0, left: 0, width }}>
            {/* Typography examples using Text component */}
            <Block style={{ padding: 7 }}>
              <Text style={{ marginVertical: theme.SIZES.FONT / 4 }} h3>Рядом с вами</Text>
              <Text style={{ marginVertical: theme.SIZES.FONT / 4 }} p muted>
                Функции геолокации выключены, так как на данный момент нет данных о точках.
                </Text>
            </Block>
            <Block flex>
              <Block center flex space="between" style={styles.cards}>
                <Carousel
                  ref={(c) => { this._carousel = c; }}
                  data={this.state.entries}
                  renderItem={this._renderItem}
                  style={{ position: "absolute", left: 15, paddingLeft: 25 }}
                  layout="stack"
                  sliderWidth={width + 15}
                  itemWidth={width + 10}
                />
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </Block >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 7,
    justifyContent: 'flex-start',
    backgroundColor: theme.COLORS.WHITE,
  },
  button: {
    marginBottom: 20,
  },
  cards: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    borderWidth: 0,
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
  },
  cardFooter: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: theme.SIZES.BASE / 2,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE / 2,
    backgroundColor: theme.COLORS.TRANSPARENT,
  },
  cardNoRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardAvatar: {
    width: theme.SIZES.BASE * 2.5,
    height: theme.SIZES.BASE * 2.5,
    borderRadius: theme.SIZES.BASE * 1.25,
  },
  cardTitle: {
    justifyContent: 'center',
    paddingLeft: theme.SIZES.BASE / 2,
  },
  cardImageContainer: {
    borderWidth: 0,
    overflow: 'hidden',
  },
  cardImageRadius: {
    borderRadius: theme.SIZES.BASE * 0.1875,
  },
  cardImage: {
    width: 'auto',
    height: theme.SIZES.BASE * 12.5,
  },
  cardRounded: {
    borderRadius: theme.SIZES.BASE * 0.5,
  },
  cardFull: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  cardGradient: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    position: 'absolute',
    overflow: 'hidden',
    borderBottomRightRadius: theme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: theme.SIZES.BASE * 0.5,
  },
});
