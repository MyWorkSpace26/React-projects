import { Link } from "react-router-dom";

const AuthLayout = ({ title, children, footerLinks = [], testData }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-6 text-2xl font-medium">{title}</h1>

        {children}

        {testData && (
          <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800">
            <p className="font-medium">{testData.title}</p>
            <p>Email: {testData.email}</p>
            <p>Password: {testData.password}</p>
          </div>
        )}

        <div className="mt-4 space-y-2 text-center text-sm">
          {footerLinks.map((link, index) => (
            <p key={index}>
              {link.text}{" "}
              <Link
                to={link.path}
                className="text-purple-700 hover:underline font-medium"
              >
                {link.label}
              </Link>
            </p>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
