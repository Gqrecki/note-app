import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Alert, Button } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import notes from "./components/notes"
import addNote from "./components/addNote"
import addCat from "./components/addCat"

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();


const add = require("./assets/add.png")
const info = require("./assets/info.png")
const note = require("./assets/note.png")
const option = require("./assets/option.png")

export default function App() {


  function CustomDrawerContent(props, {navigation}) {
    return (
      <DrawerContentScrollView style={{ flex: 1, backgroundColor: "#636363"}} {...props}>
        <Image source={option} style={{ width: 100, height: 100, justifyContent: 'center', alignSelf: 'center', margin: 50 }}/>

      <DrawerItemList {...props} />
        <DrawerItem
          label="info"
          icon={() => <Image source={info} style={{ width: 32, height: 32 }} />}
          onPress={() => { Alert.alert(
            "Note-app",
            "KG 4IB",
            [
              {
                text: "ok",
              },
              
            ]
          ); }}
        />

      </DrawerContentScrollView>
    );
  }

 

  return (

    <NavigationContainer >
      <Drawer.Navigator style={{ backgroundColor: "#000" }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="notes" component={notes} options={{ drawerIcon: () => <Image source={note} style={{width: 32, height: 32}} />, headerStyle: { backgroundColor: "#636363", elevation: 0, shadowOpacity: 0, borderBottomWidth: 0,}, headerTintColor: '#47ffcc', headerTitleAlign: 'center', headerTitleStyle: {fontWeight: 'bold',} }} />
        <Drawer.Screen 
          name="add note" component={addNote} options={{drawerIcon: () => <Image source={add} style={{ width: 32, height: 32 }} />, headerStyle: { backgroundColor: "#636363", elevation: 0, shadowOpacity: 0, borderBottomWidth: 0, }, headerTintColor: '#47ffcc', headerTitleAlign: 'center', headerTitleStyle: {fontWeight: 'bold',} }} />
           <Drawer.Screen 
          name="add category" component={addCat} options={{drawerIcon: () => <Image source={add} style={{ width: 32, height: 32 }} />, headerStyle: { backgroundColor: "#636363", elevation: 0, shadowOpacity: 0, borderBottomWidth: 0, }, headerTintColor: '#47ffcc', headerTitleAlign: 'center', headerTitleStyle: {fontWeight: 'bold',} }} />
       
      </Drawer.Navigator>
      
    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#47ffcc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
