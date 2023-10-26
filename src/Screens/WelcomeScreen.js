import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native'
const WelcomeScreen = () => {
    const navigation=useNavigation();
  return (
    <View style={styles.head}>
      <Text style={styles.txt}>Open AI</Text>
      <View style={styles.view}>
        <Text style={styles.text}>Future Generation AI is Here</Text>
      </View>
      <Image
        source={require('../../assets/images/bot.png')}
        style={styles.img}
      />
      <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate('Home')}}>
        <Text style={styles.get}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  head: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 70,
  },
  img: {
    width: wp(80),
    height: hp(50),
  },
  txt: {
    fontWeight: '600',
    fontSize: wp(10),
    color: '#000',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    fontWeight: '500',
    fontSize: wp(5),
    color: '#000',
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#219C90',
    marginTop: 25,
    padding: 25,
    width: 300,
    borderRadius: 30,
  },
  get: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: wp(6),
  },
});
