# Funding Data Extraction Design

## Goal

Keep payment destinations out of translatable MDX so localization updates cannot accidentally modify donation links, email addresses, or cryptocurrency wallet addresses.

## Design

Create `src/data/funding.data.ts` as the single source of truth for payment-method links, the contact email link, and cryptocurrency wallets. Export typed constants from that file and import them into `content/contributing/funding.mdx`.

The MDX document remains responsible for translated labels and layout. It reads URL values and wallet records from the data module. The Backers link and image remain in MDX because they are not payment destinations.

## Validation

No tests will be added. Run the existing TypeScript check and Docusaurus production build to validate the imports and MDX rendering.
