import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, FAB, List, TextInput } from 'react-native-paper'
import { useHistory } from 'react-router'
import { UserContext } from '../hooks/UserContext'

const Home = () => {
    const history = useHistory()
    const [search,setSearch] = useState('')
    const filtered = (all) => {
        return all.title.toUpperCase().indexOf(search.toUpperCase()) > -1
    }
    return (
        <UserContext.Consumer>
            {({articles})=>(
                <View style={styles.container}>
                    <TextInput label="Search..." onChangeText={(e)=>setSearch(e)} style={styles.search}/>
                    <ScrollView>
                        {articles.filter(filtered).map((item,i)=>(
                            <List.Item
                                key={i}
                                title={item.title}
                                description={item.content}
                                left={props => <List.Icon {...props} icon="book"/>}
                                right={()=>(
                                    <Button icon="eye" mode="text" style={styles.btn} onPress={()=>{
                                        history.push(`/article/${item.id}`)
                                    }}/>
                                )}
                            />
                        ))}
                    </ScrollView>
                    <FAB style={styles.fab}
                        small
                        icon="plus"
                        onPress={()=>{
                            history.push('/articleadd')
                        } }
                    />
                </View>
            )}
        </UserContext.Consumer>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 10,
        paddingTop:30,
        paddingBottom:20
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000'
    },
    search: {
        height: 50,
        justifyContent: 'flex-end',
    },
    btn: {
        fontSize: 40
    }
})
