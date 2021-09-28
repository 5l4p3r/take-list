import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Profile = () => {
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
        </View>
    )
}

export default Profile

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
