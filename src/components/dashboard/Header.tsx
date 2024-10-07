import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">GOwave Admin</h1>
        <Button>Cerrar sesión</Button>
      </div>
    </header>
  );
}
