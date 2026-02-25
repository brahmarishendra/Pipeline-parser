from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from collections import deque, defaultdict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
# I used def to define a function that returns a dictionary with the key 'Ping' and value 'Pong'
def read_root():
    return {'Ping': 'Pong'}
4
# Async def to define a function that returns a dictionary with the key 'Ping' and value 'Pong' while using await to wait for the response
@app.post('/pipelines/parse')
async def parse_pipeline(request: Request):
    try:
        data = await request.json()
        nodes = data.get('nodes', [])
        edges = data.get('edges', [])
        
        num_nodes = len(nodes)
        num_edges = len(edges)
        
        is_dag = check_if_dag(nodes, edges)
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag
        }
    # I uses except to catch any exceptions that may occur during the execution of the try block
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"error": str(e), "status": "failed"}

def check_if_dag(nodes, edges):
    # Ensure all IDs are strings and we have a complete set of node IDs
    node_ids = set(str(node.get('id', '')) for node in nodes if node.get('id'))
    
    # Also include any nodes mentioned in edges but not in nodes list (shouldn't happen but good to be safe)
    for edge in edges:
        if edge.get('source'): node_ids.add(str(edge['source']))
        if edge.get('target'): node_ids.add(str(edge['target']))

    adj = defaultdict(list)
    in_degree = {node_id: 0 for node_id in node_ids}

 # I prefer Khan's Algorithim (Topological Sort medthod That's helps to detect cycle in a directed graph) here to check if the graph is a DAG
 # Topological Sort is a linear ordering of vertices such that for every directed edge uv from vertex u to vertex v, vertex u comes before vertex v in the ordering.
 #  And it will Checks/process every (Node) to be sure that there is no cycle in the graph
    
    for edge in edges:
        u = str(edge.get('source', ''))
        v = str(edge.get('target', ''))
        if u and v:
            adj[u].append(v)
            in_degree[v] += 1
        
    queue = deque([n for n in node_ids if in_degree[n] == 0])
    visited_count = 0

 # I used while Loop to perform topological sort    
    while queue:
        u = queue.popleft()
        visited_count += 1
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
    
    # Debug print to terminal
    print(f"DAG Check: nodes={len(node_ids)}, edges={len(edges)}, visited={visited_count}, is_dag={visited_count == len(node_ids)}")
                
    return visited_count == len(node_ids)
