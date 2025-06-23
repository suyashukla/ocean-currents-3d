function InfoBox({ current, onClose }) {
  if (!current) return null;
  
  return (
    <div style={{
      position: 'absolute', 
      top: 20, 
      left: 20, 
      background: 'rgba(0,0,0,0.9)', 
      color: '#fff', 
      padding: 20, 
      borderRadius: 12, 
      maxWidth: 350, 
      zIndex: 10,
      border: `2px solid ${current.type === 'warm' ? '#ff4444' : '#4444ff'}`,
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
    }}>
      <h2 style={{ 
        margin: '0 0 10px 0', 
        color: current.type === 'warm' ? '#ff6666' : '#6666ff',
        fontSize: '1.5em'
      }}>
        {current.name}
      </h2>
      <p style={{ margin: '5px 0' }}>
        <strong>Type:</strong> 
        <span style={{ 
          color: current.type === 'warm' ? '#ff6666' : '#6666ff',
          marginLeft: 8,
          fontWeight: 'bold'
        }}>
          {current.type.toUpperCase()}
        </span>
      </p>
      <p style={{ 
        margin: '10px 0', 
        lineHeight: '1.5',
        fontSize: '0.9em'
      }}>
        {current.description}
      </p>
      <button 
        onClick={onClose} 
        style={{ 
          marginTop: 15,
          padding: '8px 16px',
          background: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: '0.9em'
        }}
      >
        Close
      </button>
    </div>
  );
}

export default InfoBox; 