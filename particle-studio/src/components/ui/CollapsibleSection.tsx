import { useState } from "react";

export function CollapsibleSection({ 
  title, 
  defaultOpen = true, 
  children 
}: { 
  title: string; 
  defaultOpen?: boolean; 
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="section">
      <h3 
        className="sectionTitle" 
        style={{ cursor: "pointer", userSelect: "none", display: "flex", justifyContent: "space-between" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span style={{ fontSize: "0.8em", opacity: 0.7 }}>{isOpen ? "▼" : "▶"}</span>
      </h3>
      {isOpen && children}
    </div>
  );
}
