from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    message: Optional[str] = None
    source: str = "landing_page"
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    message: Optional[str] = None

class NewsletterSubscribe(BaseModel):
    email: EmailStr
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class NewsletterCreate(BaseModel):
    email: EmailStr

# Routes
@api_router.get("/")
async def root():
    return {"message": "TurboConvert API - High-Converting Landing Page Service"}

@api_router.post("/leads", response_model=Lead)
async def create_lead(input: LeadCreate):
    """Submit a lead from the landing page form"""
    try:
        lead_dict = input.model_dump()
        lead_obj = Lead(**lead_dict)
        
        # Convert to dict and serialize datetime to ISO string for MongoDB
        doc = lead_obj.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        _ = await db.leads.insert_one(doc)
        return lead_obj
    except Exception as e:
        logging.error(f"Error creating lead: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit lead")

@api_router.get("/leads", response_model=List[Lead])
async def get_leads():
    """Get all leads (admin endpoint)"""
    leads = await db.leads.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for lead in leads:
        if isinstance(lead['timestamp'], str):
            lead['timestamp'] = datetime.fromisoformat(lead['timestamp'])
    
    return leads

@api_router.post("/newsletter", response_model=NewsletterSubscribe)
async def subscribe_newsletter(input: NewsletterCreate):
    """Subscribe to newsletter"""
    try:
        newsletter_obj = NewsletterSubscribe(email=input.email)
        
        # Convert to dict and serialize datetime to ISO string for MongoDB
        doc = newsletter_obj.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        _ = await db.newsletter.insert_one(doc)
        return newsletter_obj
    except Exception as e:
        logging.error(f"Error subscribing to newsletter: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to subscribe")

@api_router.get("/stats")
async def get_stats():
    """Get conversion stats"""
    try:
        total_leads = await db.leads.count_documents({})
        total_subscribers = await db.newsletter.count_documents({})
        
        return {
            "total_leads": total_leads,
            "total_subscribers": total_subscribers,
            "total_conversions": total_leads + total_subscribers
        }
    except Exception as e:
        logging.error(f"Error getting stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get stats")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()