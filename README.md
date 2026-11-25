# MTCaptcha Demo Application (Svelte)

This is a demo application to test and verify the `svelte-mtcaptcha` library.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mtcaptcha-public/mtcaptcha-svelte-example.git
   cd mtcaptcha-svelte-example
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Add your MTCaptcha sitekey:**
   - Create or update `.env` in the project root
   - The checked-in example uses the public demo site key, which loads on localhost:
   ```bash
   MTCAPTCHA_SITEKEY=MTPublic-DemoKey9M
   ```
   - Replace that with the site key from the MTCaptcha Admin Console for your own site. Add `localhost` under the site's development domains when you use your own key.

## Running the Demo

```bash
# Development
npm run dev

# Build
npm run build

# Preview the production build
npm run preview
```

The application is usually available at `http://localhost:5173`.

## Basic Usage (Svelte)

```svelte
<script>
  import { MTCaptcha } from 'svelte-mtcaptcha';

  let captcha = $state(null);
  const sitekey = import.meta.env.MTCAPTCHA_SITEKEY;

  function onVerified(state) {
    console.log('Verified token:', state.verifiedToken);
  }
</script>

<MTCaptcha bind:this={captcha} {sitekey} verifiedCallback={onVerified} />
```

## Notes

- This demo installs `svelte-mtcaptcha` from npm (`npm i svelte-mtcaptcha`).
- Use a valid public sitekey from the MTCaptcha dashboard.
- Restart the dev server after changing `.env`.
