import React, { useState } from 'react';

const EditInput = ({ initialValue, onSave, onCancel }) => {
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    if (value.trim() !== '') {
      onSave(value);
    }
  };

  return (
    <div className="edit-input-container">
      <input
        type="text"
        className="edit-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="save-edit-button" onClick={handleSave}>
        ✓
      </button>
      <button className="cancel-button" onClick={onCancel}>
        ×
      </button>
    </div>
  );
};

export default EditInput;
