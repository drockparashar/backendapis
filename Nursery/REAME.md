🌱 Project Direction Summary
✅ Core Features Implemented
Planting Seeds: POST /api/plant creates a new plant with default values.

Watering Plants: POST /api/plant/:id/water updates health and resets last watered date.

Fetching Plant Status: GET /api/plant/:id returns plant data, updates health, and now will also update growth.

🔄 Growth System Design (Hybrid Model)
You're transitioning from real-time recalculation to a hybrid growth system that:

Stores: growthProgress, growthRate, lastGrowthCheck, and growthStage in the DB.

Calculates: Growth incrementally on key interactions (e.g. fetching, watering, fertilizing).

Locks in stage changes based on thresholds, keeping progression consistent and traceable.

🌿 Key Growth Logic
growthRate: Starts at 1.0, increases (e.g. +0.25) with fertilizer.

growthProgress: Accumulates over time:
days_elapsed * growthRate → growthProgress

growthStage is updated based on growthProgress:

0–2 → seed

2–5 → seedling

5–10 → young

10+ → mature

This makes the system predictable, consistent, and scalable.

⚙️ Health Logic
Loses 10% per unwatered day.

Watering boosts by +20 (up to max 100).

Plants die if health drops to 0 (isAlive = false).

🧪 Fertilizer (Next Step)
Use endpoint POST /api/plant/:id/fertilize to:

Boost growthRate (either temporarily or permanently).

Optionally limit frequency or duration.

💡 Optional Enhancements (Future Ideas)
Weather system affecting growth/health.

Scheduled background growth (e.g., with a cron job).

Achievements system (e.g., Green Thumb for maturing 5 plants).

Plant logs or stage history for UI display.

This system sets you up well for a gamified, stateful plant simulator where time, care, and actions directly influence plant outcomes. You're combining state management with time-based logic in a meaningful way—great for learning!  