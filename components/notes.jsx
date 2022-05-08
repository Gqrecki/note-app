import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import Note from "./Note"
import * as SecureStore from 'expo-secure-store';
export default class S1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        };
    }

    getNotes = async () => {
        let notes = []
        for (let i = 0; i < 50; i++) {
            let item = await this.getItem("key" + i)
            if (item != null) {
                let object = { key: "key" + i, value: item }
                notes.push(object)
            }
        }
        this.setState({ notes: notes })
        console.log(this.state.notes)
    }

    async saveItem(key, value) {
        await SecureStore.setItemAsync(key, value);
    }

    async getItem(key) {
        let result = await SecureStore.getItemAsync(key);
        if (result) {

            return result
        }
        else {
            return null
        }
    }

    async deleteItem(key) {
        await SecureStore.deleteItemAsync("key");
    }

    componentDidMount = () => {
        this.focusListener = this.props.navigation.addListener('focus',
            () => {
                this.getNotes()
            });
        this.getNotes()

    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor:'#636363'}}>
            <View style={{
                flex: 1,
                backgroundColor: "#47ffcc",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
            }}>
                <FlatList
                    data={this.state.notes}
                    numColumns={2}
                    renderItem={({ item }) => <Note value={item.value} key={item.key} updateKey={item.key} update={this.getNotes} />}

                />
            </View>
            </View>
        );
    }
}
