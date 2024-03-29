import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicon from "react-native-vector-icons/Ionicons"
import { connect } from 'react-redux';
import jsonserver from '../../api/server'
class tailorCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Dress_MET_69.2.1_front_CP4.jpg/220px-Dress_MET_69.2.1_front_CP4.jpg",
      heartState: this.props.heartState,
      data: ""

    };
  }
  componentDidMount() {
    if (this.props.item.profile_photo != "")
      this.setState({ image: this.props.item.profile_photo })
    if (typeof this.props.item !== "undefined") {
      this.setState({ data: this.props.item })

    }
  }
  handleFav() {
    if (this.state.heartState === "heart-outline") {
      jsonserver.put(`user/add_favorite_tailor/${this.state.data._id}/${(this.props.userdata)._id}`)
        .then((response) => {
          var temp = []
          temp = this.props.userfavtailor
          temp.push(this.state.data)

          this.props.set_user_all_fav_tailor(temp.reverse())
          this.setState({ heartState: "heart" })
        })
        .catch((error) => {
          alert("error adding fav")
        })
    }
    else {
      let id = this.state.data._id
      if (typeof this.state.data.post_id != 'undefined') {
        id = this.state.data.post_id
      }
      jsonserver.put(`user/remove_favorite_tailor/${id}/${(this.props.userdata)._id}`)
        .then((response) => {
          var temp = []
          temp = this.props.userAllFavoriteData
          temp.splice(temp.findIndex((x) => { return x.post_id == this.state.data._id }), 1)
          this.props.set_user_all_fav_suit(temp)
          var tempallposts = this.props.userallposts;

          tempallposts.map((x) => {
            if (x._id === this.state.data._id) {
              x.heartState = "heart-outline"
            }
          })
          this.props.set_user_all_posts(tempallposts)
          this.setState({ heartState: "heart-outline" })
        })
        .catch((error) => {
          alert("error removing fav")
        })
    }

  }
  render() {
    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>

          <TouchableOpacity
            onPress={() => {
              this.handleFav()
            }}
            style={{ position: "absolute", marginLeft: "90%", marginTop: "2%", backgroundColor: "rgba(255,255,255,0.5)", borderRadius: 50, alignItems: "center", justifyContent: "center", zIndex: 10, }}
          >
            {this.props.canFav && (
              <Ionicon name={this.state.heartState} size={30} color="red" />
            )}

          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.onPress}>
            <Image
              source={{
                uri: this.state.image

              }}
              style={{
                height: '80%',
                width: '100%',
              }}
            />
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Text style={styles.text}>Name: </Text>
              <Text>
                {this.props.item.first_name} {this.props.item.last_name}
              </Text>
            </View>
            {this.props.showData && (
              <>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.text}>Average Stichting Rat: </Text>
                  <Text>{this.props.item.average_rate_per_stitching}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.text}>Experience: </Text>
                  <Text>{this.props.item.experience}</Text>
                </View>
              </>
            )}
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>Address: </Text>
              <Text>{this.props.item.address}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    height: 320,
    elevation: 3,
    backgroundColor: '#fff',
    // shadowColor:"#333",
    // shadowOpacity:0.3,
    // shadowRaduis:2,
    marginHorizontal: 1,
    marginVertical: 6,
    // paddingBottom: 80
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
const mapStateToProps = state => {
  return {
    userdata: state.userdata,
    userAllFavoriteData: state.userfavsuit,
    userallposts: state.userallposts,
    userfavtailor: state.userfavtailor,

  }
}
const mapDispatchToProps = dispatch => {
  return {
    set_user_all_fav_suit: (data) => { dispatch({ type: "USER_FAV_SUIT", userfavsuit: data }) },
    set_user_all_posts: (data) => { dispatch({ type: "USER_ALLPOSTS", userallposts: data }) },
    set_user_all_fav_tailor: (data) => { dispatch({ type: "USER_FAV_TAILOR", userfavtailor: data }) },


  }
}
export default connect(mapStateToProps, mapDispatchToProps)(tailorCard)