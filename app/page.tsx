import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const quickRoutes = [
  {
    href: "/order/cafe",
    title: "Hacer un pedido",
    description: "Navega por categorías, agrega productos al carrito y confirma tu orden.",
  },
  {
    href: "/orders",
    title: "Ver órdenes listas",
    description: "Consulta el estado de órdenes preparadas en la vista de retiro.",
  },
  {
    href: "/admin/products",
    title: "Administrar productos",
    description: "Crea, edita y busca productos desde el panel administrativo.",
  },
  {
    href: "/admin/orders",
    title: "Gestionar pedidos",
    description: "Revisa pedidos pendientes y márcalos como completados.",
  },
];

const projectHighlights = [
  "Flujo de compra claro para clientes: categorías, carrito y confirmación de pedido.",
  "Panel administrativo para gestionar productos y operación diaria de pedidos.",
  "Experiencia resiliente: incluye modo demo para seguir navegando si falla la base externa.",
  "Validación de datos y feedback visual para evitar errores de uso.",
];

const stack = [
  "Next.js 15",
  "React 19",
  "TypeScript",
  "Tailwind CSS",
  "Prisma + MongoDB",
  "Zustand + SWR",
  "Zod",
  "Cloudinary",
];

const usageFlow = [
  {
    title: "1. Elige cómo quieres usar la app",
    description: "Puedes entrar como cliente para pedir comida o como administrador para gestionar el negocio.",
  },
  {
    title: "2. Sigue el flujo guiado",
    description: "Desde la home tienes accesos directos a cada vista con una breve explicación de para qué sirve.",
  },
  {
    title: "3. Prueba sin bloquearte por configuración",
    description: "Si el backend externo no responde, varias vistas siguen disponibles en modo demo para que puedas recorrer la app.",
  },
];

const helpNotes = [
  {
    title: "¿Qué es FastFood?",
    description: "Es una app web para tomar pedidos y administrar un local de comida rápida desde una sola interfaz.",
  },
  {
    title: "¿Para quién está hecha?",
    description: "Para dueños, equipos operativos y cualquier persona que quiera ver un flujo real de pedidos y gestión.",
  },
  {
    title: "¿Qué puedes probar ahora mismo?",
    description: "Crear pedidos, revisar órdenes listas, administrar productos y completar pedidos desde el panel admin.",
  },
];

const gallery = [
  {
    src: "/assets/nextquiosco_3.png",
    alt: "Vista del quiosco publico con listado de productos y resumen del pedido.",
    title: "Experiencia de compra",
  },
  {
    src: "/assets/nextquiosco_2.png",
    alt: "Panel administrativo con gestion de productos y pedidos.",
    title: "Panel administrativo",
  },
  {
    src: "/assets/nextquiosco_1.png",
    alt: "Vista responsive del proyecto en dispositivos pequenos.",
    title: "Responsive review",
  },
];

export const metadata: Metadata = {
  title: "FastFood | Demo interactiva",
  description: "Conoce FastFood, entiende cómo funciona y prueba sus flujos de compra y administración desde esta página principal.",
  keywords: ["fastfood", "pedidos", "panel admin", "next.js", "demo interactiva", "gestion de productos"],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_35%),linear-gradient(180deg,_#f8fafc_0%,_#eef2f7_100%)] text-slate-900">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-6 rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8 lg:p-10">
            <div className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
              Plataforma de pedidos y gestión
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                FastFood
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                FastFood te permite simular la operación completa de un local de comida: tomar pedidos,
                seguir su estado y administrar productos desde un panel claro y simple de usar.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
              <span className="rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
                Compra en pocos pasos
              </span>
              <span className="rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
                Panel administrativo completo
              </span>
              <span className="rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
                Modo demo de respaldo
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {quickRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-amber-300 hover:bg-white hover:shadow-lg"
                >
                  <p className="font-bold text-slate-900">{route.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{route.description}</p>
                  <span className="mt-4 inline-flex text-sm font-semibold text-amber-700">
                    Abrir vista
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <aside className="grid gap-4">
            <div className="rounded-[2rem] bg-slate-950 p-6 text-slate-50 shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
                Cómo usar FastFood
              </p>
              <ol className="mt-5 space-y-4 text-sm leading-6 text-slate-200 sm:text-base">
                {usageFlow.map((step) => (
                  <li key={step.title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="font-semibold text-white">{step.title}</p>
                    <p className="mt-1 text-slate-300">{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Tecnologías principales
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Qué puedes hacer aquí
            </p>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-700 sm:text-base">
              {projectHighlights.map((item) => (
                <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Secciones de la aplicación
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="font-bold text-slate-900">Quiosco</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Realiza pedidos desde categorías y confirma tu compra en pocos pasos.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="font-bold text-slate-900">Administración</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Gestiona productos, búsquedas y operación diaria de pedidos.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="font-bold text-slate-900">Órdenes listas</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Consulta rápidamente qué pedidos ya están listos para retirar.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="font-bold text-slate-900">Modo demo</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Si falla la conexión externa, puedes seguir navegando y probando funciones clave.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Preguntas frecuentes
            </p>
            <div className="mt-5 grid gap-4">
              {helpNotes.map((note) => (
                <article key={note.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h2 className="text-lg font-bold text-slate-950">{note.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">{note.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Evidencia visual
                </p>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                  Estas capturas muestran las pantallas principales para que entiendas de forma rápida cómo se usa la app.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {gallery.map((item) => (
                <figure key={item.src} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <figcaption className="px-4 py-3 text-sm font-semibold text-slate-700">
                    {item.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-amber-200 bg-[linear-gradient(135deg,_rgba(251,191,36,0.18),_rgba(255,255,255,0.96))] p-6 shadow-[0_16px_50px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-800">
                Empieza ahora
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Una app clara para pedir, gestionar y entender todo en minutos
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                La página principal explica qué hace FastFood, cómo recorrerla y qué esperar en cada módulo,
                para que cualquier persona pueda usarla sin contexto previo.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/order/cafe"
                className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Ir al quiosco
              </Link>
              <Link
                href="/orders"
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-950"
              >
                Ver órdenes listas
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
