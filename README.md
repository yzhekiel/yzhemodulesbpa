# Roxas Dental — Patient Engagement UI

Interactive React + TypeScript frontend demo by John Yzhekiel Y. Millar for modules 16, 17, 18, 24 and 25. Based on the September 17, 2026 combined process documentation and supplied ERD/BPMN. All patient identities and contact values in the application are fictional test data.

## Run locally

Requires Node.js 22.13 or newer and pnpm.

```sh
npm install -g pnpm
pnpm install --frozen-lockfile
pnpm dev
```

Open the localhost address printed by the development server. No API keys, account registration, or database setup is needed. The app uses React 19, Vinext/Vite, TypeScript, Radix/Shadcn components, and Lucide icons.

```sh
pnpm exec tsc --noEmit
pnpm build
```

## Professor testing guide

Use the sidebar to change modules. Changes persist in the current browser using localStorage. Use **Reset demo** to restore a clean test dataset. An incognito window gives an independent workspace.

| Module | Test flow | Expected result |
| --- | --- | --- |
| 16 Social Media Inquiry | New inquiry → enter sender/contact/topic/source/staff → Save → open inquiry → Record response → Create follow-up → Book appointment | Status updates, staff task, linked appointment, ongoing conversation, and simulated confirmation are recorded. Closed/converted records cannot be converted again. |
| 17 Unified Messaging | Receive message → choose patient/channel/staff → Save → select conversation → write reply or use template → Record reply → Resolve | Patient linkage and message history persist. Closed conversations disable replies and can be reopened. |
| 18 Real-Time Notifications | Simulate event → choose event/patient/channel and failure → Process → View history → Retry | First failed attempt is retained; retry adds a second successful attempt and updates delivery metrics. |
| 24 Referral & Loyalty (PE) | Generate referral code → Record referral with a different patient and completed visit reference → Verify visit & award → Check duplicate protection → Redeem points | One reward per referral; self-referrals and duplicate referred patients are rejected. Redemptions cannot exceed balance. Transactions are retained. |
| 25 Marketing / Reactivation / Engagement (PE) | Create campaign → select target group/date/message → Schedule outreach → Simulate outreach → Record response/feedback → Close campaign | Opted-out patients are excluded. Outreach appears in notification history. Booked responses create appointment links; low ratings are flagged for review. Summary remains visible after closing. |

## Scope and honest limitations

This is a working **UI prototype**, not a production clinic system:

- Social intake, incoming messages, SMS/email delivery, and operational events are manually simulated; no Facebook, Instagram, SMS, email, or webhook integration is configured.
- Campaign scheduling records the intended time; **Simulate outreach** explicitly runs the demo. There is no background job runner.
- Visit verification is a staff simulation using a visit reference. A production backend must validate appointment completion/billing before awarding points.
- Demo staff selection is not authentication or RBAC. There are no production security claims. Do not enter real patient information.
- Data is browser-local, not shared between devices or users; localStorage is editable and is not an audit/security boundary.
- Sample consent is preconfigured: Isabel, Marco, and Ethan opted in; Sofia opted out. Inactive targeting means last visit over 180 days ago, evaluated when outreach is triggered.
- Modules 24 and 25 remain clearly marked **Proposed Enhancement**. Their reward values are demo rules, not requirements supplied by the clinic.
- Metrics are computed from demo records. The documentation's performance targets are not presented as measured outcomes.
- A new standalone project was created because an existing React source project was not attached.

## ERD alignment and backend handoff

| Frontend data | Corresponding ERD entities |
| --- | --- |
| inquiries / tasks | INQUIRY_SOURCES, SOCIAL_INQUIRIES, INQUIRY_ACTION_TASKS |
| conversations / nested messages | CONVERSATIONS, CONVERSATION_MESSAGES, MESSAGE_TEMPLATES |
| notifications / nested logs | PATIENT_NOTIFICATIONS, NOTIFICATION_DELIVERY_LOGS |
| accounts / referrals / transactions | REFERRAL_CODES, PATIENT_REFERRALS, LOYALTY_ACCOUNTS, LOYALTY_TRANSACTIONS |
| campaigns / recipients / responses / feedback | ENGAGEMENT_CAMPAIGNS, PATIENT_REACTIVATIONS, PATIENT_FEEDBACKS |

UI records use readable names and nested histories for the prototype. They are not an implementation of the normalized relational schema. Backend work should replace state mutations with authenticated API services, stable foreign keys, server-side eligibility and consent checks, idempotency/unique constraints, and atomic reward transactions. Appointment/billing integrations belong to the other clinic modules.

## Public GitHub repository

Suggested repository: `roxas-dental-engagement-ui` (Public).

After creating an empty public repository in your GitHub account, run from this project folder:

```sh
git init
git add .
git commit -m "Build interactive patient engagement module demo"
git branch -M main
git remote add origin https://github.com/yzhekiel/roxas-dental-engagement-ui.git
git push -u origin main
```

If `origin` already exists, use `git remote set-url origin ...` instead of `git remote add`. A repository exposes source code; it does not itself host a running app. A professor can clone and run the commands above. The separately hosted private preview is owner-only.

## Source structure

- `app/page.tsx`: five-module workspace, forms, state, and demo workflow actions.
- `app/globals.css`: responsive clinic theme and layout.
- `components/ui/`: accessible interface primitives.
- `app/layout.tsx`: document metadata.

Original clinic documentation and diagrams are not included in the public source package.
