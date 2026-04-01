export default function Header() {
  return (
    <header className="bg-surface border-b border-border pl-20 pr-4 py-4 flex items-center gap-3">
      <div className="w-8 h-8 bg-primary rounded-md shadow-neonBlue" />
      <h1 className="text-magenta text-2xl font-semibold tracking-wide text-neon-purple">
        Kn1ghts StatParser
      </h1>
    </header>
  );
}