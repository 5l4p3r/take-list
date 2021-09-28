import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useParams,useHistory } from 'react-router'
import { UserContext } from '../hooks/UserContext'

const Edit = () => {
    const url = 'https://sanctumtyo.herokuapp.com'
    const [title,setTitle] = useState('')
    const [content, setContent] = useState('')
    const {id} = useParams()

    const [article, setArticle] = useState([])
    const getArticle = async() => {
        try {
            let res = await axios.get(`${url}/api/article/${id}`)
            setArticle(res.data)
            {res.data.map((index)=>{
                setTitle(index.title)
                setContent(index.content)
            })}
        } catch (error) {
            alert(error)
        }
    }
    const history = useHistory()
    useEffect(()=>{
        getArticle()
    },[])
    
    return (
        <UserContext.Consumer>
            {({setLoadarticle})=>(
                <View style={styles.container}>
                    {article.map((item,i)=>(
                        <View style={styles.container} key={i}>
                            <TextInput label="Title.." defaultValue={item.title} onChangeText={(e)=>setTitle(e)} />
                            <TextInput label="Content.." defaultValue={item.content} style={styles.textarea} onChangeText={(e)=>setContent(e)}/>
                            <Button icon="book" style={styles.btn} mode="contained" onPress={()=>{
                                const fdata = {
                                    id: id,
                                    title: title,
                                    content: content
                                }
                                axios.post(`${url}/api/article/edit`,fdata).then(()=>{
                                    setLoadarticle(true)
                                    history.push(`/article/${item.id}`)
                                })
                            }}>Save</Button>
                        </View>
                    ))}
                </View>
            )}
        </UserContext.Consumer>
    )
}

export default Edit

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 10,
        paddingTop:30,
        paddingBottom:20
    },
    textarea: {
        height: 200,
        marginTop: 10,
        marginBottom: 20
    },
    btn: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    }
})
