import Header from '../components/layout/Header';

const AuthLayout = function ({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container flex-1 mx-auto py-10 px-2">{children}</div>
    </div>
  );
};

export default AuthLayout;
