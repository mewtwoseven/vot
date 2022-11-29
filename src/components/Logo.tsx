import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/icons/android-chrome-192x192.png'

const Logo:React.FC = () => {
  return (
    <Link href="/" className="flex items-center px-3 py-1 rounded-md hover:shadow-md hover:bg-tertiary">
      <Image
        className="h-10 w-auto sm:h-10"
        src={logo}
        alt="Vote on Articles logo"
      />
      <h3 className="px-3 py-2 text-xl text-gray-600 hover:text-gray-900">
        Vote on Articles
      </h3>
    </Link>
  );
};

export default Logo;
