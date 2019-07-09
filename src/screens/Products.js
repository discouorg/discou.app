import React from 'react';
import {
  Dimensions, StyleSheet, Platform, Alert
} from 'react-native';
// galio components
import {
  Button, Icon, Block, Text, NavBar,
} from 'galio-framework';
import theme from '../theme';

const { width } = Dimensions.get('screen');
const BASE_SIZE = theme.SIZES.BASE;
const COLOR_WHITE = theme.COLORS.WHITE;

const chunk = (arr, size) => {
  const list = new Array(Math.ceil(arr.length / size)).fill()
    .map(() => arr.splice(0, size));
  return list;
};

const grids = [
  {
    title: 'Sandora',
    icon: 'ssdkjn',
    description: "50мл",
    category: "Сок / Яблучный",
    family: 'Foundation',
    discount: "-2%"
  },
  {
    title: 'Esmeralda',
    icon: 'ssdkjn',
    description: "300г",
    category: "Печенье",
    family: 'Foundation',
    discount: "-7%"
  },
  {
    title: 'БЛАБЛА',
    icon: 'ssdkjn',
    description: "300г",
    category: "Печенье",
    family: 'Foundation',
    discount: "-" + ((Math.random() * 100000000000000000).toString().slice(-1)) + "%"
  },
  {
    title: 'БЛАБЛА',
    icon: 'ssdkjn',
    description: "300г",
    category: "Печенье",
    family: 'Foundation',
    discount: "-" + ((Math.random() * 100000000000000000).toString().slice(-1)) + "%"
  },
  {
    title: 'БЛАБЛА',
    icon: 'ssdkjn',
    description: "300г",
    category: "Печенье",
    family: 'Foundation',
    discount: "-" + ((Math.random() * 100000000000000000).toString().slice(-1)) + "%"
  },
  {
    title: 'БЛАБЛА',
    icon: 'ssdkjn',
    description: "300г",
    category: "Печенье",
    family: 'Foundation',
    discount: "-" + ((Math.random() * 100000000000000000).toString().slice(-1)) + "%"
  },
  {
    title: 'БЛАБЛА',
    icon: 'ssdkjn',
    description: "300г",
    category: "Печенье",
    family: 'Foundation',
    discount: "-" + ((Math.random() * 100000000000000000).toString().slice(-1)) + "%"
  },
  {
    title: 'БЛАБЛА',
    icon: 'ssdkjn',
    description: "300г",
    category: "Печенье",
    family: 'Foundation',
    discount: "-" + ((Math.random() * 100000000000000000).toString().slice(-1)) + "%"
  },
  {
    title: 'БЛАБЛА',
    icon: 'ssdkjn',
    description: "300г",
    category: "Печенье",
    family: 'Foundation',
    discount: "-" + ((Math.random() * 100000000000000000).toString().slice(-1)) + "%"
  },
  {
    title: 'БЛАБЛА',
    icon: 'ssdkjn',
    description: "300г",
    category: "Печенье",
    family: 'Foundation',
    discount: "-" + ((Math.random() * 100000000000000000).toString().slice(-1)) + "%"
  },
  {
    title: 'БЛАБЛА',
    icon: 'ssdkjn',
    description: "300г",
    category: "Печенье",
    family: 'Foundation',
    discount: "-" + ((Math.random() * 100000000000000000).toString().slice(-1)) + "%"
  },
  {
    title: 'БЛАБЛА',
    icon: 'ssdkjn',
    description: "300г",
    category: "Печенье",
    family: 'Foundation',
    discount: "-" + ((Math.random() * 100000000000000000).toString().slice(-1)) + "%"
  },
  {
    title: 'БЛАБЛА',
    icon: 'ssdkjn',
    description: "300г",
    category: "Печенье",
    family: 'Foundation',
    discount: "-" + ((Math.random() * 100000000000000000).toString().slice(-1)) + "%"
  },
  {
    title: 'БЛАБЛА',
    icon: 'ssdkjn',
    description: "300г",
    category: "Печенье",
    family: 'Foundation',
    discount: "-" + ((Math.random() * 100000000000000000).toString().slice(-1)) + "%"
  },
  {
    title: 'БЛАБЛА',
    icon: 'ssdkjn',
    description: "300г",
    category: "Печенье",
    family: 'Foundation',
    discount: "-" + ((Math.random() * 100000000000000000).toString().slice(-1)) + "%"
  },

];

class Grid extends React.Component {
  static navigationOptions = {
    drawerLabel: () => null
  }
  render() {
    const { navigation } = this.props;

    return (
      <Block safe flex>
        <NavBar
          fix
          title={"Продукция: " + navigation.getParam('name')}
          onLeftPress={() => navigation.openDrawer()}
          style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
        />
        <Block style={styles.grid}>
          {
            chunk(grids, 3).map((row, rowId) => (
              <Block row space="evenly" key={`row-${rowId}`}>
                {
                  row.map(grid => (
                    <Block shadow middle style={styles.block} key={`grid-${grid.title}}`}>
                      <Button color="transparent" style={styles.button} onPress={() => Alert.alert("Выбор продуктов временно не доступен")}>
                        <Block flex middle>
                          <Icon name={grid.icon} family={grid.family} size={BASE_SIZE * 1.875} />
                          <Text size={BASE_SIZE * 0.875 / 1.1}>
                            {grid.title}
                            {' '}

                          </Text>
                          <Text size={BASE_SIZE * 0.875 / 1.3}>
                            {grid.description}
                            {' '}
                          </Text>
                          <Text size={BASE_SIZE * 0.875 / 1.33}>
                            {grid.category}
                            {' '}
                          </Text>
                          <Text size={BASE_SIZE * 0.875 / 1.5}>
                            {grid.discount}
                            {' '}
                          </Text>
                        </Block>
                      </Button>
                    </Block>
                  ))
                }
              </Block>
            ))
          }
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  block: {
    backgroundColor: COLOR_WHITE,
    borderRadius: BASE_SIZE / 2,
    height: width * 0.28,
    width: width * 0.28,
    shadowOpacity: 0.4,
    elevation: BASE_SIZE / 2,
  },
  button: {
    width: 'auto',
    height: 'auto',
  },
});

export default Grid;
