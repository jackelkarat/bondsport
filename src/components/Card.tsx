import React from "react";

interface IProps {
  title: string;
  children: React.ReactNode;
  backgroundColor: any;
}

function Card({ title, children, backgroundColor }: IProps) {
  return (
    <div className="card" style={{backgroundColor}}>
        <div className="card-title">
             <h2>{title}</h2>
        </div>
      <ul>{children}</ul>
    </div>
  );
}

export default Card;
