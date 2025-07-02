import blog from "@/assets/navbar/blogging.png";
import anotheLogo from "@/assets/bootprices_logo 1 (1).png";
import dashb from "@/assets/navbar/home (3).png";
import about from "@/assets/navbar/id-card.png";
import { logOut } from "@/redux/ReduxFunction";
import cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface SidebarProps {
  onCloseClick: () => void;
}

const Sidebar = ({ onCloseClick }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const menuItems = [
    {
      href: "/dashboard",
      icon: dashb,
      label: "Dashboard",
    },
    // {
    //   href: "/product",
    //   icon: product,
    //   label: "Product",
    // },
    {
      href: "/blog",
      icon: blog,
      label: "Blog",
    },
    {
      href: "/about",
      icon: about,
      label: "About Us",
    },
  ];

  const handleLogout = () => {
    dispatch(logOut());
    cookies.remove("token");
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="md:w-72 h-screen bg-[#F3E9DA] px-2 z-[100] flex flex-col justify-between">
        <div>
          <div className="py-7 pl-6 text-xl font-bold flex items-center space-x-2 justify-between">
            <div>
              <Image
                className="w-[200px] object-contain"
                src={anotheLogo}
                alt="logo"
              />
            </div>
            <AiOutlineClose onClick={onCloseClick} className="md:hidden flex" />
          </div>

          <nav className="mt-6">
            <ul>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    onClick={onCloseClick}
                    href={item.href}
                    className={`block px-4 py-2 mb-3 ${
                      pathname === item.href
                        ? "bg-secondary py-4 text-white rounded-[8px] text-base md:text-[18px] font-medium"
                        : "py-4 rounded-[8px] text-base md:text-[18px] font-medium text-[#303C6C]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Image
                        className={`w-6 h-6 ${
                          pathname === item.href ? "filter invert" : ""
                        }`}
                        src={item.icon}
                        alt={item.label}
                      />
                      <span>{item.label}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Log Out Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center text-center space-x-2 cursor-pointer font-medium bg-[#F3F3F3] rounded-[8px] px-4 py-4 hover:bg-primary hover:text-white w-full mx-auto mb-4"
        >
          <span className="text-center">Log Out</span>
        </button>
      </aside>
    </div>
  );
};

export default Sidebar;
