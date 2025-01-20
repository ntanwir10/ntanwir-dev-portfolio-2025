import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              Hi, I&apos;m Nauman Tanwir
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              A Full Stack Developer passionate about building modern web applications
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
