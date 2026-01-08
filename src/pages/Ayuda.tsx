import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Ayuda = () => {
  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Centro de Ayuda</h1>
            <p className="text-gray-600 mt-2">Guía paso a paso para acceder y utilizar la aplicación</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Acceso a la Aplicación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                    Requisitos del Sistema
                  </h3>
                  <ul className="list-disc pl-10 space-y-1 text-gray-700">
                    <li>Compatibilidad con dispositivos móviles (iOS/Android) o navegadores web</li>
                    <li>Versión mínima del sistema operativo requerida</li>
                    <li>Conexión a Internet estable</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                    Opciones de Instalación
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 pl-8">
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Para dispositivos móviles:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                        <li>Descarga la aplicación desde la App Store (iOS) o Google Play Store (Android)</li>
                        <li>Busca el nombre oficial de la aplicación</li>
                        <li>Verifica que sea la versión oficial del desarrollador</li>
                        <li>Completa el proceso de instalación</li>
                      </ul>
                    </div>

                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Para acceso web:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                        <li>Ingresa a la URL oficial de la aplicación</li>
                        <li>Asegúrate de usar un navegador compatible (Chrome, Safari, Firefox, Edge)</li>
                        <li>Verifica que la conexión sea segura (https://)</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                    Primer Acceso
                  </h3>
                  <ul className="list-disc pl-10 space-y-1 text-gray-700">
                    <li>Abre la aplicación instalada o el sitio web</li>
                    <li>Completa el proceso de registro o inicio de sesión</li>
                    <li>Acepta los términos y condiciones si es requerido</li>
                    <li>Configura las preferencias iniciales</li>
                  </ul>
                </section>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Solución de Problemas Comunes</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Errores de instalación</AccordionTrigger>
                  <AccordionContent>
                    Si encuentras errores de instalación, verifica que tengas suficiente espacio de almacenamiento en tu dispositivo y que tu conexión a internet sea estable.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Problemas de acceso</AccordionTrigger>
                  <AccordionContent>
                    Si tienes problemas para ingresar, comprueba que tus credenciales (usuario y contraseña) sean correctas. Verifica si la tecla 'Bloq Mayús' está activada.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Problemas persistentes</AccordionTrigger>
                  <AccordionContent>
                    En caso de que el problema persista, contacta al soporte técnico proporcionando detalles del error, capturas de pantalla si es posible, y los pasos que realizaste antes de que ocurriera el problema.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Ayuda;
