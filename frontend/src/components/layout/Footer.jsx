const Footer = function () {
  return (
    <div className="bg-blue-900 py-10">
      <div className="container px-2 mx-auto flex justify-between items-center">
        <span className="text-3xl tracking-tight text-white font-bold">
          Booket
        </span>
        <div className="flex justify-end gap-4 tracking-tight text-white font-bold">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Term of Service</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
