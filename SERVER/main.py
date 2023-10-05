from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

# Fake DB for issues | Hardcoded for now since we are not using a DB
issues_db = [
    
    {
        "id": 1,
        "title": "Add to cart feature",
        "description": "Users should be able to add gift cards to their carts. Currently they can add only the items in clothing section."
    },
    {
        "id": 2,
        "title": "Currency issue fix",
        "description": "currency values shown when currency changed are wrong. need to fix that."
    },
    {
        "id": 3,
        "title": "Validation Error in user form",
        "description": "Users can enter text for the age text box. It should be limited only to enter numbers."
    },
    {
        "id": 4,
        "title": "Data type miss match issue",
        "description": "Decription exceeds the limit given in the DB. Need to fix it."
    },
    {
        "id": 5,
        "title": "New feature: Pay with paypal",
        "description": "Since many users has requested us to integrate paypal we need to add it."
    }
]

#pydantic schemas for validation
class Issue(BaseModel):
    id: int
    title: str
    description: str


app = FastAPI()

@app.get("/issue/{issue_id}", response_model=Issue)
async def read_users_me(
    issue_id : int
):
    filtered_issue = [issue for issue in issues_db if issue['id'] == issue_id ]
    if len(filtered_issue) == 0:
        HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Invalid Issue id.",
        )
    return filtered_issue[0]