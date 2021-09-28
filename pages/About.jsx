import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const About = () => {
    return (
        <View style={styles.container}>
            <Text>This APP made by React Native</Text>
        </View>
    )
}

export default About

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal: 10,
        paddingTop:30,
        paddingBottom:20
    }
})
