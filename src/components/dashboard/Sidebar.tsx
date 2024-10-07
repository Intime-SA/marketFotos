import Link from "next/link";
import { Home, Image, Users, Settings } from "lucide-react";

const sidebarItems = [
  { icon: Home, label: "Inicio", href: "/dashboard" },
  { icon: Image, label: "Fotos", href: "/dashboard/photos" },
  { icon: Users, label: "Usuarios", href: "/dashboard/users" },
  { icon: Settings, label: "Configuración", href: "/dashboard/settings" },
];

export function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.href} className="mb-2">
              <Link
                href={item.href}
                className="flex items-center p-2 rounded hover:bg-gray-700"
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
