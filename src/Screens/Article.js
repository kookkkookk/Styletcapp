import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import axios from 'axios';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: {},
    };
  }

  componentDidMount() {
    this.getArticle();
  }

  getArticle = async () => {
    console.log('articleId: ', this.props.route.params.articleId);
    const articleId = this.props.route.params.articleId;
    try {
      this.setState({isLoading: true});
      const res = await axios.get(
        `https://api.styletc.com/api/v2/article/${articleId}`,
      );
      // console.log('res: ', res.data);
      this.setState({
        data: res.data.data.article,
        isLoading: false,
      });
      // console.log('data:', this.state.data);
    } catch (err) {
      console.warn(err);
      this.setState({
        data: {},
        isLoading: false,
      });
    }
  };

  authorFilter = (participants) => {
    if (participants !== undefined) {
      return participants.author !== ''
        ? `作者／${participants.author}`
        : participants.editor !== ''
        ? `編輯／${participants.editor}`
        : `記者／${participants.reporter}`;
    } else {
      return 'Styletc';
    }
  };

  render() {
    const {isLoading, data} = this.state;

    return (
      <>
        <ScrollView style={Style.wrapper}>
          <View style={Style.container}>
            {isLoading ? (
              <ActivityIndicator
                size={24}
                style={Style.activityIndicator}
                color={'grey'}
              />
            ) : (
              <View>
                <Text style={Style.title}>{data.title}</Text>
                <View style={Style.publishAndAuthor}>
                  <Text style={Style.publish}>{data.publish_at}</Text>
                  <Text style={Style.author}>
                    {this.authorFilter(data.participants)}
                  </Text>
                </View>
                <Image
                  resizeMode="contain"
                  style={Style.image}
                  source={{uri: data.cover !== undefined ? data.cover.md : ''}}
                />
                <Text style={Style.caption}>{data.caption}</Text>
                <Text style={Style.contentText}>{data.pure_content}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </>
    );
  }
}

const Style = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    marginTop: 20,
    paddingBottom: 50,
  },
  activityIndicator: {
    paddingVertical: 30,
  },
  title: {
    fontSize: 30,
    lineHeight: 38,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  publishAndAuthor: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  publish: {
    fontSize: 18,
  },
  author: {
    fontSize: 18,
    marginLeft: 20,
  },
  image: {
    width: '100%',
    height: 250,
    marginTop: 20,
  },
  caption: {
    fontSize: 16,
    color: '#939393',
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 5,
  },
  contentText: {
    fontSize: 18,
    color: '#2e2e2e',
    lineHeight: 26,
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default withNavigation(Article);
