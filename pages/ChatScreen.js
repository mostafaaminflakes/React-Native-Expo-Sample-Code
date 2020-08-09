import React, { Component } from "react";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0
import { YellowBox, KeyboardAvoidingView, View } from "react-native";
import _ from "lodash";
import Colors from "../constants/Colors";
import RightButton from "../components/RightButton";

import FirestoreService from "../firestore/FirestoreService";

class Chat extends Component {
    constructor(props) {
        super(props);
        // Fix yellow box message: [Setting a timer for a long period of time]
        YellowBox.ignoreWarnings(["Setting a timer"]);
        const _console = _.clone(console);
        console.warn = (message) => {
            if (message.indexOf("Setting a timer") <= -1) {
                _console.warn(message);
            }
        };
        // End fix
    }

    static navigationOptions = ({ navigation }) => {
        //title: (navigation.state.params || {}).name || "Chat!",
        // title: this.props.navigation.getParam("receiverName", "دردشة"),
        return {
            headerTitle: navigation.getParam("receiverName", "دردشة"),
            headerRight: () => <RightButton navigation={navigation} />,
            headerStyle: {
                backgroundColor:
                    Platform.OS === "android" ? Colors.appBackgroundColor : "",
            },
            headerTintColor:
                Platform.OS === "android"
                    ? Colors.appHeaderTextColor
                    : Colors.appBackgroundColor,
        };
    };

    state = {
        messages: [],
        receiver: this.props.navigation.getParam("receiver", ""), //"JNivC3IPU0bBbYz45UtXAL08xWs2",
        sender: FirestoreService.uid,
    };

    get user() {
        //console.log(FirestoreService.uid);
        return {
            //name: "Mostafa", //this.props.navigation.state.params.name,
            //email: this.props.navigation.state.params.email,
            _id: FirestoreService.uid,
        };
    }

    componentDidMount() {
        //console.log(FirestoreService.uid);
        FirestoreService.createRoomMetadataIfNotExists(
            this.state.sender,
            this.state.receiver
        );
        FirestoreService.on((message) => {
            //console.log(message);
            this.setState((previousState) => ({
                messages: GiftedChat.append(previousState.messages, message),
            }));
        });
    }

    componentWillUnmount() {
        FirestoreService.off();
    }

    render() {
        //console.log(this.user);
        return (
            <View style={{ flex: 1 }}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={FirestoreService.send}
                    user={this.user}
                />
                <KeyboardAvoidingView
                    behavior="padding"
                    //keyboardVerticalOffset={80}
                />
            </View>
        );
    }
}

export default Chat;
