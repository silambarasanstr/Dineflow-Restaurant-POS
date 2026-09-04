import { useSelector } from "react-redux";

const Test = () => {
  const auth = useSelector((state) => state.auth);

  console.log(auth);

  return <div>Redux Working</div>;
};

export default Test;