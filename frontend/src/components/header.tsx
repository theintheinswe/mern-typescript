import { Link, useLocation } from "react-router";
import Logo from "./logo";
import { cn } from "@/lib/utils";

type ItemType = {
  title: string;
  url: string;
};

const items: ItemType[] = [
  {
    title: "Tasks",
    url: `/tasks`,
  },
  {
    title: "Users",
    url: `/users`,
  },
];
const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <header className="flex sticky top-0 z-5 h-12 shrink-0 items-center border-b">
      <div className=" flex flex-1 items-center justify-between px-4">
        {" "}
        <span className="flex items-center gap-2 self-center font-medium">
          <Logo url="/" />
          Task Demo.
        </span>
        <nav className="flex gap-4">
          {items.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={cn(
                "text-gray-700 hover:text-gray-900",
                item.url === pathname ? "text-gray-900" : ""
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
