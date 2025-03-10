function ControlPanel(props: any) {
  const { className } = props

  return (
    <div className={className}>
      <h3>Camera Transition</h3>
      <p>Smooth animate of the viewport.</p>
      <div className="source-link">
        <a
          href="https://github.com/visgl/react-maplibre/tree/1.0-release/examples/viewport-animation"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
      <hr />

    </div>
  );
}

export default ControlPanel;
