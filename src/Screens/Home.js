import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
// import {WebView} from 'react-native-webview';
// import TabNavigator from 'react-native-tab-navigator';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import HomeCategories from '../Components/HomeCategories';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      // selectedTab: 'tabCategories',
    };
  }

  componentDidMount() {
    this.getCategories();
  }

  getCategories = async () => {
    try {
      this.setState({isLoading: true});
      const res = await axios.get('https://api.styletc.com/api/v2/home');
      // console.log('res: ', res.data);
      this.setState({
        data: res.data.data.categories,
        isLoading: false,
      });
      // console.log('data:', this.state.data);
    } catch (err) {
      console.warn(err);
      this.setState({
        data: [],
        isLoading: false,
      });
    }
  };

  render() {
    const {isLoading, data} = this.state;

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={Style.wrapper}>
          {/* <TabNavigator tabBarStyle={Style.tabBar}>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'tabCategories'}
              title="Categories"
              titleStyle={{color: 'grey'}}
              selectedTitleStyle={{color: 'black'}}
              renderIcon={() => (
                <Ionicons name="shirt-outline" size={22} color="grey" />
              )}
              renderSelectedIcon={() => (
                <Ionicons name="shirt-outline" size={22} color="black" />
              )}
              onPress={() => this.setState({selectedTab: 'tabCategories'})}>
              <View style={Style.container}>
                {isLoading ? (
                  <ActivityIndicator
                    size={24}
                    style={Style.activityIndicator}
                    color={'grey'}
                  />
                ) : (
                  <HomeCategories items={data} />
                )}
              </View>
            </TabNavigator.Item>
          </TabNavigator> */}
          <View style={Style.container}>
            {isLoading ? (
              <ActivityIndicator
                size={24}
                style={Style.activityIndicator}
                color={'grey'}
              />
            ) : (
              <HomeCategories items={data} />
            )}
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const Style = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  tabBar: {
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  activityIndicator: {
    paddingVertical: 30,
  },
});

export default Home;
