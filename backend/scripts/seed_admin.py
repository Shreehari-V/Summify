# backend/scripts/seed_admin.py
"""Secure setup and seeding script to provision administrator accounts.
Admin accounts can NEVER be created through public registration.
Usage:
    Interactive:
        python -m backend.scripts.seed_admin
    With arguments:
        python -m backend.scripts.seed_admin --email admin@summify.io --name "Admin User" --password "SecureAdminPass123!"
"""

import sys
import os
import argparse
import asyncio
import getpass
from datetime import datetime
from dotenv import load_dotenv

# Ensure backend root is on Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

load_dotenv("backend/.env")
load_dotenv(".env")

from backend.config import settings
from backend.utils.password import hash_password
from motor.motor_asyncio import AsyncIOMotorClient

try:
    import certifi
    CA_FILE = certifi.where()
except ImportError:
    CA_FILE = None


async def seed_admin(email: str, name: str, password: str) -> None:
    if not email or "@" not in email:
        print("❌ Error: A valid email address is required.")
        sys.exit(1)
    if not password or len(password) < 6:
        print("❌ Error: Password must be at least 6 characters long.")
        sys.exit(1)
    if not name:
        name = "Administrator"

    print(f"\n🔐 Connecting to MongoDB Atlas to provision admin account...")
    kwargs = {}
    if CA_FILE:
        kwargs["tlsCAFile"] = CA_FILE

    client = AsyncIOMotorClient(
        settings.mongodb_uri,
        serverSelectionTimeoutMS=5000,
        **kwargs
    )
    
    uri_clean = settings.mongodb_uri.split("?")[0]
    db_name = uri_clean.rsplit("/", 1)[-1]
    if not db_name or db_name.startswith("mongodb"):
        db_name = "summify"

    db = client[db_name]

    try:
        await client.admin.command("ping")
    except Exception as e:
        print(f"❌ Failed to connect to MongoDB Atlas: {e}")
        print("💡 Ensure your IP is whitelisted in MongoDB Atlas Network Access.")
        sys.exit(1)

    clean_email = email.lower().strip()
    existing = await db.users.find_one({"email": clean_email})
    hashed = hash_password(password)

    if existing:
        print(f"ℹ️ User with email '{clean_email}' already exists (Current role: {existing.get('role')}).")
        confirm = input("Would you like to promote this account to 'admin' and update the password? [y/N]: ").strip().lower()
        if confirm == "y":
            await db.users.update_one(
                {"_id": existing["_id"]},
                {
                    "$set": {
                        "name": name.strip(),
                        "role": "admin",
                        "is_active": True,
                        "hashed_password": hashed,
                        "updated_at": datetime.utcnow(),
                    }
                }
            )
            print(f"✅ Successfully promoted '{clean_email}' to Administrator with new password!")
        else:
            print("Operation cancelled. No changes made.")
    else:
        doc = {
            "name": name.strip(),
            "email": clean_email,
            "hashed_password": hashed,
            "role": "admin",
            "is_active": True,
            "created_at": datetime.utcnow(),
        }
        res = await db.users.insert_one(doc)
        print(f"✅ Administrator account created successfully!")
        print(f"   • User ID: {res.inserted_id}")
        print(f"   • Name:    {name.strip()}")
        print(f"   • Email:   {clean_email}")
        print(f"   • Role:    admin")
        print(f"   • Active:  True\n")

    client.close()


def main():
    parser = argparse.ArgumentParser(description="Seed an Administrator account for Summify.")
    parser.add_argument("--email", help="Admin email address")
    parser.add_argument("--name", default="Administrator", help="Admin full name")
    parser.add_argument("--password", help="Admin password (leave blank for interactive prompt)")

    args = parser.parse_args()

    email = args.email
    name = args.name
    password = args.password

    if not email:
        print("==================================================")
        print("   Summify Administrator Account Provisioning     ")
        print("==================================================")
        email = input("Admin Email: ").strip()

    if not name or name == "Administrator":
        interactive_name = input(f"Admin Full Name [{name}]: ").strip()
        if interactive_name:
            name = interactive_name

    if not password:
        password = getpass.getpass("Admin Password: ").strip()
        confirm_pass = getpass.getpass("Confirm Password: ").strip()
        if password != confirm_pass:
            print("❌ Passwords do not match.")
            sys.exit(1)

    asyncio.run(seed_admin(email, name, password))


if __name__ == "__main__":
    main()
