import React from "react";

const Sidebar: React.FC = () => {
  const menu = ["Dashboard", "Trades", "Settings"];

  return (
    <aside className="fixed top-14 left-0 bottom-0 w-56 bg-white/95 border-r border-gray-200 z-30">
      <nav className="h-full overflow-auto px-4 py-6">
        <ul className="space-y-2">
          {menu.map((item) => (
            <li key={item}>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
