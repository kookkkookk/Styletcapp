import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {withNavigation} from '@react-navigation/compat';

class HomeCategories extends Component {
  componentDidMount() {
    console.log('props.items: ', this.props.items);
  }

  // gotoArticle = () => {
  //   console.log('123');
  // };

  render() {
    const {navigation, items} = this.props;
    return (
      <ScrollView style={Style.wrapper}>
        {items.length > 0 ? (
          items.map((item, idx) => (
            <View key={idx} style={Style.main}>
              <View style={Style.titleBox}>
                <Text key={idx} style={Style.title}>
                  {item.name}
                </Text>
                <View style={Style.titleDecorate}>
                  <View style={Style.titleDecorateInsideLeft} />
                  <View style={Style.titleDecorateInsideRight} />
                </View>
              </View>
              <View style={Style.contentBox}>
                {item.articles.map((article, artIdx) => (
                  <TouchableOpacity
                    key={artIdx}
                    onPress={() =>
                      navigation.navigate('Article', {
                        categoryName: item.name,
                        articleId: article.article_id,
                      })
                    }>
                    <View
                      style={
                        artIdx === 0 ? Style.contentItem : Style.contentItemRow
                      }>
                      <Image
                        resizeMode="contain"
                        style={
                          artIdx === 0 ? Style.contentImg : Style.contentImgRow
                        }
                        source={{uri: article.cover.md}}
                      />
                      <View style={artIdx !== 0 ? Style.contentInfo : ''}>
                        <Text
                          key={idx}
                          numberOfLines={3}
                          style={
                            artIdx === 0
                              ? Style.contentTitle
                              : Style.contentTitleRow
                          }>
                          {article.title}
                        </Text>
                        <View style={Style.contentPublishBox}>
                          <Text style={Style.contentPublishDate}>
                            {/* {item.name}
                            {article.article_id}
                            {'-'} */}
                            {article.publish_at}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))
        ) : (
          <ActivityIndicator size={24} color={'grey'} />
        )}
      </ScrollView>
    );
  }
}

const Style = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  main: {
    flex: 1,
    marginBottom: 30,
  },
  titleBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    color: '#4A4A4A',
    fontSize: 24,
  },
  titleDecorate: {
    width: 60,
    height: 5,
    marginTop: 5,
    flex: 1,
    flexDirection: 'row',
  },
  titleDecorateInsideLeft: {
    width: 25,
    height: 5,
    backgroundColor: '#a1d0ae',
  },
  titleDecorateInsideRight: {
    width: 35,
    height: 5,
    backgroundColor: '#2e2e2e',
  },
  contentBox: {
    flex: 1,
    paddingHorizontal: 15,
  },
  contentItem: {
    flex: 1,
    marginBottom: 20,
  },
  contentItemRow: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  contentImg: {
    width: '100%',
    height: 250,
  },
  contentImgRow: {
    width: '50%',
    height: 125,
  },
  contentInfo: {
    width: '50%',
    marginTop: 5,
  },
  contentTitle: {
    color: '#2e2e2e',
    fontSize: 18,
    lineHeight: 24,
    marginTop: 5,
  },
  contentTitleRow: {
    color: '#2e2e2e',
    fontSize: 16,
    lineHeight: 22,
    marginLeft: 10,
  },
  contentPublishBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  contentPublishDate: {
    fontSize: 14,
    color: '#919191',
  },
});

export default withNavigation(HomeCategories);
