<script>
  import { MTCaptcha } from 'svelte-mtcaptcha';

  const customLangText = {
    en: {
      inputPrompt: 'Enter captcha text',
      verifySuccess: 'Success',
      verifyFail: 'Invalid captcha',
    },
  };

  const customAccessibilityText = {
    en: {
      default: {
        iframeTitle: 'Custom Security Verification Frame',
      },
    },
  };

  const customFonts = {
    defaultFontFamily: 'sans-serif',
    fonts: [
      {
        family: 'Inter',
        url: 'https://cdn.jsdelivr.net/fontsource/fonts/inter:vf@5.3.0/latin-wght-normal.woff2',
        format: 'woff2',
      },
    ],
  };

  let email = $state('');
  let password = $state('');
  let message = $state('');
  let verifiedToken = $state('');
  let captcha = $state(null);
  const captchaSiteKey = import.meta.env.MTCAPTCHA_SITEKEY || '';
  const lang = 'en';

  function onVerified(state) {
    verifiedToken = state?.verifiedToken || '';
  }

  function onSubmit(event) {
    event.preventDefault();
    const tokenFromRef = captcha?.getVerifiedToken?.() || '';
    const token = tokenFromRef || verifiedToken;

    if (!token) {
      message = 'Please complete captcha verification first.';
      return;
    }

    message = `Login submitted for ${email} (token: ${token.slice(0, 12)}...)`;
  }
</script>

<main class="page">
  <form class="card" onsubmit={onSubmit}>
    <h1>Login</h1>

    <label for="email">Email</label>
    <input
      id="email"
      bind:value={email}
      type="email"
      placeholder="savi@example.com"
      required
    />

    <label for="password">Password</label>
    <input
      id="password"
      bind:value={password}
      type="password"
      placeholder="Enter your password"
      required
    />

    {#if captchaSiteKey}
      <MTCaptcha
        bind:this={captcha}
        sitekey={captchaSiteKey}
        verifiedCallback={onVerified}
        customLangText={customLangText}
        customAccessibilityText={customAccessibilityText}
        customFonts={customFonts}
        {lang}
      />
    {:else}
      <p class="message error">
        Missing site key. Set <code>MTCAPTCHA_SITEKEY</code> in your <code>.env</code>.
      </p>
    {/if}

    <button type="submit">Sign In</button>

    {#if message}
      <p class="message">{message}</p>
    {/if}
  </form>
</main>
