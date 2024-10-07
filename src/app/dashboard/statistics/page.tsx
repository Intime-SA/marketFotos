"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const conversionData = [
  { name: "Compras", value: 2400 },
  { name: "No Compras", value: 117600 },
];

const topPhotosData = [
  { name: "Amanecer en las Montañas", sales: 320 },
  { name: "Reflejos en el Agua", sales: 270 },
  { name: "Cielo Estrellado", sales: 210 },
  { name: "Ciudad Nocturna", sales: 195 },
  { name: "Paisaje Otoñal", sales: 180 },
];

const interactionData = [
  { name: "Vistas", value: 85000 },
  { name: "Favoritos", value: 12500 },
];

const averagePurchaseData = [{ name: "Valor Promedio", value: 25 }];

const photographerReturnData = [
  { name: "Subieron Fotos", value: 420 },
  { name: "No Subieron Fotos", value: 480 },
];

const topLocationData = [
  { name: "Bells Beach", value: 450 },
  { name: "Byron Bay", value: 380 },
  { name: "Gold Coast", value: 320 },
  { name: "Margaret R.", value: 280 },
  { name: "Otras", value: 970 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function SuperAdminStatistics() {
  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Statistics</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Conversion Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Tasa de Conversión de Visitas a Compras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={conversionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(2)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {conversionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Tasa de conversión: 2%. Por cada 100 usuarios que visitan la
              plataforma, 2 realizan una compra.
            </p>
          </CardContent>
        </Card>

        {/* Top Selling Photos */}
        <Card>
          <CardHeader>
            <CardTitle>Fotografías Más Vendidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPhotosData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Las fotos de paisajes naturales y urbanos son las más demandadas.
            </p>
          </CardContent>
        </Card>

        {/* Photo Interaction */}
        <Card>
          <CardHeader>
            <CardTitle>Interacción con Fotografías</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={interactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Promedio de vistas por foto: 56. Promedio de favoritos por foto:
              8.
            </p>
          </CardContent>
        </Card>

        {/* Average Purchase Value */}
        <Card>
          <CardHeader>
            <CardTitle>Valor Promedio de la Compra</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={averagePurchaseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              El valor promedio por compra es de $25 USD, sugiriendo que los
              usuarios suelen comprar entre 1 y 2 fotografías por transacción.
            </p>
          </CardContent>
        </Card>

        {/* Photographer Return Rate and Top Locations */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              Tasa de Retorno de Fotógrafos y Top Localidades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row">
              {/* Photographer Return Rate */}
              <div className="w-full lg:w-[30%] h-[300px] lg:h-[400px] mb-8 lg:mb-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={photographerReturnData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(2)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {photographerReturnData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full lg:w-[70%] h-[300px] lg:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topLocationData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row mt-4">
              <p className="text-sm text-gray-600 w-full lg:w-[30%] lg:pr-4 mb-4 lg:mb-0">
                El 46.7% de los fotógrafos activos suben nuevas fotos
                regularmente, indicando una buena retención y actividad dentro
                de la plataforma.
              </p>
              <p className="text-sm text-gray-600 w-full lg:w-[70%] lg:pl-4">
                Las playas más populares para el surf en Australia dominan las
                compras, con Bells Beach liderando las ventas.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
