import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Hero from '../components/layout/Hero';

const MainLayout = function ({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container flex-1 mx-auto py-10 px-2">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
