import axios from 'axios'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useHistory } from 'react-router'
import { UserContext } from '../hooks/UserContext'

const Add = () => {
    const history = useHistory()
    const [title,setTitle] = useState('')
    const [content, setContent] = useState('')
    return (
        <UserContext.Consumer>
            {({url,userid,setLoadarticle})=>(
                <View style={styles.container}>
                    <TextInput label="Title.." onChangeText={(e)=>setTitle(e)}/>
                    <TextInput label="Content.." style={styles.textarea} onChangeText={(e)=>setContent(e)}/>
                    <Button icon="book" mode="contained" onPress={()=>{
                        if(title == '' || content == ''){
                            alert('Form Empty')
                        }else{
                            const fdata = {
                                userid: userid,
                                title: title,
                                content: content
                            }
                            axios.post(`${url}/api/article`,fdata).then(()=>{
                                setLoadarticle(true)
                                history.push('/')
                            })
                        }
                    }}>Save</Button>
                </View>
            )}
        </UserContext.Consumer>
    )
}

export default Add

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 10,
        paddingTop:30,
        paddingBottom:20
    },
    textarea: {
        height: 100,
        marginTop: 10,
        marginBottom: 20
    }
})
