<!--
  All the site's text lives here. Edit this file and refresh the page —
  main.js reads it on load and fills in the headings, buttons, and project
  list from it. No HTML editing needed for wording changes.

  Rules the parser understands:
    ## Section Name        starts a section
    key: value             a field inside the current section (one line each)
    ### Item Name           starts a list item inside a section (used for
                            the "How the pieces fit" list below)
    plain text under an
    ### item                becomes that item's description (one line)
    | table | rows |        used only for the Project List section below

  If this file fails to load (e.g. you just double-clicked index.html
  instead of running it through a local server), the site falls back to
  the text baked into index.html, so nothing breaks — it just won't
  reflect your edits until served over http. A quick local server:
  `python3 -m http.server` from this folder, then open localhost:8000.
-->

## Meta
title: Phoenix Suite
description: A one-person workshop of Minecraft mods and modpacks, built by Phoenixvine.

## Header
brand: Phoenix Suite
nav_projects: Projects
nav_showcase: How it fits
nav_wiki: Wiki

## Hero
heading: A suite of mods that all share one spine.
lede: I build Minecraft mods for Forge 1.20.1 — mostly the plumbing other mods and packs get built on, not flashy content additions. Everything here shares one foundation, gets real documentation, and ships when it's actually ready.
button_primary: Browse Projects
button_secondary: Open the Wiki
meta_suffix: mods and counting, built solo, all for Forge 1.20.1.

## Foundation
heading: How the pieces fit
lede: PhoenixCore sits underneath most of it — shared plumbing so each mod isn't reinventing the same systems. Here's how the rest connects to it:

### phoenix/core
shared foundation the rest of the suite builds on

### phoenix/chronicles
quest editor — live dependency lines, drag-to-reorder, FTB Quests import

### phoenix/forge-tech
the modpack that proves it all works together

### phoenix/wiki
player guides and developer docs, kept in one place

## Projects
heading: Projects
filter_all: All
filter_active: Active
filter_maintenance: Maintenance
filter_limbo: Limbo / Abandoned

## Footer
text: Phoenix Suite — a solo project by Phoenixvine.
wiki_link: Wiki

## Project List
<!-- name | status (active / maintenance / limbo) | description | github url (blank if none) | curseforge url (blank if none) -->
| Name | Status | Description | GitHub | CurseForge |
|---|---|---|---|---|
| PhoenixCore | active | The Core-mod for the pack Phoenix Forge Technologies | https://github.com/Omicron-Industries/PhoenixCore | |
| Phoenix Forge Technologies | active | The main Forge modpack built using the PhoenixSuite. | https://github.com/P-H-O-E-N-I-X-PackForge/Phoenix-Forge-Technologies | |
| Phoenix Chronicles | active | A modern quest/progression system with FTB Quests import support. Bug fixes. | https://github.com/Omicron-Industries/PhoenixChronicles | |
| Phoenix's Fission | active | API is stable - bug fixes land as MoniLabs adopts it. | https://github.com/Omicron-Industries/Phoenix_Fission | |
| Phoenix Tesla Network | active | Small bugs outstanding, needs recipes. | https://github.com/P-H-O-E-N-I-X-PackForge/Phoenix-Tesla-Network | |
| Phoenix Guilds | maintenance | Maintenance mode. | https://github.com/Omicron-Industries/Phoenix-Guilds | |
| Phoenix Domains | maintenance | Maintenance mode. | https://github.com/Omicron-Industries/Phoenix-Domains | |
| Solaris | maintenance | Maintenance mode. | https://github.com/Omicron-Industries/Solaris | |
| Phoenix Ultimine | maintenance | Maintenance mode. | | |
| Phoenix Essentials | maintenance | Maintenance mode. | https://github.com/Phoenixvine32908/PhoenixEssentials | |
| Phoenix Archive | maintenance | Maintenance mode. | https://github.com/Phoenixvine32908/Phoenix-Archive | |
| Phoenix Chromatic Codes | maintenance | Maintenance mode. | https://github.com/Omicron-Industries/PhoenixChromaticCodes | |
| Phantasia | maintenance | Maintenance mode. | https://github.com/P-H-O-E-N-I-X-PackForge/Phantasia | |
| Phoenix Gregic Additions | limbo | Mostly abandoned - updated on request (Sky of Grind). | | |
| Oculus Unofficial | limbo | In limbo, no current plans to work on it. | | |
