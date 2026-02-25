// store.js
import {createWithEqualityFn} from "zustand/traditional";
import {addEdge, applyNodeChanges, applyEdgeChanges, MarkerType} from "reactflow";

export const useStore = createWithEqualityFn((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    activeCategory: "General",
    searchQuery: "",

    resetCanvas: () => set({nodes: [], edges: []}),
    setActiveCategory: (category) => set({activeCategory: category}),
    setSearchQuery: (query) => set({searchQuery: query}),
    onEdgeDelete: (id) => set({edges: get().edges.filter((edge) => edge.id !== id)}),

    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },

    addNode: (node) => {
        set({
            nodes: [...get().nodes, node],
        });
    },

    deleteNode: (nodeId) => {
        set({
            nodes: get().nodes.filter((node) => node.id !== nodeId),
            edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
        });
    },

    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    onConnect: (connection) => {
        set({
            edges: addEdge(
                {
                    ...connection,
                    type: "buttonEdge",
                    animated: true,
                    markerEnd: {type: MarkerType.Arrow, height: "20px", width: "20px"},
                },
                get().edges,
            ),
        });
    },

    updateNodeField: (nodeId, fieldName, fieldValue) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === nodeId) {
                    node.data = {...node.data, [fieldName]: fieldValue};
                }
                return node;
            }),
        });
    },
}));
