# Soul Bites recovery

Recovered on 26 November 2026 for JayDev-27/Soul-Bites.

The previous local checkout and original GitHub repository were unavailable. The running storefront at https://soul-bites.vercel.app/ supplied the deployed images, fonts, and CSS. Earlier development records supplied the application source, migrations, API, tests, and setup documentation.

The featured carousel and cart icon were reconstructed where complete original source was unavailable. CSS Modules were recovered from the deployed styles and formatted as editable source. The burger WebGL renderer, ingredient artwork, fries, mojito, customer checkout, staff console, and order tracking were restored. Showcase captures were regenerated from the restored application.

This repository begins with a new recovery commit. The original commit history was unavailable. The main-backup branch retains the initial restored version.

## Verification

- Production build and ESLint.
- 35 service and API tests.
- 32 desktop and mobile browser tests.
- Scroll sequence and local assets inspected in the running app.
- The kitchen console screenshot uses a browser fixture with a sample cash order.

## Production setup

Run the two Supabase migrations and configure the environment using .env.example and ORDERING.md. Server credentials, the verified staff membership, email delivery, live Razorpay keys, the geocoding key, confirmed pricing, and production DNS need to be configured in the deployment account.

The recovered Vercel storefront was accessible during recovery, but its commerce endpoint returned FUNCTION_INVOCATION_FAILED. This recovery does not establish access to that Vercel account. Connect the new repository through the hosting dashboard to deploy the recovered code.

Production checkout blocks order submission until ordering configuration is complete. Local Vite sessions can save browser-only sample orders.

## Upstream restoration

The original repository later became accessible at Arxana04/soul-bites. Its main history was merged into the recovered project while retaining the recovered application tree. JayDev-27/soul-bites is a GitHub fork of that upstream repository.
