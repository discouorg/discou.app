import * as React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, NavBar, Icon, Button } from 'galio-framework';
import Constants from 'expo-constants';
import theme from '../theme';
const BASE_SIZE = theme.SIZES.BASE;
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREY = theme.COLORS.MUTED;
import Parse from 'parse/react-native';
import { AsyncStorage } from 'react-native';
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize("Discou");
Parse.serverURL = 'https://d-srv-main.herokuapp.com/parse';

import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';
export default class BarcodeScanner extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
    };

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (

            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}>
                <NavBar
                    title="Сканнер карт"
                    onLeftPress={() => this.props.navigation.openDrawer()}
                    leftIconColor={theme.COLORS.MUTED}
                    style={{ position: "absolute", zindex: 9999 }}
                    right={(
                        <Button
                            color="transparent"
                            style={styles.settings}
                            onPress={() => this.props.navigation.openDrawer()}
                        >
                            <Icon size={BASE_SIZE} name="heart" family="font-awesome" color={theme.COLORS.MUTED} />
                        </Button>
                    )}
                    style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
                />
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />

                {scanned && (
                    <Button onPress={() => this.setState({ scanned: false })}>Отсканировать еще?</Button>
                )}
            </View>
        );
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        const Card = Parse.Object.extend("Card");
        const card = new Card();
        card.set("type", type);
        card.set("data", data);
        card.save()
            .then((card) => {
                // Execute any logic that should take place after the object is saved.
                Alert.alert(`Спасибо за помощь, на данный момент функция в разработке. \n\n\n Тип данной карты: ${type} \n Данные карты: ${data}`);
                // alert('New object created with objectId: ' + card.id);
                this.props.navigation.goBack();
            }, (error) => {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                this.props.navigation.goBack();
            });
    };
}
const styles = StyleSheet.create({
    card: {
        borderColor: 'transparent',
        marginHorizontal: BASE_SIZE,
        marginVertical: BASE_SIZE / 2,
        padding: BASE_SIZE,
        backgroundColor: COLOR_WHITE,
        shadowOpacity: 0.40,
    },
    menu: {
        width: BASE_SIZE * 2,
        borderColor: 'transparent',
    },
    settings: {
        width: BASE_SIZE * 2,
        borderColor: 'transparent',
    },
    left: {
        marginRight: BASE_SIZE,
    },
    right: {
        width: BASE_SIZE * 2,
        backgroundColor: 'transparent',
        elevation: 0,
    },
    gradient: {
        width: BASE_SIZE * 3.25,
        height: BASE_SIZE * 3.25,
        borderRadius: BASE_SIZE * 3.25,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
