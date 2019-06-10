// @flow

export const selectHiResImage = (state: Object, imageId: number) => {
  console.log("state", state);
  return state.detailViewReducer.hiResPictures.find(
    hiResPic => hiResPic.id === imageId
  );
};
