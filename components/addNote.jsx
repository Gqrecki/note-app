import React, { Component } from 'react';
import { View, Text, TextInput, ToastAndroid, Picker } from 'react-native';
import MyButton from './MyButton';
import * as SecureStore from 'expo-secure-store';
import { StyleSheet } from 'react-native';

export default class S2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            note: "",
            notes: [],
            cat:[],
            i: 0,
            o: 0,
            selectedValue: '',
            setSelectedValue: '',
        };
    }

    saveNote = () => {
        
        let key = "key" + String(this.state.i)
        this.saveItem(key, JSON.stringify({ cat: this.state.selectedValue, title: this.state.title, note: this.state.note, color: Math.floor(Math.random()*16777215).toString(16)}))
        
        // ToastAndroid.showWithGravity(
        //     'saved',
        //     ToastAndroid.SHORT,
        //     ToastAndroid.CENTER
        // );

        this.getNotes()

        this.setState({
            title: '',
            note: '',
        })

        this.props.navigation.navigate("notes")
    }

    componentDidMount = async () => {
        this.focusListener = this.props.navigation.addListener('focus',
            () => {
                this.getNotes()
        this.getCat()
        this.setState({
            title: '',
            note: '',
        })
            });
        this.getNotes()
        this.getCat()
        this.setState({
            title: '',
            note: '',
        })
    }

    getNotes = async () =>{
        this.setState({notes: []})
        for(let i = 0; i<50; i++){
            let item = await this.getItem("key"+i)
            
            if(item != null){
                let notesUpdated = this.state.notes
                let object = {key: "key" + i, value: item}

                notesUpdated.push(object)
                this.setState({notes:notesUpdated, i: i+1})
            }
        }

        console.log(this.state.notes)
    }

    getCat = async () =>{
        this.setState({cat: []})
        for(let o = 0; o<50; o++){
            let item = await this.getItem("cat"+o)
            
            if(item != null){
                let catUpdated = this.state.cat
                let object = {key: "cat" + o, value: item}

                catUpdated.push(object)
                this.setState({cat:catUpdated, o: o+1})
            }
        }

        console.log(this.state.cat)
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
        await SecureStore.deleteItemAsync("key");
    }

    render() {
        let pick = []
        for(let v=0; v<this.state.cat.length; v++){
            pick.push(<Picker.Item label={JSON.parse(this.state.cat[v].value).title} value={JSON.parse(this.state.cat[v].value).title} />)
        }
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
                    placeholder="title"
                    value={this.state.title}
                    onChangeText={(value) => {
                        this.setState({ title: value })
                    }}


                />
                <TextInput style={{ fontSize: 24, margin: 30, color:'#636363'}}
                    placeholder="note"
                    value={this.state.note}
                    onChangeText={(value) => {
                        this.setState({ note: value })
                    }}

                />

                <Picker selectedValue={this.state.selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => this.setState({selectedValue : itemValue})}>
                    {pick}
                </Picker>


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
        margin: '50%',
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

