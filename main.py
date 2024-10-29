from fastapi import FastAPI, HTTPException
import requests
from pydantic import BaseModel

app = FastAPI()

# Databricks configuration




# Pydantic model for the job request
class NotebookRunRequest(BaseModel):
    notebook_path: str
    cluster_id: str

# Function to trigger Databricks notebook
def run_databricks_notebook(notebook_path: str, cluster_id: str):
    url = f"{DATABRICKS_HOST}/api/2.1/jobs/runs/submit"
    headers = {
        "Authorization": f"Bearer {DATABRICKS_TOKEN}",
        "Content-Type": "application/json"
    }
    
    # Payload to run the notebook
    payload = {
        "run_name": "FastAPI-triggered notebook run",
        "existing_cluster_id": cluster_id,
        "notebook_task": {
            "notebook_path": notebook_path
        }
    }
    
    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail=response.json())

# FastAPI route to run the notebook
@app.post("/run-notebook/")
async def run_notebook(request: NotebookRunRequest):
    try:
        result = run_databricks_notebook(request.notebook_path, request.cluster_id)
        return {"status": "Notebook run triggered", "details": result}
    except HTTPException as e:
        return {"status": "Failed", "details": str(e.detail)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
