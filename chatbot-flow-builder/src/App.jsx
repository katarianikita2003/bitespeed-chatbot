import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
} from "reactflow";
import { useState } from "react";
import { ReactFlowProvider } from "reactflow";
import { useCallback, useRef } from "react";
import TextNode from "./nodes/TextNode";
import NodesPanel from "./panels/NodesPanel";

import "reactflow/dist/style.css";

const nodeTypes = {
  textNode: TextNode,
};

function FlowCanvas() {
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback((params) => {
    setEdges((eds) => {
      const sourceAlreadyConnected = eds.some(
        (edge) => edge.source === params.source
      );

      if (sourceAlreadyConnected) {
        alert("This node already has an outgoing connection.");
        return eds;
      }

      return addEdge(params, eds);
    });
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `${Date.now()}`,
        type,
        position,
        data: { label: "New Message" },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [reactFlowInstance]
  );

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ flex: 1 }}>
          <FlowCanvas />
        </div>
        <NodesPanel />
      </div>
    </ReactFlowProvider>
  );
}