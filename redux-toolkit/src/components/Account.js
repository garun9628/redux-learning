import { useState } from "react";
import {
  increment,
  decrement,
  incrementByAmount,
  fetchUserById,
} from "../slices/accountSlice";
import { useSelector, useDispatch } from "react-redux";

function Account() {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const amount = useSelector((state) => state.account.amount);

  return (
    <div className="card">
      <div className="container">
        <h4>
          <b>Account Component</b>
        </h4>
        <h3>Amount:${amount}</h3>
        <button onClick={() => dispatch(increment())}>Increment +</button>
        <button onClick={() => dispatch(decrement())}>Decrement -</button>
        <input type="text" onChange={(e) => setValue(+e.target.value)}></input>
        /*{" "}
        <button onClick={() => dispatch(incrementByAmount(value))}>
          Increment By {value} +
        </button>
        <button onClick={() => dispatch(fetchUserById(1))}>Init Account</button>
      </div>
    </div>
  );
}

export default Account;
