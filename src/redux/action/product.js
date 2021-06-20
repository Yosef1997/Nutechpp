import http from '../../components/helper/http'

export const getProduct = (token, search, sort, order, limit, page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_PRODUCT_MESSAGE',
        payload: ''
      })
      const results = await http(token).get(
        `/product?search=${search !== undefined ? search : ''}&limit=${
          limit !== undefined ? limit : 4
        }&page=${page !== undefined ? page : 1}&sort=${
          sort !== undefined ? sort : 'id'
        }&order=${order !== undefined ? order : 'ASC'}`
      )
      dispatch({
        type: 'GET_PRODUCT',
        payload: results.data.results
      })
      dispatch({
        type: 'PAGE_INFO_ALL_PRODUCT',
        payload: results.data.pageInfo.nextLink
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_PRODUCT_MESSAGE',
        payload: message
      })
    }
  }
}

export const createProduct = (token, data) => {
  return async (dispatch) => {
    try {
      const form = new FormData()
      Object.keys(data).forEach((key) => {
        form.append(key, data[key])
      })
      dispatch({
        type: 'SET_PRODUCT_MESSAGE',
        payload: ''
      })
      const results = await http(token).post('/product', form)
      dispatch({
        type: 'CREATE_PRODUCT',
        message: results.data.message
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data

      dispatch({
        type: 'SET_PRODUCT_MESSAGE',
        payload: message
      })
    }
  }
}

export const editProduct = (token, id, data) => {
  return async (dispatch) => {
    try {
      const form = new FormData()
      Object.keys(data).forEach((key) => {
        form.append(key, data[key])
      })
      dispatch({
        type: 'SET_PRODUCT_MESSAGE',
        payload: ''
      })
      const results = await http(token).patch(`/product/${id}`, form)
      dispatch({
        type: 'EDIT_PRODUCT',
        payload: results.data.results,
        message: results.data.message
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data

      dispatch({
        type: 'SET_PRODUCT_MESSAGE',
        payload: message
      })
    }
  }
}

export const detailProduct = (token, id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_PRODUCT_MESSAGE',
        payload: ''
      })
      const results = await http(token).get(`/product/${id}`)
      dispatch({
        type: 'DETAIL_PRODUCT',
        payload: results.data.results
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_PRODUCT_MESSAGE',
        payload: message
      })
    }
  }
}

export const deleteProduct = (token, id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_PRODUCT_MESSAGE',
        payload: ''
      })
      const results = await http(token).delete(`/product/${id}`)
      dispatch({
        type: 'DELETE_PRODUCT',
        message: results.data.message
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_PRODUCT_MESSAGE',
        payload: message
      })
    }
  }
}

export const newLink = (pageInfo) => {
  return async (dispatch) => {
    dispatch({
      type: 'PAGE_INFO_ALL_PRODUCT',
      payload: pageInfo
    })
  }
}
