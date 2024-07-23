import React, { useState } from 'react';
import './DropDownMenu.css';

const DropDownMenu = ({ children, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div onClick={handleToggle}>
        {trigger}
      </div>
      {isOpen && (
        <div className='dropDown' onMouseLeave={() => setIsOpen(false)}>
          <div className="arrow"></div>
          {children}
        </div>
      )}
    </>
  );
};

export default DropDownMenu;
