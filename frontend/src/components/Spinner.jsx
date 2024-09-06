import { ThreeDots } from "react-loader-spinner";

const Spinner = ({ message }) => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-2 flex-col min-h-60">
      <ThreeDots color="#000" height={80} width={80} />
      <h1 className="text-xl text-gray-500">{message}</h1>
    </div>
  );
};

export default Spinner;
