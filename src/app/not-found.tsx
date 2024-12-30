import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center text-center p-8 text-gray-700">
      <header className="w-full flex justify-center py-4">
        <Link href="/">
          <Image src={"/logo.avif"} width={500} height={800} alt="Samaira Fashion Logo" className="h-16" />
        </Link>
      </header>
      <main className="max-w-lg">
        <h2 className="text-6xl mb-4 text-red-500">404</h2>
        <p className="text-2xl mb-8">Oops! The page you are looking for does not exist.</p>
        <div className="space-y-4">
          <Link href="/" className="block bg-blue-500 text-white py-2 px-4 rounded">Go to Homepage</Link>
          <Link href="/policies/contact" className="block bg-green-500 text-white py-2 px-4 rounded">Contact Us</Link>
        </div>
      </main>
      <footer className="mt-12 text-sm">
        <p>&copy; 2024 Samaira Fashion. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default NotFound;
