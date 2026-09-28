# backend/database.py

import sys
from motor.motor_asyncio import AsyncIOMotorClient
from .config import Settings, settings

try:
    import certifi
    CA_FILE = certifi.where()
except ImportError:
    CA_FILE = None

client: AsyncIOMotorClient | None = None


async def connect_to_mongo() -> None:
    """Initialize MongoDB client and expose database handle via Settings.db."""
    global client
    try:
        kwargs = {}
        if CA_FILE:
            kwargs["tlsCAFile"] = CA_FILE

        client = AsyncIOMotorClient(
            settings.mongodb_uri,
            serverSelectionTimeoutMS=5000,
            **kwargs
        )
        
        # Determine target database name from URI
        uri_clean = settings.mongodb_uri.split("?")[0]
        db_name = uri_clean.rsplit("/", 1)[-1]
        if not db_name or db_name.startswith("mongodb"):
            db_name = "summify"

        Settings.db = client[db_name]

        # Verify connectivity with a quick ping
        await client.admin.command("ping")
        print(f" Connected to MongoDB Atlas successfully (database: '{db_name}')")
    except Exception as e:
        Settings.db = None
        print(f"❌ MongoDB connection failed: {e}")
        print("💡 TIP: Ensure your current IP is whitelisted in MongoDB Atlas Network Access (0.0.0.0/0 for dev).")


async def close_mongo_connection() -> None:
    """Close the global Motor client on app shutdown."""
    global client
    if client:
        client.close()
        print("MongoDB connection closed")
