# Dungeons and Dragons Campaign Manager

## Overview

The Campaign & Encounter Tracker is a web-based backend service designed to help Dungeon Masters (DMs) organize and manage their tabletop RPG campaigns and encounters. Users can create, modify, and track campaigns, encounters, and related details, ensuring a streamlined and structured game management experience. Authentication via OAuth ensures secure access and user-specific data ownership.

## Features

1. User Authentication & Management

- OAuth (Google) authentication for secure user login.

- Each user can only access their own campaigns and encounters.

2. Campaign Management

- CRUD operations for campaigns.

- Each campaign includes:

- - Title: Name of the campaign.

- - Dungeon Master (DM) Name: Name of the game master running the campaign.

- - Players: List of player names or IDs.

- - Start Date: When the campaign was started.

- - Description: Brief summary of the campaign.

- - Encounters: List of associated encounters.

- - Notes: Additional notes or details.

3. Encounter Management

- CRUD operations for encounters.

- Each encounter includes:

- - Campaign ID: Links the encounter to a specific campaign.

- - Encounter Name: Short description (e.g., “Goblin Ambush”).

- - Enemies: List of enemies with names, HP, and abilities.

- - Difficulty Level: Easy, Medium, Hard, Deadly (DM-defined).

- - Location: Where the encounter takes place.

- - Rewards: Loot, XP, or benefits for players.

- - Notes: DM’s additional notes about the encounter.

4. API Features

- CRUD API routes for campaigns and encounters.

- Data validation to ensure proper input.

- Error handling to prevent bad requests or unauthorized access.

5. Deployment & Documentation

- Hosted on Render for live API access.

- Comprehensive API documentation.

- YouTube demonstration showing API functionality and database modifications.

## API Documentation

(To be detailed in the API documentation file)

## Future Enhancements

- AI-Powered Encounter Suggestions.

- Character & Inventory Management.

- Interactive Frontend for DM management.

- Subscription-based premium features.