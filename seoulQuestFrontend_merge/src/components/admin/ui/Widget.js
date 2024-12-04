import React from 'react';

function Widget({ title, value, onClick }) {
  return (
    <div className="widget cursor-pointer" onClick={onClick}>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}

export default Widget;
