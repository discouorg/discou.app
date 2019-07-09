import parse from 'parse/react-native';
import { AsyncStorage } from 'react-native';

parse.initialize("Discou");
parse.serverURL = "https://d-srv-main.herokuapp.com/parse";
parse.setAsyncStorage(AsyncStorage);


class IO {
    constructor() {
        this.parse = parse;
    }
    async signup(name, email, password) {
        var user = new Parse.User();
        user.set("name", name);
        user.set("username", email);
        user.set("password", password);
        user.set("email", email);
        try {
            await user.signUp();
            return true;
        } catch (error) {
            return error;
        }
    }
    async signin(email, password) {
        const user = await Parse.User.logIn("myname", "mypass");
    }
}

const io = new IO();

export default io;