import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-svh flex items-center justify-center p-4">
        <Image
            src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=2070&auto=format&fit=crop"
            alt="Abstract technology background"
            fill
            className="object-cover -z-10 filter blur-md brightness-50"
        />
        {children}
    </main>
  );
}
