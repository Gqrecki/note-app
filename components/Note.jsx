import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Pressable } from 'react-native';

export default class note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: (Dimensions.get("window").width / 2)-10,
        };
    }

    deleteNote = async() => {
        Alert.alert(
            "Note-app",
            "remove?",
            [
              {
                text: "no"
              },
              { text: "yes", onPress: () =>{
                this.delItem()
              }}
            ]
          );
    }

    delItem = async() =>{
        console.log(this.props)
        await SecureStore.deleteItemAsync(this.props.updateKey);
        this.props.update()
    }

    render() {
        return (
            <View style={{ width: this.state.width, height: this.state.width, backgroundColor: "#"+JSON.parse(this.props.value).color, borderRadius: 20, margin: 5, borderColor: "#636363", borderWidth: 3 }}>
                <Pressable style={{flex:1}} onLongPress={this.deleteNote}>
                <View style={{ flex: 1, padding: 5, justifyContent: "center" }}>
                <Text style={{flex:1, fontSize: 24, textAlign: 'center'}}> {JSON.parse(this.props.value).cat} </Text>
                    <Text style={{flex:1, fontSize: 24, textAlign: 'center'}}> {JSON.parse(this.props.value).title} </Text>
                    <Text style={{flex:3}}> {JSON.parse(this.props.value).note} </Text>
                </View>
                </Pressable>
            </View>
        );
    }
}
