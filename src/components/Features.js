import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Features = () => {
  return (
    <ScrollView style={styles.head}>
      <Text style={styles.heading}>Features</Text>
      <View style={styles.viewing}>
        <View style={styles.img}>
          <Image
            source={require('../../assets/images/chatgptIcon.png')}
            style={styles.logo}
          />
          <Text style={styles.texts}>ChatGPT</Text>
        </View>
        <Text style={styles.text2}>
          ChatGPT can provide you instant and knowledgable responses, assists
          you with creative ideas on a wide range of topics
        </Text>
      </View>

      <View style={styles.viewing1}>
        <View style={styles.img}>
          <Image
            source={require('../../assets/images/dalleIcon.png')}
            style={styles.logo}
          />
          <Text style={styles.text}>Dall-E</Text>
        </View>
        <Text style={styles.text2}>
          Dall-E can generate imaginative and diversive images from textual
          description expanding the boundaries of visual creativity.
        </Text>
      </View>

      <View style={styles.viewing2}>
        <View style={styles.img}>
          <Image
            source={require('../../assets/images/smartaiIcon.png')}
            style={styles.logo}
          />
          <Text style={styles.text}>Smart AI</Text>
        </View>
        <Text style={styles.text2}>
          A powerful voice Assistant with the abilities of Chat GPT and Dalle-E
          providing you the best of both worlds.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Features;

const styles = StyleSheet.create({
  heading: {
    color: '#000',
    fontSize: wp(7),
    textAlign: 'center',
    marginTop: 5,
  },
  head: {
    height: hp(66),
  },
  texts: {
    color: '#61677A',
    fontSize: wp(5),
    paddingLeft:10
  },
  viewing: {
    backgroundColor: '#78D6C6',
    margin: 5,
    marginBottom:1,
    borderRadius: 15,
  },
  viewing1: {
    backgroundColor: '#E5CFF7',
    margin: 5,
    marginBottom:1,
    borderRadius: 15,
  },
  viewing2:{
    backgroundColor:'#A6F6FF',
    margin: 5,
    marginBottom:1,
    borderRadius: 15,
  },
  logo: {
    width: wp(13),
    height: hp(6),
    marginBottom: 0,
    borderRadius: 5,
  },
  img: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingTop: 15,
  },
  text: {
    color: '#61677A',
    fontSize: wp(5),
    paddingLeft: 10,
  },
  text2: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    fontSize: wp(5),
    color: '#61677A',
  },
});
