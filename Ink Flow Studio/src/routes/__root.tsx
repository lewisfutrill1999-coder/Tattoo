import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SummerRose Tattoos" },
      { name: "description", content: "Bespoke tattoos, flash designs, aftercare and price estimates. Submit an enquiry or claim a flash design." },
      { name: "author", content: "SummerRose Tattoos" },
      { property: "og:title", content: "SummerRose Tattoos" },
      { property: "og:description", content: "Bespoke tattoos, flash designs, aftercare and price estimates. Submit an enquiry or claim a flash design." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SummerRose Tattoos" },
      { name: "twitter:description", content: "Bespoke tattoos, flash designs, aftercare and price estimates. Submit an enquiry or claim a flash design." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/312743fc-876b-4bec-9efa-c42cfe2d8ba0/id-preview-13ef1960--b8919ed0-d904-4b41-8936-ac372cdc625f.lovable.app-1782981592800.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/312743fc-876b-4bec-9efa-c42cfe2d8ba0/id-preview-13ef1960--b8919ed0-d904-4b41-8936-ac372cdc625f.lovable.app-1782981592800.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
          SummerRose Tattoos
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/flash" className="hover:text-foreground transition-colors">Flash</Link>
          <Link to="/aftercare" className="hover:text-foreground transition-colors">Aftercare</Link>
          <Link to="/estimate" className="hover:text-foreground transition-colors">Estimate</Link>
          <Link to="/enquiry" className="inline-flex items-center rounded-full bg-foreground text-background px-4 py-2 text-xs font-medium hover:opacity-90 transition">Book enquiry</Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm text-muted-foreground">
        <div>
          <p className="font-semibold text-foreground" style={{ fontFamily: "'Fraunces', serif" }}>SummerRose Tattoos</p>
          <p className="mt-1">Micro-Realism • Fine Line • Whimsical</p>
        </div>
        <div className="flex gap-6">
          <a href="mailto:Demo@Demo.com" className="hover:text-foreground">demo@demo.com</a>
          <a href="https://www.instagram.com/summerrosetattoos/" target="_blank" rel="noreferrer" className="hover:text-foreground">Instagram</a>
          <Link to="/auth" className="hover:text-foreground">Artist login</Link>
        </div>
      </div>
    </footer>
  );
}
