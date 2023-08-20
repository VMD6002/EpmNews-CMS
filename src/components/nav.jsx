import { default as Logo } from '../img/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
   
        return (
            <nav className="relative flex w-full flex-wrap items-center justify-between bg-logo1">
              <div className="container lg:px-0 px-4 max-w-4xl mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-center" >
                  <Link to="/" className="flex items-center text-base font-bold leading-relaxed mr-4 py-2 whitespace-nowrap uppercase text-white hover:opacity-90">
                    <img className = "h-8 rounded-lg object-cover" src={Logo} alt="logo" />
                    <b className="px-2" >EPM-News</b>
                  </Link>
                </div>
              </div>
            </nav>
        );
      }
 
export default Navbar;