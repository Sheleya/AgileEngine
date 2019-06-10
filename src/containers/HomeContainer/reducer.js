// @flow
const initialState = {
  pictures: [],
  isLoading: true,
  page: 1,
  errorMessage: "",
  isMore: false,
  isError: false
};

export default function(state: any = initialState, action: Object) {
  const { payload, type } = action;
  switch (type) {
    case "PICTURES_FETCH_SUCCESS":
      if (payload.data.page === 1) {
        return {
          ...state,
          isLoading: false,
          page: payload.data.page,
          pictures: payload.data.pictures,
          isMore: payload.data.hasMore,
          isError: false
        };
      }
      let pictures = state.pictures.concat(payload.data.pictures);
      return {
        ...state,
        isLoading: false,
        page: payload.data.page,
        pictures,
        isMore: payload.data.hasMore,
        isError: false
      };
      break;
    case "FETCH_FAILED":
      return {
        ...state,
        isError: true,
        isLoading: false,
        errorMessage: payload.message
      };
      break;
    case "PICTURES_FETCH_REQUESTED":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
      break;
    default:
      return {
        ...state
      };
  }
}
