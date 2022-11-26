import Logo from './Logo';
import NavMenu from './NavMenu';
import Avatar from './Avatar';

const Navbar:React.FC = () => {
  return (
    <header className="flex justify-between bg-gradient-to-b from-[#c39bfb] to-[#65a2ec] text-white">
      <Logo />
      <NavMenu />
      <Avatar />
    </header>
  );
}

export default Navbar;