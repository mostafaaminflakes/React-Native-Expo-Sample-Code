import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const CutomHeaderButton = props => {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={26}
            color={
                Platform.OS === "android" ? "white" : Colors.appHeaderTextColor
            }
        />
    );
};

export default CutomHeaderButton;
