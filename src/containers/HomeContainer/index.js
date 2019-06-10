// @flow
import * as React from "react";
import {
  AsyncStorage,
  Platform,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";

import HomeView from "../../screens/Home";
import { fetchPictures } from "./actions";
import { getToken } from "../../services/API";

export interface Props {
  navigation: any;
  fetchPictures: Function;
  pictures: Array<Object>;
  isLoading: boolean;
}

export interface State {}

class HomeContainer extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    StatusBar.setBarStyle("light-content");
    Platform.OS === "android" && StatusBar.setBackgroundColor("#000");
    this.onRefresh = this.onRefresh.bind(this);
    this.onLoadNext = this.onLoadNext.bind(this);
    this.setEndReachCall = this.setEndReachCall.bind(this);
    this.onEndReachedCalledDuringMomentum = true;
  }

  async componentDidMount() {
    let token = await AsyncStorage.getItem("token");
    !token && this.receiveToken();
    this.onRefresh();
  }

  receiveToken(): void {
    getToken().then(res => {
      const token = res.data.token;
      AsyncStorage.setItem("token", token);
    });
  }

  onRefresh(page: number = 1): void {
    this.props.fetchPictures(page);
  }

  onLoadNext(): void {
    const { page, isMore } = this.props;
    if (isMore) {
      this.props.fetchPictures(page + 1);
    }
  }

  setEndReachCall(flag: boolean): void {
    this.onEndReachedCalledDuringMomentum = flag;
  }

  render() {
    const { isLoading, isError, errorMessage } = this.props;
    return (
      <HomeView
        {...this.props}
        onRefresh={this.onRefresh}
        onLoadNext={this.onLoadNext}
        setEndReachCall={this.setEndReachCall}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
    fetchPictures: page => dispatch(fetchPictures(page))
  };
}

const mapStateToProps = state => ({
  pictures: state.homeReducer.pictures,
  page: state.homeReducer.page,
  isLoading: state.homeReducer.isLoading,
  isMore: state.homeReducer.isMore,
  isError: state.homeReducer.isError,
  errorMessage: state.homeReducer.errorMessage
});

export default connect(
  mapStateToProps,
  bindAction
)(HomeContainer);
