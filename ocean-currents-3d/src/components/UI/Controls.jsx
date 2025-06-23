function Controls({ onToggleCurrents, showCurrents }) {
  return (
    <div style={{
      position: 'absolute',
      top: 20,
      right: 20,
      background: 'rgba(0,0,0,0.8)',
      color: '#fff',
      padding: 15,
      borderRadius: 8,
      zIndex: 10
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1em' }}>Controls</h3>
      <div style={{ fontSize: '0.8em', opacity: 0.8 }}>
        <p>• Drag to rotate Earth</p>
        <p>• Scroll to zoom</p>
        <p>• Click currents for details</p>
      </div>
    </div>
  );
}

export default Controls; 