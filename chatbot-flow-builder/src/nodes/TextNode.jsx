import { Handle, Position } from "reactflow";

export default function TextNode({ data }) {
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "6px",
        background: "white",
        minWidth: "150px",
      }}
    >
      <Handle type="target" position={Position.Left} />

      <strong>Send Message</strong>
      <div style={{ marginTop: "5px" }}>{data.label}</div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
}