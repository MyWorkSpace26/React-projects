import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>This is a Home Page</h1>
      <p>
        <Link to="/products">Go to Products Page</Link>
      </p>
    </div>
  );
};

export default HomePage;
