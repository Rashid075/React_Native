import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Voice from '@react-native-community/voice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Features from '../components/Features';
import { apiCall } from '../api/OpenAI';
import Tts from 'react-native-tts';

const HomeScreen = () => {
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState('');

  const speechStartHandler = (e) => {
    console.log('Speech Started');
  };

  const speechEndHandler = (e) => {
    setRecording(false);
    console.log('Speech Stopped');
  };

  const speechResultHandler = (e) => {
    console.log('Voice Result', e);
    const text = e.value[0];
    setResult(text);
  };

  const startRecording = async () => {
    setRecording(true);
    try {
      await Voice.start('en-GB');
    } catch (error) {
      console.log('error', error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setRecording(false);
      Tts.stop();
      // fetch Response
      fetchResponse();
    } catch (error) {
      console.log('error', error);
    }
  };

  const fetchResponse = () => {
    console.log('Function Called');
    if (result.trim().length > 0) {
      let newMessages = [...messages];
      newMessages.push({ role: 'user', content: result.trim() });
      setMessages([...newMessages]);
      apiCall(result.trim(), newMessages).then((res) => {
        if (res.success) {
          setMessages([...res.data]);
          setResult('');
          startTextToSpeech(res.data[res.data.length - 1]);
        } else {
          console.log('Error');
        }
      });
    }
  };

  const startTextToSpeech = (message) => {
    if (!message.content.includes('https')) {
      setRecording(true);
      Tts.speak(message.content, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.5,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
    }
  };

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultHandler;

    Tts.addEventListener('tts-start', (event) => console.log('start', event));
    Tts.addEventListener('tts-progress', (event) => console.log('progress', event));
    Tts.addEventListener('tts-finish', (event) => console.log('finish', event));
    Tts.addEventListener('tts-cancel', (event) => console.log('cancel', event));
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const clear = () => {
    setMessages([]);
  };

  return (
    <View style={styles.home}>
      <SafeAreaView>
        <View style={styles.parent}>
          <Image
            source={require('../../assets/images/welcome.png')}
            style={styles.img}
          />
        </View>
        {messages.length > 0 ? (
          <View>
            <Text style={styles.text}>Assistant</Text>
            <View style={styles.view}>
              <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                {messages.map((message, index) => {
                  if (message.role === 'assistant') {
                    if (message.content.includes('https')) {
                      return (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                          }}>
                          <View
                            style={{
                              padding: 5,
                              borderRadius: 5,
                              marginLeft: 10,
                            }}>
                            <Image
                              source={{ uri: message.content }}
                              resizeMode="contain"
                              style={{ width: wp(45), height: hp(25) }}
                            />
                          </View>
                        </View>
                      );
                    } else {
                      return (
                        <View
                          key={index}
                          style={{
                            width: wp(60),
                            backgroundColor: '#fff',
                            padding: 5,
                            borderRadius: 5,
                            margin: 5,
                            marginLeft: 10,
                          }}>
                          <Text style={{ color: '#000' }}>{message.content}</Text>
                        </View>
                      );
                    }
                  } else {
                    return (
                      <View key={index} style={styles.styling}>
                        <View
                          style={{
                            width: wp(60),
                            backgroundColor: '#fff',
                            padding: 5,
                            borderRadius: 5,
                            margin: 5,
                            marginRight: 10,
                            backgroundColor: '#D0F5BE',
                          }}>
                          <Text style={{ color: '#000' }}>{message.content}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <Features />
        )}
        <View>
          {recording ? (
            <TouchableOpacity style={styles.cont} onPress={stopRecording}>
              <Image
                source={require('../../assets/images/voiceLoading.gif')}
                style={styles.rec}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.cont} onPress={startRecording}>
              <Image
                source={require('../../assets/images/recordingIcon.png')}
                style={styles.rec}
              />
            </TouchableOpacity>
          )}
          {messages.length > 0 && (
            <TouchableOpacity
              style={{
                backgroundColor: 'grey',
                position: 'absolute',
                right: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                padding: 10,
                margin: 20,
              }}
              onPress={clear}>
              <Text style={{ color: '#fff' }}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  img: {
    width: wp(40),
    height: hp(20),
  },
  parent: {
    alignItems: 'center',
  },
  home: {
    backgroundColor: '#fff',
    height: hp(100),
  },
  cont: {
    marginTop: 1,
  },
  text: {
    color: '#61677A',
    fontSize: wp(8),
    marginLeft: 20,
    marginTop: 10,
  },
  view: {
    height: hp(60),
    backgroundColor: '#EEEEEE',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 15,
  },
  styling: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rec: {
    width: wp(22),
    height: hp(10),
    borderRadius: 10,
    marginLeft: 140,
  },
});
