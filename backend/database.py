import sys
import urllib.request
from motor.motor_asyncio import AsyncIOMotorClient
from .config import Settings, settings

try:
    import certifi
    CA_FILE = certifi.where()
except ImportError:
    CA_FILE = None

client: AsyncIOMotorClient | None = None


def get_public_ip() -> str:
    """Helper to detect current public IP for actionable diagnostics."""
    try:
        with urllib.request.urlopen("https://api.ipify.org", timeout=2.5) as resp:
            return resp.read().decode("utf-8").strip()
    except Exception:
        return "Unknown"


async def connect_to_mongo() -> None:
    """Initialize MongoDB client and expose database handle via Settings.db."""
    global client
    try:
        kwargs = {}
        if CA_FILE:
            kwargs["tlsCAFile"] = CA_FILE

        client = AsyncIOMotorClient(
            settings.mongodb_uri,
            serverSelectionTimeoutMS=4000,
            connectTimeoutMS=4000,
            **kwargs
        )
        
        # Determine target database name from URI
        uri_clean = settings.mongodb_uri.split("?")[0]
        db_name = uri_clean.rsplit("/", 1)[-1]
        if not db_name or db_name.startswith("mongodb"):
            db_name = "summify"

        # Verify connectivity with a quick ping
        await client.admin.command("ping")
        Settings.db = client[db_name]
        print(f" Connected to MongoDB Atlas successfully (database: '{db_name}')")
    except Exception as e:
        Settings.db = None
        ip = get_public_ip()
        print(f"❌ MongoDB connection failed: {e}")
        print(f"👉 Current Public IP: {ip}")
        print(f"👉 Fix: In MongoDB Atlas (cloud.mongodb.com) -> Security -> Network Access -> Add IP Address")
        print(f"       Add your current IP ({ip}) or add '0.0.0.0/0' (allow from anywhere).")


async def close_mongo_connection() -> None:
    """Close the global Motor client on app shutdown."""
    global client
    if client:
        client.close()
        print("MongoDB connection closed")
