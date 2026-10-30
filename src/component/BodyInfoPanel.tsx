import bodyInfo from "../utilities/Body_info.js";

interface BodyInfoPanelProps {
  selectedBody: string | null;
  onFreeView: () => void;
}

const BodyInfoPanel = ({
  selectedBody,
  onFreeView,
}: BodyInfoPanelProps) => {
  if (!selectedBody) {
    return (
      <div className="scene-hint">
        Select a body from the header or click it in the scene.
      </div>
    );
  }

  const info = bodyInfo[selectedBody];
  if (!info) return null;

  return (
    <aside className="body-info" aria-live="polite">
      <div className="body-info__heading">
        <div>
          <span className="body-info__eyebrow">{info.type}</span>
          <h2>{info.name}</h2>
        </div>
        <button type="button" onClick={onFreeView} aria-label="Close information">
          ×
        </button>
      </div>

      <p>{info.description}</p>

      <dl className="body-info__facts">
        <div>
          <dt>Diameter</dt>
          <dd>{info.diameter}</dd>
        </div>
        <div>
          <dt>Gravity</dt>
          <dd>{info.gravity}</dd>
        </div>
        <div>
          <dt>Temperature</dt>
          <dd>{info.temperature}</dd>
        </div>
        <div>
          <dt>Orbital period</dt>
          <dd>{info.orbitalPeriod}</dd>
        </div>
        <div>
          <dt>Distance from Sun</dt>
          <dd>{info.distance}</dd>
        </div>
      </dl>

      <button className="free-view-button" type="button" onClick={onFreeView}>
        Free view
      </button>
    </aside>
  );
};

export default BodyInfoPanel;
