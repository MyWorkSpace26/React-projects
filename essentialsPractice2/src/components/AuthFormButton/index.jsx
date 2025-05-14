const AuthFormButton = ({ isLoading, children, ...props }) => {
  return (
    <button
      {...props}
      disabled={isLoading}
      className={`w-full rounded-md bg-purple-700 p-3 text-center text-white hover:bg-purple-800 disabled:opacity-70 disabled:cursor-not-allowed ${
        props.className || ""
      }`}
    >
      {isLoading ? "Загрузка..." : children}
    </button>
  );
};

export default AuthFormButton;
