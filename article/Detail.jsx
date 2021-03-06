import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Paragraph, Title } from 'react-native-paper'
import { useHistory, useParams } from 'react-router'
import { UserContext } from '../hooks/UserContext'

const Detail = () => {
    const url = 'https://sanctumtyo.herokuapp.com'
    const {id} = useParams()
    const [article, setArticle] = useState([])
    const getArticle = async() => {
        try {
            let res = await axios.get(`${url}/api/article/${id}`)
            setArticle(res.data)
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
            {({userid,setLoadarticle})=>(
                <View style={styles.container}>
                    <ScrollView style={styles.scv}>
                        {article.map((item,i)=>(
                            <View key={i}>
                                <Title style={styles.title}>{item.title}</Title>
                                <Paragraph style={styles.paragraf}>{item.content}</Paragraph>
                                {userid == item.userid && 
                                    <View style={styles.nav}>
                                        <Button icon="pen" mode="outlined" style={styles.edit} onPress={()=>{
                                            history.push(`/articleupdate/${item.id}`)
                                        }}>Edit</Button>
                                        <Button icon="delete" mode="outlined" style={styles.del} onPress={()=>{
                                            axios.delete(`${url}/api/article/${id}`).then(()=>{
                                                setLoadarticle(true)
                                                history.push('/')
                                            })
                                        }}>DELETE</Button>
                                    </View>
                                }
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )}
        </UserContext.Consumer>
    )
}

export default Detail

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 10,
        paddingTop:30,
        paddingBottom:20
    },
    title: {
        marginBottom: 20
    },
    paragraf: {
        textAlign: 'justify',
    },
    nav: {
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        height: 40,
        marginTop: 20
    },
    edit: {
        width: '49%',
        borderColor: '#6dbfa8'
    },
    del: {
        width: '49%',
        borderColor: '#bf6d6d'
    },
    scv: {
        overflow: 'hidden',
    }
})
