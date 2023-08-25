import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import axios from "axios";
import thunk from "redux-thunk";

// Action name constants

const init = "init";
const inc = "increment";
const dec = "decrement";
const incByAmt = "incrementByAmount";

// Store

const store = createStore(
  combineReducers({
    account: accountReducer,
    bonus: bonusReducer,
  }),
  applyMiddleware(logger.default, thunk.default)
);
const history = [];

// Reducer

// function reducer(state = { amount: 1 }, action) {
//   if (action.type === inc) {
//     // immutability
//     state.amount = state.amount + 1; // this is object mutation and this is a bad practice
//   }
//   return state;
//  if (action.type === inc) {
//     // immutability => state ko directly change na karen
//     return { amount: state.amount + 1 }; // this is good practice here  we are preventing object mutation by creating new copy of a state.
//   }
// }

function accountReducer(state = { amount: 1 }, action) {
  switch (action.type) {
    case init:
      return { amount: action.payload };
    case inc:
      return { amount: state.amount + 1 };
    case dec:
      return { amount: state.amount - 1 };
    case incByAmt:
      return { amount: state.amount + action.payload };
    default:
      return state;
  }
}
function bonusReducer(state = { points: 1 }, action) {
  switch (action.type) {
    case init:
      return { points: action.payload };
    case inc:
      return { amount: bonus.points + 1 };
    case dec:
      return { amount: state.amount - 1 };
    case incByAmt:
      return { amount: state.amount + action.payload };
    default:
      return state;
  }
}

// Global state

// store.getState() => current state.
// store.subscribe(() => {
//   history.push(store.getState());
//   console.log(history);
// });

// Async Api call

// async function getUser() {
//   const { data } = await axios.get("http://localhost:3000/accounts/1");
//   console.log(data);
// }
// getUser();

// Action creator => synchronous hote hain that is why we can't use async/await

// async function initUser() {
//   const { data } = await axios.get("http://localhost:3000/accounts/1");
//   return { type: init, payload: data.amount };
// }
function getUser(id) {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
    dispatch(initUser(data.amount));
  };
}
function initUser(value) {
  return { type: init, payload: value };
}
function increment() {
  return { type: inc };
}
function decrement() {
  return { type: dec };
}
function incrementByAmount(value) {
  return { type: incByAmt, payload: value };
}

// Dispatching the actions

setTimeout(() => {
  // store.dispatch(initUser()); // getting error

  store.dispatch(getUser(1)); // when using thunk
}, 2000);

// we can't use asynchronous functions when creating Action creator.
// explanation: we are dispatching function in which we are awaiting a request, hence we are not able to send actions directly through dispatch event. dispatch event directly send actions which must be a plain object.
// solution: we use thunk
// conclusion:
// when you are sending plain object(actions) directly, no problem
// function initUser(value) {
//     return { type: init, payload: value };
//   }
// store.dispatch(initUser(100));

// when you are sending data using some asynchronous functions or using api calls then use thunk.
// async function getUser(dispatch, getState) {
//   const { data } = await axios.get("http://localhost:3000/accounts/1");
//   dispatch(initUser(data.amount));
// }
// function initUser(value) {
//   return { type: init, payload: value };
// }
// store.dispatch(getUser);
