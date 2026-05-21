import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const quickRoutes = [
  {
    href: "/order/cafe",
    title: "Hacer un pedido",
    description: "Recorre categorias, agrega productos y confirma tu orden.",
  },
  {
    href: "/orders",
    title: "Ver órdenes listas",
    description: "Mira en tiempo real los pedidos listos para retirar.",
  },
  {
    href: "/admin/products",
    title: "Administrar productos",
    description: "Crea, edita y busca productos desde el panel admin.",
  },
  {
    href: "/admin/orders",
    title: "Gestionar pedidos",
    description: "Gestiona pedidos pendientes y marcalos como completados.",
  },
];

const projectHighlights = [
  "Flujo de cliente completo: menu por categoria, carrito y confirmacion de pedido.",
  "Panel admin funcional para productos y ordenes con acciones reales.",
  "Manejo de errores y fallback demo para no romper la experiencia.",
  "Validaciones con Zod y feedback visual para mejorar usabilidad.",
];

const documentationNotes = [
  "Landing con guia rapida de rutas para probar el proyecto en pocos minutos.",
  "README con stack, setup local, variables de entorno y contexto del proyecto.",
  "Comparativa antes/despues para mostrar evolucion real y decisiones de mejora.",
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

const beforeAfterComparisons = [
  {
    title: "Experiencia de compra",
    before: {
      src: "/assets/nextquiosco_3.png",
      alt: "Version anterior del quiosco publico con listado de productos.",
    },
    after: {
      src: "/assets/fastfood_1.webp",
      alt: "Version actual del quiosco con mejoras visuales y de flujo.",
    },
    changes: ["Layout mas claro para escanear productos", "Carrito y feedback de acciones mas visibles"],
  },
  {
    title: "Panel administrativo",
    before: {
      src: "/assets/nextquiosco_2.png",
      alt: "Version anterior del panel administrativo.",
    },
    after: {
      src: "/assets/fastfood_2.webp",
      alt: "Version actual del panel admin con mejor estructura.",
    },
    changes: ["Mejor jerarquia visual para operar rapido", "Estado de pedidos y acciones mas directas"],
  },
  {
    title: "Vista responsive",
    before: {
      src: "/assets/nextquiosco_1.png",
      alt: "Version anterior responsive del proyecto.",
    },
    after: {
      src: "/assets/fastfood_3.webp",
      alt: "Version actual responsive con mayor consistencia.",
    },
    changes: ["Mejor adaptacion en mobile", "Controles mas comodos para usar en pantalla chica"],
  },
];

const newVersionExtra = {
  src: "/assets/fastfood_4.webp",
  alt: "Nueva vista de menu agregada en la version actual.",
};

const contactLinks = [
  {
    label: "Portfolio",
    value: "www.leandromartinez.com.uy",
    href: "https://www.leandromartinez.com.uy",
  },
  {
    label: "Telefono",
    value: "+598 95 220 063",
    href: "tel:+59895220063",
  },
  {
    label: "Email",
    value: "leandromartinez.dev@gmail.com",
    href: "mailto:leandromartinez.dev@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/leamartinez1707",
    href: "https://github.com/leamartinez1707",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/leandromartinezuy",
    href: "https://www.linkedin.com/in/leandromartinezuy/",
  },
];

export const metadata: Metadata = {
  title: "FastFood | Proyecto Full Stack",
  description: "Proyecto full stack con flujo de pedidos, panel admin y documentacion clara para mostrar criterios de desarrollo y producto.",
  keywords: ["fastfood", "full stack", "next.js", "prisma", "mongodb", "portfolio developer"],
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
                Soy desarrollador full stack junior y este proyecto muestra mi forma de trabajar: construir una app util,
                cuidar detalles de UX y documentar para que cualquier persona la pueda probar rapido.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
              <span className="rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
                Next.js + TypeScript
              </span>
              <span className="rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
                Prisma + MongoDB
              </span>
              <span className="rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
                Documentacion clara
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
              <a
                href="https://github.com/leamartinez1707/next-tienda"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-black"
              >
                <span>Ver repositorio en GitHub</span>
              </a>
            </div>
          </aside>
        </div>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Que programe en esta version
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
              Como esta documentado
            </p>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-700 sm:text-base">
              {documentationNotes.map((item) => (
                <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Antes vs Después
              </p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                Comparativa simple para mostrar como evoluciono el proyecto entre la primera version y la actual.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-5">
            {beforeAfterComparisons.map((comparison) => (
              <article key={comparison.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-900 sm:text-lg">{comparison.title}</h3>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                    Cambio principal
                  </span>
                </div>

                <div className="mt-4 grid gap-4">
                  <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <div className="relative h-64 w-full bg-slate-100 sm:h-80 lg:h-96">
                      <Image
                        src={comparison.before.src}
                        alt={comparison.before.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 70vw"
                        className="object-contain"
                      />
                    </div>
                    <figcaption className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Antes
                    </figcaption>
                    <div className="px-4 pb-4">
                      <a
                        href={comparison.before.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
                      >
                        Ver completa
                      </a>
                    </div>
                  </figure>

                  <figure className="overflow-hidden rounded-2xl border border-emerald-200 bg-white">
                    <div className="relative h-64 w-full bg-slate-100 sm:h-80 lg:h-96">
                      <Image
                        src={comparison.after.src}
                        alt={comparison.after.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 70vw"
                        className="object-contain"
                      />
                    </div>
                    <figcaption className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                      Ahora
                    </figcaption>
                    <div className="px-4 pb-4">
                      <a
                        href={comparison.after.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-full border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:border-emerald-500 hover:text-emerald-800"
                      >
                        Ver completa
                      </a>
                    </div>
                  </figure>
                </div>

                <ul className="mt-4 grid gap-2 text-sm text-slate-700">
                  {comparison.changes.map((change) => (
                    <li key={change} className="rounded-xl bg-white px-3 py-2">
                      {change}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-5 rounded-3xl border border-indigo-200 bg-indigo-50/60 p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">Nueva vista agregada</p>
            <p className="mt-1 text-sm text-indigo-900">Sume una vista extra de menu para mejorar el recorrido y mostrar nuevas secciones del producto.</p>

            <figure className="mt-4 overflow-hidden rounded-2xl border border-indigo-200 bg-white">
              <div className="relative h-64 w-full bg-slate-100 sm:h-80 lg:h-96">
                <Image
                  src={newVersionExtra.src}
                  alt={newVersionExtra.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">
                Nuevo en esta version
              </figcaption>
              <div className="px-4 pb-4">
                <a
                  href={newVersionExtra.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-indigo-300 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:border-indigo-500 hover:text-indigo-800"
                >
                  Ver completa
                </a>
              </div>
            </figure>
          </div>
        </section>

        <section className="rounded-[2rem] border border-amber-200 bg-[linear-gradient(135deg,_rgba(251,191,36,0.18),_rgba(255,255,255,0.96))] p-6 shadow-[0_16px_50px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-800">
                Empieza ahora
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Gracias por pasar por mi proyecto
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                Si eres recruiter o dev, me sirve mucho tu feedback. La idea es seguir mejorando este proyecto
                y documentar cada iteracion para mostrar evolucion real.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/order/cafe"
                className="rounded-full bg-slate-950 px-5 py-3 text-center flex items-center text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Ir al restaurante
              </Link>
              <Link
                href="/orders"
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-center flex items-center text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-950"
              >
                Ver órdenes listas
              </Link>
            </div>
          </div>
        </section>

        <footer className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Contacto</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Hablemos de desarrollo
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Si te interesa mi perfil para una oportunidad junior full stack, aqui tienes mis canales directos.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{item.value}</p>
              </a>
            ))}
          </div>
        </footer>
      </section>
    </main>
  );
}
