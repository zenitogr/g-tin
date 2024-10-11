import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold">
          g-tin
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-sm hover:text-gray-300">Home</Link>
          <Link href="/about" className="text-sm hover:text-gray-300">About</Link>
          <Link href="/contact" className="text-sm hover:text-gray-300">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;