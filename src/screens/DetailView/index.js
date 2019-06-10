// @flow
import * as React from "react";
import { View, Image, Dimensions, ActivityIndicator } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";

import {
  Grayscale,
  Temperature,
  Sepia,
  Tint,
  ColorMatrix,
  concatColorMatrices,
  invert,
  contrast,
  saturate
} from "react-native-color-matrix-image-filters";

import styles from "./styles";
import DetailsFooter from "./components/DetailsFooter";

type Props = {
  imageUrl: string,
  isLoading: boolean,
  shareCallback: Function,
  applyFilterCallback: Function,
  pictureDetails: Object
};

const { width } = Dimensions.get("window");

class DetailView extends React.PureComponent<Props> {
  render() {
    const {
      imageUrl,
      isLoading,
      shareCallback,
      applyFilterCallback,
      pictureDetails,
      author,
      camera,
      goBack
    } = this.props;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="small" />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={styles.imageContainer}>
              <ImageZoom
                cropWidth={Dimensions.get("window").width}
                cropHeight={Dimensions.get("window").height}
                imageWidth={width * 0.9}
                imageHeight={width * 0.9}
                enableSwipeDown
                onSwipeDown={() => goBack()}
                onDragLeft={() => {
                  console.log("trgiiger");
                }}
              >
                <Image source={{ uri: imageUrl }} style={styles.imageStyle} />
              </ImageZoom>
            </View>
            <DetailsFooter
              author={author}
              camera={camera}
              pictureDetails={pictureDetails}
              shareCallback={shareCallback}
              applyFilterCallback={applyFilterCallback}
              imageUrl={imageUrl}
            />
          </View>
        )}
      </View>
    );
  }
}

export default DetailView;
