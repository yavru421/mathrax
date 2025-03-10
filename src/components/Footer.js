// components/Footer.js

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 text-center text-gray-500 border-t border-gray-200">
      <p>© {new Date().getFullYear()} Imperial Measurement Calculator by John Daniel Dondlinger. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
