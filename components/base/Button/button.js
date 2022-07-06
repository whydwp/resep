import React from 'react'

const Button = ({className,title,type}) => {
  return (
    <button className={className} type={type}>
      {title}
    </button>
  );
}
Button.defaultProps = {
  type: "submit",
};
export default Button