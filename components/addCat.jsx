import React, { Component } from 'react';
import { View, Text, TextInput, ToastAndroid } from 'react-native';
import MyButton from './MyButton';
import * as SecureStore from 'expo-secure-store';
import { StyleSheet } from 'react-native';

export default class S2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            notes: [],
            i: 0,
        };
    }

    saveNote = () => {
        
        let key = "cat" + String(this.state.i)
        this.saveItem(key, JSON.stringify({ title: this.state.title}))
        
        ToastAndroid.showWithGravity(
            'saved',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );

        this.getNotes()

        this.setState({
            title: '',
        })

        this.props.navigation.navigate("notes")
    }

    componentDidMount = async () => {
        this.getNotes()
        this.setState({
            title: '',
        })
    }

    getNotes = async () =>{
        this.setState({notes: []})
        for(let i = 0; i<50; i++){
            let item = await this.getItem("cat"+i)
            
            if(item != null){
                let notesUpdated = this.state.notes
                let object = {key: "cat" + i, value: item}

                notesUpdated.push(object)
                this.setState({notes:notesUpdated, i: i+1})
            }
        }

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
        else{
            return null
        }
    }

    async deleteItem(key) {
        await SecureStore.deleteItemAsync("cat");
    }

    render() {
        
        return (
            <View style={{flex:1, backgroundColor: '#636363'}}>
            <View style={{
                flex: 1,
                backgroundColor: "#47ffcc",
                alignItems: "center",
                padding: 30,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20
            }}>
                <TextInput style={{ fontSize: 48, margin: 30, color:'#636363'}}
                    placeholder="category"
                    value={this.state.title}
                    onChangeText={(value) => {
                        this.setState({ title: value })
                    }}
                />

            <MyButton 
                  style={styles.bt}
                  textstyle={styles.bttext}
                  text="Add" 
                  func={() => {
                     this.saveNote()
                  }}
              >
            </MyButton>
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bt: {
        margin: '4%',
        width: '40%',
        padding: 10,
        backgroundColor: "#636363",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    bttext: {
        fontSize: 20,
        color: "#47ffcc",
        fontWeight: 'bold',
    }
 })
