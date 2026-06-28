# Funding Data Extraction Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Move donation URLs, the contact email link, and cryptocurrency wallet addresses out of translated MDX into a typed data module.

**Architecture:** A TypeScript module under `src/data` exports immutable funding links and wallet records. The funding MDX page imports those values while retaining translated labels and presentation markup.

**Tech Stack:** TypeScript, MDX, React, Docusaurus

---

### Task 1: Create the funding data module

**Files:**
- Create: `src/data/funding.data.ts`

**Step 1: Add payment destinations**

Export immutable constants for OpenCollective, GitHub Sponsors, RUB and EUR Tribute, and the contact email link. Export the five existing cryptocurrency wallet records.

### Task 2: Consume funding data from MDX

**Files:**
- Modify: `content/contributing/funding.mdx`

**Step 1: Import the data**

Add an MDX code-block import from `@site/src/data/funding.data`.

**Step 2: Replace inline destinations**

Use the imported link constants for payment buttons and contact email. Replace the inline wallet array with the imported wallet collection. Leave the Backers URL and image unchanged.

### Task 3: Verify the integration

**Files:**
- Verify: `src/data/funding.data.ts`
- Verify: `content/contributing/funding.mdx`

**Step 1: Run the TypeScript check**

Run: `npm run typecheck`

Expected: TypeScript exits successfully.

**Step 2: Run the production build**

Run: `npm run build`

Expected: Docusaurus builds all configured locales successfully.
