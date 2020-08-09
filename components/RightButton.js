import React, { Component } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
//import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//import { logout } from "../store/actions/LoginAction";
//import Firebase, { db } from "../firestore/FirestoreInit";
//import { logout } from "../store/actions/MembershipActions";
import { signOut } from "../store/actions/AuthActions";

class RightButton extends Component {
    handleSignout = async () => {
        let x = await this.props.signOut();
        this.props.navigation.navigate("Homepage");
    };

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        // console.log(this.props);
    };

    //return props.loggedIn ? (
    render() {
        //console.log(this.props);
        //console.log(this.props.loggedIn);
        //return this.props.auth.uid ? (
        return this.props.loggedIn ? (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="User"
                    iconName="ios-exit"
                    onPress={this.handleSignout}
                />
            </HeaderButtons>
        ) : (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="User"
                    iconName="ios-person"
                    onPress={() => {
                        //console.log(this.props.loggedIn);
                        this.props.navigation.navigate({
                            routeName: "Login",
                        });
                    }}
                />
            </HeaderButtons>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        loggedIn: state.auth.loggedIn,
    };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
    return { signOut: () => dispatch(signOut()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightButton);
