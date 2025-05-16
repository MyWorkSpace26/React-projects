import { CheckCircle } from "lucide-react";

const SuccessCard = ({
  icon = <CheckCircle className="h-16 w-16 text-green-500" />,
  title,
  description,
  buttonText,
  onButtonClick,
  buttonClassName = "w-full rounded-md bg-purple-700 p-3 text-center text-white hover:bg-purple-800",
}) => {
  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-sm">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h1 className="mb-2 text-2xl font-medium">{title}</h1>
      <p className="mb-6 text-gray-600">{description}</p>
      {buttonText && (
        <button onClick={onButtonClick} className={buttonClassName}>
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default SuccessCard;
