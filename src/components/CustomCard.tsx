import React from "react";
import "../App.css";
import {CustomCardInterface} from '../interfaces/generalInterfaces';


const CustomCard: React.FC<CustomCardInterface> = ({ children, className }) => {
  return (
    <div className={className ? className : "item-list-container"}>
      {children}
    </div>
  );
};

export default CustomCard;
