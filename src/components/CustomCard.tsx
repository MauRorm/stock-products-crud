import React, { useEffect, useState, Suspense, useContext } from "react";
import "../App.css";

interface CustomCardInterface {
    children: React.ReactNode,
    className: string | undefined,
}

const CustomCard: React.FC<CustomCardInterface> = ({
    children,
    className,
  }) => {
    return (
<div className={className ? className : "item-list-container"}>
    {children}
      </div>
    );
  };


  export default CustomCard;