import * as React from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import styles from "../styles";
import imageFiltersImage from "./images/ImageFilters.png";
import shareImage from "./images/ShareThis.png";

type Props = {
  shareCallback: Function,
  colorSwitchCallback: Function,
  pictureDetails: Object
};

class DetailsFooter extends React.PureComponent<Props> {
  render() {
    const {
      shareCallback,
      applyFilterCallback,
      pictureDetails,
      author,
      camera,
      imageUrl
    } = this.props;
    if (!pictureDetails) return null;

    return (
      <View style={styles.detailView}>
        <View>
          <Text style={{ color: "#fff" }}>{author}</Text>
          <Text style={{ color: "#fff" }}>{camera}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => applyFilterCallback()}
          >
            <Image
              style={styles.detailViewImage}
              resizeMode="cover"
              source={imageFiltersImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignSelf: "flex-end" }}
            onPress={() => shareCallback(imageUrl)}
          >
            <Image
              style={styles.detailViewImage}
              resizeMode="cover"
              source={shareImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default DetailsFooter;
