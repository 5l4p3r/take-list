import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Link, NativeRouter, Route } from 'react-router-native'
import Add from './article/Add'
import { UserContext } from './hooks/UserContext'
import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { Button, TextInput } from 'react-native-paper'
import Detail from './article/Detail'
import Edit from './article/Edit'

const App = () => {
  const url = 'https://sanctumtyo.herokuapp.com'
  const [load, setLoad] = useState(false)
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('error')
  const [userid, setUserid] = useState(0)
  const login = async() => {
    const fdata = {
      email: email,
      password: password
    }
    await axios.post(`${url}/api/login`,fdata).then((res)=>{
      setMessage(res.data.message)
      setUserid(res.data.id)
    })
  }


  const [loadarticle, setLoadarticle] = useState(true)
  const [articles, setArticles] = useState([])
  const getArticles = async() => {
    await axios.get(`${url}/api/articles`).then((res)=>{
      setArticles(res.data)
    })
  }


  const [pswd, setPswd] = useState(true)

  useEffect(()=>{
    if(load){
      login()
      setLoad(false)
    }
    if(loadarticle){
      getArticles()
      setLoadarticle(false)
    }
  })
  if(message === 'success'){
    return (
      <UserContext.Provider value={{
        userid: userid,
        articles: articles,
        url: url,
        setLoadarticle: setLoadarticle
      }}>
        <NativeRouter>
          <Route exact path="/" component={Home}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/about" component={About}/>
          <Route path="/articleadd" component={Add}/>
          <Route path="/article/:id" component={Detail}/>
          <Route path="/articleupdate/:id" component={Edit}/>
          <View style={styles.btm}>
            <View style={styles.nav}>
              <Link to="/" style={styles.navItem}>
                <Button icon="home" mode="text" style={styles.btnf}>Home</Button>
              </Link>
              <Link to="/profile" style={styles.navItem}>
                <Button icon="home" mode="text" style={styles.btnf}>Profile</Button>
              </Link>
              <Link to="/about" style={styles.navItem}>
                <Button icon="home" mode="text" style={styles.btnf}>About</Button>
              </Link>
            </View>
          </View>
        </NativeRouter>
      </UserContext.Provider>
    )
  }else{
    return (
      <View style={styles.container}>
        <TextInput 
          label="Email"
          onChangeText={(e)=>setEmail(e)}
          style={styles.input}
        />
        <TextInput
          label="Password"
          secureTextEntry={pswd}
          onChangeText={(e)=>setPassword(e)}
          style={styles.input}
          
          right={<TextInput.Icon name="eye" onPress={()=>{
            if(pswd === true){
              setPswd(false)
            }else{
              setPswd(true)
            }
          }}/>}
        />
        <Button icon="key" mode="text" onPress={()=>setLoad(true)}>Login</Button>
      </View>
    )
  }
}

export default App

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',
    height: 40,
    position:'relative',
    bottom: 0,
    color: '#000000'
  },
  navItem: {
    fontSize:30,
    color: '#000000',
  },
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  input: {
    height: 50,
    width: '95%',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10
  },
  btn: {
    height: 40,
    borderRadius: 10,
  },
  btnf: {
    color: '#000000'
  },
})
