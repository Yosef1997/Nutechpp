const initialState = {
  allProduct: null,
  detail: null,
  pageInfoProduct: null,
  message: '',
  errorMsg: ''
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCT': {
      return {
        ...state,
        allProduct: action.payload
      }
    }
    case 'PAGE_INFO_ALL_PRODUCT':
      return {
        ...state,
        pageInfoProduct: action.payload
      }
    case 'CREATE_PRODUCT': {
      return {
        ...state,
        message: action.message
      }
    }
    case 'EDIT_PRODUCT': {
      return {
        ...state,
        allProduct: [{...state.allProduct},{...action.payload}],
        detail: {...state.detail,...action.payload},
        message: action.message
      }
    }
    case 'DETAIL_PRODUCT': {
      return {
        ...state,
        detail: action.payload
      }
    }
    case 'DELETE_PRODUCT': {
      return {
        ...state,
        message: action.message
      }
    }
    case 'SET_PRODUCT_MESSAGE': {
      return {
        ...state,
        message: '',
        errorMsg: action.payload
      }
    }
    default:
      return { ...state }
  }
}

export default productReducer