import type { CSSProperties } from "react";

interface NavbarProps {
  selectedBody: string | null;
  onSelectBody: (name: string) => void;
}

const bodies = [
  ["Mercury", "mercury", "var(--Mercury)"],
  ["Moon", "moon", "var(--Moon)"],
  ["Earth", "earth", "var(--Earth)"],
  ["Mars", "mars", "var(--Mars)"],
  ["Jupiter", "jupiter", "var(--Jupiter)"],
  ["Saturn", "saturn", "var(--Saturn)"],
  ["Uranus", "uranus", "var(--Uranus)"],
  ["Neptune", "neptune", "var(--Neptune)"],
  ["Pluton", "pluto", "var(--Pluto)"],
  ["Sun", "sun", "#ffd54f"],
] as const;

const Navbar = ({ selectedBody, onSelectBody }: NavbarProps) => {
  return (
    <nav className="navbar" aria-label="Solar system navigation">
      <div className="container-nav">
        <div className="logo">GHANNOUM Solar System</div>
        <ul className="menu">
          {bodies.map(([name, slug, color]) => (
            <li key={name}>
              <a
                href={`#${slug}`}
                className={selectedBody === name ? "active" : ""}
                style={{ "--planet-color": color } as CSSProperties}
                onClick={() => onSelectBody(name)}
                aria-current={selectedBody === name ? "page" : undefined}
              >
                {name === "Pluton" ? "Pluto" : name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
