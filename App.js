/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import Snackbar from 'react-native-snackbar';
import Axios from 'axios';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';

import { Button } from 'native-base';


const App=() => {

  const [meme, setMeme] = useState('empty');
  const [load,setLoad]=useState(true);

  const fetch =async()=>{
    setLoad(true)
    try{
      const link= await Axios.get('https://meme-api.herokuapp.com/gimme');
      // console.log(link)
      const imgLink=link["data"].url
      // console.log(' ')
      if(imgLink[(imgLink.length)-3]==='g'){
        fetch()
      }
      console.log(imgLink)
      setMeme(imgLink)

    }catch (error){
      console.log(error)
      Snackbar.show({
        text: 'Some error occurred',
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor:'#f10',
        action: {
          text: 'Retry',
          textColor: 'green',
          onPress: () => {fetch()},
        },
      });
    }
    setLoad(false)
  }

  useEffect(() => {fetch()  },[]);

    const onShare = async () => {
      // try {
      //   const result = await Share.share({
      //     message:
      //       meme,
      //   });
      //   if (result.action === Share.sharedAction) {
      //     if (result.activityType) {
      //       // shared with activity type of result.activityType
      //     } else {
      //       // shared
      //     }
      //   } else if (result.action === Share.dismissedAction) {
      //     // dismissed
      //   }
      // } catch (error) {
      //   alert(error.message);
      // }
      const shareOption={
        message:meme,
      }
      try{
        const shareResponse=await Share.open(shareOption);
      }catch(err){
        Snackbar.show({
          text: 'Some error occurred',
          duration: Snackbar.LENGTH_SHORT,
          
        });
      }
    };

  const Loadd=()=>{
    if(load){
      return <ActivityIndicator style={styles.load} size="large" color="#0000ff" />
    }
    return(
      <Image
              resizeMode='contain'
              source={{
                uri: meme,
                width: 350,
                height: 500,
              }}
              style={styles.img}
            />
    )
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.circle}/>
        <View style={styles.front}>
          <Loadd/>   
          <View style={styles.buttonSection}>                  
            <Button onPress={()=>fetch()} style={styles.btn}>
              <Text style={{paddingHorizontal:20}}>Next Meme</Text>
            </Button>
            <Button onPress={()=>onShare()} style={styles.share}>
              <Text style={{paddingHorizontal:20}}>Share</Text>
            </Button>
          </View>
        </View>        
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#99ccff',
  },
  circle:{
    width:1000,
    height:1000,
    marginStart:-350,
    marginTop:-550,
    backgroundColor:'#ccffff',
    borderRadius:25000,
  },
  front:{
    marginTop:-420,
    justifyContent:'center'
  },
  img:{
    alignSelf:'center',
  },
  btn:{
    backgroundColor:'#875',
    marginTop:15,
    alignSelf:'center',
    borderRadius:50,
  },
  load:{
    height:500,
    width:350,
    alignSelf:'center'
  },
  share:{
    backgroundColor:'#875',
    marginTop:15,
    alignSelf:'center',
    borderRadius:50,
  },
  buttonSection:{
    flexDirection:'row',
    justifyContent: 'space-between',
    marginBottom:50,
    marginHorizontal:20
  }
});

export default App;
