import React, { useMemo } from "react";
import { X } from "lucide-react";
import { useStore } from "./store";

/* I am created this ResultModel card (component) for 
    to show the result of the pipeline in a modal , Instead of alert button 
    I created with illustartive UI that feels product better , user can understand 
    (what happen based on input) easily and can interact with the modal  
*/

export const ResultModal = ({ isOpen, onClose, results }) => {
    /* nodes & edges are used to show the pipeline visualization in the modal*/
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const visualization = useMemo(() => {
        if (nodes.length === 0 || !results) return null;

        // Calculate bounding box
        const nodePositions = nodes.map((n) => n.position);
        const minX = Math.min(...nodePositions.map((p) => p.x));
        const maxX = Math.max(...nodePositions.map((p) => p.x)) + 100;
        const minY = Math.min(...nodePositions.map((p) => p.y));
        const maxY = Math.max(...nodePositions.map((p) => p.y)) + 50;

        const width = maxX - minX + 100;
        const height = maxY - minY + 100;
        const viewBox = `${minX - 50} ${minY - 50} ${width} ${height}`;

        return (
            <svg width="100%" height="100%" viewBox={viewBox} style={{ overflow: "visible" }}>
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="28"
                        refY="3.5"
                        orient="auto"
                    >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
                    </marker>
                    <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#c7d2fe" />
                        <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                </defs>

                {/* Connections (Edges) */}
                {edges.map((edge) => {
                    const sourceNode = nodes.find((n) => n.id === edge.source);
                    const targetNode = nodes.find((n) => n.id === edge.target);
                    // if sourceNode or targetNode is not found || empty then return null (Empty node check point) */ }
                    if (!sourceNode || !targetNode) return null;

                    const sx = sourceNode.position.x + 100;
                    const sy = sourceNode.position.y + 25;
                    const tx = targetNode.position.x;
                    const ty = targetNode.position.y + 25;

                    // Bezier curves
                    const path = `M ${sx} ${sy} C ${sx + 50} ${sy}, ${tx - 50} ${ty}, ${tx} ${ty}`;

                    return (
                        <path
                            key={edge.id}
                            d={path}
                            stroke="url(#edge-gradient)"
                            strokeWidth="3"
                            fill="none"
                            markerEnd="url(#arrowhead)"
                            style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))" }}
                        />
                    );
                })}

                {/* Nodes */}
                {nodes.map((node) => (
                    <g
                        key={node.id}
                        transform={`translate(${node.position.x}, ${node.position.y})`}
                    >
                        <rect
                            width="100"
                            height="50"
                            rx="8"
                            fill="white"
                            stroke={results.is_dag ? "#6366f1" : "#ef4444"}
                            strokeWidth="2"
                            style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.05))" }}
                        />
                        <circle
                            cx="15"
                            cy="25"
                            r="5"
                            fill={results.is_dag ? "#6366f1" : "#ef4444"}
                        />
                        <rect x="25" y="15" width="60" height="6" rx="3" fill="#e2e8f0" />
                        <rect x="25" y="29" width="40" height="6" rx="3" fill="#f1f5f9" />
                    </g>
                ))}
            </svg>
        );
    }, [nodes, edges, results]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <button className="card-close-btn" onClick={onClose}>
                    <X size={20} />
                </button>

                {/* Live Pipeline Visualization */}
                <div className="card-illustration">
                    {visualization || <span className="text-muted">No nodes to display</span>}
                </div>

                {/* Bottom Content Area */}
                <div className="card-content">
                    <h2 className="content-title">
                        {results.is_dag ? "Pipeline Ready" : "Pipeline Issues"}
                    </h2>

                    <div className="stats-row">
                        <div className="stat-item">
                            <span className="stat-label">Nodes</span>
                            <span className="stat-value">{nodes.length}</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-label">Edges</span>
                            <span className="stat-value">{edges.length}</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-label">Status</span>
                            <span
                                className="stat-value"
                                style={{ color: results.is_dag ? "#16a34a" : "#ef4444" }}
                            >
                                {results.is_dag ? "Valid" : "Invalid"}
                                {nodes.length === 0 ? "Empty" : ""}
                            </span>
                        </div>
                    </div>

                    <p className="content-description" style={{ marginTop: "1rem" }}>
                        {results.is_dag
                            ? "Your pipeline configuration is valid and ready for deployment."
                            : "The pipeline contains cycles or disconnected nodes. Please review your logic."}
                    </p>

                    {/*
                    <button className="card-action-btn" onClick={onClose}>
                        Done
                    </button>
                    */}
                </div>
            </div>
        </div>
    );
};
