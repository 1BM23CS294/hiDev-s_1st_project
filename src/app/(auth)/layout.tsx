import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-svh flex items-center justify-center p-4">
        <Image
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop"
            alt="Blurry office background"
            fill
            className="object-cover -z-10 filter blur-sm brightness-[.3]"
        />
        {children}
    </main>
  );
}
