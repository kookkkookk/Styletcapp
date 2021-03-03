import React, {Component} from 'react';
import {StyleSheet, View, Image, Animated} from 'react-native';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.animatedBg = new Animated.Value(0);
    // this.animatedLogo = new Animated.Value(0);
  }

  componentDidMount() {
    /*
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.animatedBg, {
          toValue: 1,
          duration: 700,
        }),
        Animated.timing(this.animatedLogo, {
          toValue: 1,
          duration: 650,
        }),
      ]),
    ]).start();
    */
    Animated.timing(this.animatedBg, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();

    setTimeout(() => this.props.navigation.replace('Home'), 1500);
  }

  render() {
    return (
      <Animated.View
        style={[
          {
            opacity: this.animatedBg.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
          Style.wrapper,
        ]}>
        <Image
          style={Style.logoIcon}
          source={require('../images/logo_w.png')}
        />
      </Animated.View>
    );
  }
}

const Style = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a1d0ae',
  },
  logoIcon: {
    width: 174,
    height: 66,
  },
});

export default Welcome;
