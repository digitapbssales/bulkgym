# PHASE 4 — BOOKING AND CHECK-IN (Sub-prompt)

You are now in PHASE 4 — BOOKING AND CHECK-IN for the Bulk Gym MOBILE APP.

Focus only on the following master features:

- Class booking and cancellation
- Personal training booking
- Trainer availability
- QR and geo-based check-in

Your goals:

1. Booking User Experience and Flows
   - Design:
     - Class discovery and schedule views.
     - Booking and cancellation flows for classes.
     - Booking flows for personal training sessions.
   - Define constraints and feedback:
     - Capacity limits, conflicts, and cooldowns.
     - Clear confirmation and cancellation states.

2. Trainer Availability
   - Describe how trainers:
     - Surface their availability in the mobile app if allowed for trainers and managers on mobile.
   - For members:
     - Explain how availability is visualized.
     - Show how it connects to booking personal training.

3. Check-In with QR and Geo
   - Design:
     - Member-facing check-in flow using QR code scanning.
     - Geo-based check-in constraints, such as distance limits and single location at a time.
   - Describe security considerations:
     - Prevent easy spoofing.
     - Handle offline or poor connectivity at the gym entrance.

4. Data and Integration
   - Outline how:
     - Bookings are stored, including entities and statuses.
     - Check-ins are recorded.
     - These tie into Supabase and REST APIs.

5. Output Format
   - Return:
     - User experience flow descriptions for booking, cancellation, and check-in.
     - A list of required screens and states.
     - A data model outline for bookings, availability, and check-ins.
     - A short description of how these features interact with membership status.

Do not implement payments or non-booking features in this phase.

