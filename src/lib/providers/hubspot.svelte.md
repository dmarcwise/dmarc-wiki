---
name: HubSpot
slug: hubspot
logo: hubspot.jpg
type: marketing
spfAlignment: partial
dkim: true
dkimAlignment: true
updated: 2024-10-05
---

<script>
  import DotsBadge from '$lib/mdsvex/dots-badge.svelte';
</script>

<Block title="SPF">

### Without dedicated IP

**If you don't have a dedicated IP**, HubSpot is **not capable** of sending SPF-aligned emails, meaning that their mail servers won't use your domain name in the `Envelope From` (or `Return-Path`) of email messages.

In this situation it's not possible to achieve DMARC compliance via SPF with HubSpot.

Since HubSpot uses a domain of theirs as the `Envelope From` (usually a subdomain of `hubspotemail.net`) and SPF retrieves the SPF `TXT` record from that domain, you don't need to allow HubSpot in the SPF record of your domain.

While HubSpot still [says](https://knowledge.hubspot.com/marketing-email/overview-of-email-authentication?hubs_content=knowledge.hubspot.com/marketing-email/manage-email-authentication-in-hubspot&hubs_content-cta=this%20article#guide-to-spf) that it's «highly recommended» to add the SPF record anyway, there's no technical reason to do that: if anything, this will increase the risk of reaching the limit of 10 DNS lookups.

<p class="inline-block border border-slate-200 dark:border-slate-700 px-3 py-0.5 rounded-md font-mono text-base font-semibold">With dedicated IP</p>

**If you set up a dedicated IP** (contact sales for pricing), HubSpot will send emails using a subdomain of your custom domain as the `Envelope From`, therefore allowing SPF alignment.

In this case, you will be provided with a domain-specific SPF record during the setup process of the dedicated IP.

As the HubSpot documentation says, most customers set up an `Envelope From` that looks like `12345m.[example.com]`, while still sending emails from the `@[example.com]` domain (this has implications on the DMARC alignment mode, see below for more details).

[Source](https://knowledge.hubspot.com/marketing-email/manage-email-authentication-in-hubspot?hubs_content=knowledge.hubspot.com/it/marketing-email/manage-email-authentication-in-hubspot&hubs_content-cta=English) • [Source/2](https://knowledge.hubspot.com/marketing-email/understand-email-sending-in-hubspot)

</Block>

<Block title="DKIM">

HubSpot supports DMARC compliance via DKIM, by supporting custom DKIM signatures.

You can find the required records to set up DKIM in **Settings** → **Content** → **Domains & URLs**.

After choosing your domain, you will see two `CNAME` records. These records are specific to your domain.

[Source](https://knowledge.hubspot.com/marketing-email/manage-email-authentication-in-hubspot?hubs_content=knowledge.hubspot.com/it/marketing-email/manage-email-authentication-in-hubspot&hubs_content-cta=English)

</Block>

<Block title="DMARC">

There are two situations:

- **If you're not using a dedicated IP**, HubSpot supports DMARC compliance via **DKIM only**.
- **If you are using a dedicated IP**, HubSpot supports DMARC compliance on **both SPF and DKIM**.

Set up DMARC to:

- Receive email delivery reports to identify and fix authentication issues and find out who's sending from your domain.
- Choose the action to apply when both SPF and DKIM are not aligned with your sender domain, blocking abuse attempts.

Use a DMARC monitoring tool like [DMARCwise](https://dmarcwise.io) to simplify compliance and detect issues before they affect your domain reputation.

Here's an example of a DMARC record, to be created as a `TXT` record on `_dmarc.[example.com]`:

```
v=DMARC1; p=none; rua=mailto:[...];
```

You may later strengthen the policy and change the alignment mode, but remember that in HubSpot:

- If you're not using a dedicated IP you won't be able to reach SPF alignment.
- If you're using a dedicated IP:
  - If you send emails from `@[example.com]` or even `@[news.example.com]` but your `Envelope From` domain is different, like `12345m.[example.com]`, **you cannot use the strict SPF alignment mode**.
  - If you send emails from `@[news.example.com]` and your `Envelope From` domain is also `@[news.example.com]`, **you may use strict SPF alignment**.
- The DKIM signature domain should always match your sender domain exactly, so **you may use strict DKIM alignment**.

Make sure you also consider other sending sources unrelated to HubSpot.

Here's an example of a DMARC record with a strengthened policy and strict alignment on both SPF and DKIM:

```
v=DMARC1; p=reject; rua=mailto:[...]; aspf=s; adkim=s;
```

[Guide to DMARC compliance](https://dmarcwise.io/docs/guide-to-dmarc-compliance)

</Block>
