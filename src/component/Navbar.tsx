import type { CSSProperties } from "react";

interface NavbarProps {
  selectedBody: string | null;
  onSelectBody: (name: string) => void;
}

const bodies = [
  ["Mercury", "var(--Mercury)"],
  ["Moon", "var(--Moon)"],
  ["Earth", "var(--Earth)"],
  ["Mars", "var(--Mars)"],
  ["Jupiter", "var(--Jupiter)"],
  ["Saturn", "var(--Saturn)"],
  ["Uranus", "var(--Uranus)"],
  ["Neptune", "var(--Neptune)"],
  ["Pluton", "var(--Pluto)"],
  ["Sun", "#ffd54f"],
] as const;

const Navbar = ({ selectedBody, onSelectBody }: NavbarProps) => {
  return (
    <nav className="navbar" aria-label="Solar system navigation">
      <div className="container-nav">
        <div className="logo">GHANNOUM Solaire System</div>
        <ul className="menu">
          {bodies.map(([name, color]) => (
            <li key={name}>
              <button
                type="button"
                className={selectedBody === name ? "active" : ""}
                style={{ "--planet-color": color } as CSSProperties}
                onClick={() => onSelectBody(name)}
                aria-pressed={selectedBody === name}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
