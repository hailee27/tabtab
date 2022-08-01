import { httpRequest } from "@/utils/requestMethods";
import {
  createCardFailure,
  createCardStart,
  createCardSuccess,
  deleteCardFailure,
  deleteCardStart,
  deleteCardSuccess,
  getCardFailure,
  getCardStart,
  getCardSuccess,
  updateCardFailure,
  updateCardStart,
  updateCardSuccess,
} from "./reducer/cardReducer";
import { loginFailure, loginStart, loginSuccess } from "./reducer/loginReducer";
import {
  getProfileFailure,
  getProfileStart,
  getProfileSuccess,
} from "./reducer/profileReducer";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "./reducer/registerReducer";
import {
  getFailure,
  getStart,
  getSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "./reducer/userReducer";

//login
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await httpRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
//register
export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await httpRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

//createCard
export const createCard = async (dispatch, userId, card) => {
  dispatch(createCardStart());
  try {
    const res = await httpRequest.post(`/card/create/${userId}`, card);
    dispatch(createCardSuccess(res.data));
  } catch (err) {
    dispatch(createCardFailure());
  }
};

//getCard by uername
export const getCard = async (dispatch, username) => {
  dispatch(getCardStart());
  try {
    const res = await httpRequest.get(`/card?user=${username}`);
    dispatch(getCardSuccess(res.data));
  } catch (err) {
    dispatch(getCardFailure());
  }
};
//deleteCard
export const deleteCard = async (dispatch, id, userId, user) => {
  dispatch(deleteCardStart());
  try {
    const res = await httpRequest.delete(
      `/card/delete/${id}?userId=${userId}`,
      user
    );
    dispatch(deleteCardSuccess(res.data._id));
  } catch (err) {
    dispatch(deleteCardFailure());
  }
};

//update card

export const updateCard = async (dispatch, id, card) => {
  dispatch(updateCardStart());
  try {
    const res = await httpRequest.put(`/card/update/${id}`, card);
    dispatch(updateCardSuccess(res.data));
  } catch (err) {
    dispatch(updateCardFailure());
  }
};
export const getProfile = async (dispatch, username) => {
  dispatch(getProfileStart());
  try {
    const res = await httpRequest.get(`/user/?user=${username}`);
    dispatch(getProfileSuccess(res.data));
  } catch (err) {
    getProfileFailure(err);
  }
};

//get user
export const getUser = async (dispatch, id) => {
  dispatch(getStart());
  try {
    const res = await httpRequest.get(`/user/${id}`);
    dispatch(getSuccess(res.data));
  } catch (err) {
    getFailure(err);
  }
};

export const updateUser = async (dispatch, id, data) => {
  dispatch(updateStart());
  try {
    const res = await httpRequest.put(`/user/update/${id}`, data);
    dispatch(updateSuccess(res.data));
  } catch (err) {
    dispatch(updateFailure());
  }
};
