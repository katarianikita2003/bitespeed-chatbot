import { Handle, Position } from "reactflow";

export default function TextNode({ data }) {
  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #222",
        borderRadius: "8px",
        background: "white",
        width: "180px",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          marginBottom: "5px",
        }}
      >
        Send Message
      </div>

      <div>{data.label}</div>

      {/* Target Handle (Left) */}
      <Handle
        type="target"
        position={Position.Left}
      />

      {/* Source Handle (Right) */}
      <Handle
        type="source"
        position={Position.Right}
      />
    </div>
  );
}