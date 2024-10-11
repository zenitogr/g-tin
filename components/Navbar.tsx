import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex-shrink-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          g-tin
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
          <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;