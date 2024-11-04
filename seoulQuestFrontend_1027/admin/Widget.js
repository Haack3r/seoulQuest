import React from 'react';

function Widget({ title, value }) {
  return (
    <div className="widget">
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}

export default Widget;
