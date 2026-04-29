import logo from '../assets/logo.png'; // путь к вашему файлу

export default function Header() {

  return (
    <header className="bg-surface border-b border-border pl-20 pr-4 py-4 flex items-center gap-3">
      <img 
        src={logo} 
        alt="Logo" 
        width={64} 
        height={64}
        className="rounded-md shadow-neonMuted"
      />
      <h1 className="text-magenta text-2xl font-semibold tracking-wide text-neon-purple">
        Kn1ghts StatParser
      </h1>
    </header>
  );
}