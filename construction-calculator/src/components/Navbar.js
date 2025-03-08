// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-accent-blue p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl font-black tracking-tight hover:text-white/90">
          MATHRAX
        </Link>
        <div>
          {/* Future navigation items */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
