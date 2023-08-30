import { increment } from "../reducers/rewardReducer";
import { useDispatch, useSelector } from "react-redux";

function Reward() {
  const points = useSelector((state) => state.reward.points);
  const dispatch = useDispatch();

  return (
    <div className="card">
      <div className="container">
        <h4>
          <b>Reward Component</b>
        </h4>
        <h3>Total points : ${points}</h3>

        <button onClick={() => dispatch(increment())}>Increment +</button>
      </div>
    </div>
  );
}

export default Reward;
