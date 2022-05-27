import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="spinner">
      <Spinner animation="border" role="status" variant="light" />
    </div>
  );
};

export default Loading;
