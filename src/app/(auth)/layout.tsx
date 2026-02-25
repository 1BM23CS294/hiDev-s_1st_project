import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-svh flex items-center justify-center p-4">
        <Image
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
            alt="Circuit board texture background"
            fill
            className="object-cover -z-10 filter blur-md brightness-[.4]"
        />
        {children}
    </main>
  );
}
