import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
} from "reactflow";
import { useState, useCallback } from "react";
import { ReactFlowProvider } from "reactflow";

import TextNode from "./nodes/TextNode";
import NodesPanel from "./panels/NodesPanel";

import "reactflow/dist/style.css";

const nodeTypes = {
  textNode: TextNode,
};

function FlowCanvas({
  nodes,
  setNodes,
  onNodesChange,
  edges,
  setEdges,
  onEdgesChange,
  selectedNode,
  setSelectedNode,
}) {
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Highlight selected node
  const styledNodes = nodes.map((node) => ({
    ...node,
    style:
      selectedNode && node.id === selectedNode.id
        ? { border: "2px solid #007bff" }
        : { border: "1px solid #222" },
  }));

  const onConnect = useCallback(
    (params) => {
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
    },
    [setEdges]
  );

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
    [reactFlowInstance, setNodes]
  );

  const onNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      <ReactFlow
        nodes={styledNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default function App() {
  const [selectedNode, setSelectedNode] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <ReactFlowProvider>
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ flex: 1 }}>
          <FlowCanvas
            nodes={nodes}
            setNodes={setNodes}
            onNodesChange={onNodesChange}
            edges={edges}
            setEdges={setEdges}
            onEdgesChange={onEdgesChange}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
          />
        </div>

        <NodesPanel
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
          setNodes={setNodes}
        />
      </div>
    </ReactFlowProvider>
  );
}