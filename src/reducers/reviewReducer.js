import {
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAILURE,
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAILURE,
} from '../actions/reviewAction';

const initialState = {
  loading: false,
  reviews: [],
  review: {},
  error: '',
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
    case FETCH_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        review: action.payload,
        error: '',
      };
    case CREATE_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        review: {},
        error: action.payload,
      };
    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload,
        error: '',
      };
    case FETCH_REVIEWS_FAILURE:
      return {
        ...state,
        loading: false,
        reviews: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reviewReducer;
