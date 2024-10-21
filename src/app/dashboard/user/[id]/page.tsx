import { getUserData } from "@/src/data/data";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import {
  CalendarIcon,
  CreditCardIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";

export default async function UserDashboard({
  params,
}: {
  params: { id: string };
}) {
  const userData = await getUserData(params.id);

  if (!userData) {
    notFound();
  }

  const cuentaInfo = userData.info_pago.cuenta[0] || {};

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Usuario</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-900">
                    {userData.nombre} {userData.apellido}
                  </span>
                </div>
                <div className="flex items-center">
                  <MailIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">
                    {userData.email}
                  </span>
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">
                    {userData.telefono}
                  </span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">
                    {userData.fecha_registro}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estado de la Cuenta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  Tipo de Usuario:
                </span>
                <Badge variant="outline">{userData.tipo_usuario.name}</Badge>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  Estado:
                </span>
                <Badge
                  variant={userData.status_user ? "default" : "destructive"}
                >
                  {userData.status_user ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información de Pago</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Alias:
                  </span>
                  <span className="text-sm text-gray-900">
                    {cuentaInfo.alias || "No disponible"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    CBU:
                  </span>
                  <span className="text-sm text-gray-900">
                    {cuentaInfo.cbu || "No disponible"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    CUIL:
                  </span>
                  <span className="text-sm text-gray-900">
                    {cuentaInfo.cuil || "No disponible"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Entidad:
                  </span>
                  <span className="text-sm text-gray-900">
                    {cuentaInfo.entidad
                      ? cuentaInfo.entidad.toUpperCase()
                      : "No disponible"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                No hay actividad reciente para mostrar.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas de Compra</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                No hay estadísticas de compra disponibles.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pago</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <CreditCardIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-500">
                  No hay métodos de pago registrados.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
