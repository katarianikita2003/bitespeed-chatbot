export default function NodesPanel() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      style={{
        width: "250px",
        padding: "15px",
        borderLeft: "1px solid #ddd",
        background: "#f9f9f9",
      }}
    >
      <h3>Nodes</h3>

      <div
        onDragStart={(event) => onDragStart(event, "textNode")}
        draggable
        style={{
          padding: "10px",
          border: "1px solid #333",
          borderRadius: "5px",
          cursor: "grab",
          background: "white",
        }}
      >
        Message
      </div>
    </div>
  );
}