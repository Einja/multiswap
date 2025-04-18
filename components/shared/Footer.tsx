import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="p-4 mt-10 md:mt-0" style={{ zIndex: 100 }}>
      <hr
        className="w-1/4 mx-auto my-10"
        style={{ borderColor: "var(--text-color)" }}
      />
      <div className="container mx-auto text-center">
        <p>Copyright &copy; Multiswap 2025, All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
