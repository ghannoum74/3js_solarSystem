const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container-nav">
        <div className="logo">GHANNOUM Solaire System</div>
        <ul className="menu">
          {/* i used here div and li to set the li inline for the animation of border */}
          <div>
            <li>Mercury</li>
          </div>
          <div>
            <li>Moon</li>
          </div>
          <div>
            <li>Earth</li>
          </div>
          <div>
            <li>Mars</li>
          </div>
          <div>
            <li>Jupiter</li>
          </div>
          <div>
            <li>Saturn</li>
          </div>
          <div>
            <li>Uranus</li>
          </div>
          <div>
            <li>Neupton</li>
          </div>
          <div>
            <li>Pluton</li>
          </div>
          <div>
            <li>Sun</li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
