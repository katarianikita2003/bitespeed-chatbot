import { useState, useEffect } from "react";

export default function NodesPanel({
  selectedNode,
  setSelectedNode,
  setNodes,
}) {
  const [text, setText] = useState("");

  // Sync textarea when a new node is selected
  useEffect(() => {
    if (selectedNode) {
      setText(selectedNode.data.label);
    }
  }, [selectedNode]);

  // 🔥 Drag handler (THIS WAS MISSING)
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, label: newText } }
          : node
      )
    );

    setSelectedNode((prev) =>
      prev
        ? { ...prev, data: { ...prev.data, label: newText } }
        : null
    );
  };

  // ✨ EDIT MODE
  if (selectedNode) {
    return (
      <div style={panelStyle}>
        <button onClick={() => setSelectedNode(null)}>← Back</button>

        <h3>Message</h3>

        <textarea
          value={text}
          onChange={handleChange}
          style={{ width: "100%", marginTop: "10px" }}
        />
      </div>
    );
  }

  // ✨ DEFAULT MODE
  return (
    <div style={panelStyle}>
      <h3>Nodes</h3>

      <div
        draggable
        onDragStart={(event) => onDragStart(event, "textNode")}
        style={nodeBoxStyle}
      >
        Message
      </div>
    </div>
  );
}

const panelStyle = {
  width: "250px",
  padding: "15px",
  borderLeft: "1px solid #ddd",
  background: "#f9f9f9",
};

const nodeBoxStyle = {
  padding: "10px",
  border: "1px solid #333",
  borderRadius: "5px",
  cursor: "grab",
  background: "white",
};