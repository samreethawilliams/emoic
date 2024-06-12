import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import {Ionicons} from '@expo/vector-icons';
import Checkbox from 'expo-checkbox'
import { useNavigation } from '@react-navigation/native';


const Login = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fffaf0'}}>
      <View style={{flex:1, marginHorizontal:22}}>
          
          
              <View style={{marginBottom:12}}>
                <Text style={{
                  fontSize:16,
                  fontWeight:400,
                  marginVertical:8
                  }}>Email address</Text>

                <View style={{
                    width:"100%",
                    height:48,
                    borderWidth:1,
                    borderRadius:8,
                    alignItems:"center",
                    justifyContent:"center",
                    paddingLeft:22
                }}>
                  <TextInput
                      placeholder='Enter your email address'
                      placeholderTextColor={'#808080'}
                      keyboardType='email-address'
                        style={{
                          width:"100%"
                        }}
                      />
                </View>  

              </View>

              <View style={{marginBottom:12}}>
                <Text style={{
                  fontSize:16,
                  fontWeight:400,
                  marginVertical:8
                  }}>Password</Text>

                <View style={{
                    width:"100%",
                    height:48,
                    borderWidth:1,
                    borderRadius:8,
                    alignItems:"center",
                    justifyContent:"center",
                    paddingLeft:22
                }}>
                  <TextInput
                      placeholder='Enter your password'
                      placeholderTextColor={'#808080'}
                      secureTextEntry={isPasswordShown}
                        style={{
                          width:"100%"
                        }}
                      />

                      <TouchableOpacity 
                          onPress={()=>setIsPasswordShown(!isPasswordShown)}
                          style={{
                          position:"absolute",
                          right:12
                      }}>
                      {
                        isPasswordShown == true? (
                          <Ionicons name="eye-off" size={24} color={'#808080'}/>
                        ) : (
                          <Ionicons name="eye" size={24} color={'#808080'}/>
                        )
                      }

                      </TouchableOpacity>

                </View>  

              </View>

            <Button
              title='Login'
              onPress={() => navigation.navigate('Login')}
              //filled
              color={'#2f4f4f'}
              style={{
                marginTop:18,
                marginBottom:4
              }}
            />

        </View>
    </SafeAreaView>
  )
}

export default Login