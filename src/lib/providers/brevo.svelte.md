---
name: Brevo
slug: brevo
logo: brevo.jpg
type: marketing
spfAlignment: true
dkim: true
dkimAlignment: true
updated: 2024-10-05
---

<script>
  import DotsBadge from '$lib/mdsvex/dots-badge.svelte';
</script>
<Block title="SPF">

Brevo is capable of sending SPF-aligned emails, meaning that they use your domain name in the `Envelope From` (or `Return-Path`) of email messages.

This makes it possible to achieve DMARC compliance via SPF.

You don't need to create a `TXT` SPF record on your domain, since Brevo takes care of it for you.

Follow the domain setup instructions to delegate a "branded subdomain" to Brevo, so they can host the SPF record for you. SPF verifiers look for the SPF record on this domain.

Since the branded subdomain is pointed to Brevo, the SPF record will be hosted and managed by them.

[Source](https://help.brevo.com/hc/en-us/articles/35337929909778-Set-up-your-domain-in-Brevo)

</Block>

<Block title="DKIM">

Brevo supports DMARC compliance via DKIM, thanks to custom DKIM signatures.

To set up Brevo DKIM on your domain, follow the domain setup instructions, which will ask you to delegate a "branded subdomain" to Brevo, so they can host the DKIM record for you. DKIM verifiers look for the DKIM record on this domain.

Since the branded subdomain is pointed to Brevo, the DKIM record will be hosted and managed by them.

[Source](https://help.brevo.com/hc/en-us/articles/35337929909778-Set-up-your-domain-in-Brevo)

</Block>

<Block title="DMARC">

Brevo supports DMARC compliance via **both SPF and DKIM**.

Set up DMARC to:

- Receive email delivery reports to identify and fix authentication issues and find out who's sending from your domain.
- Choose the action to apply when both SPF and DKIM are not aligned with your sender domain, blocking abuse attempts.

Use a DMARC monitoring tool like [DMARCwise](https://dmarcwise.io) to simplify compliance and detect issues before they affect your domain reputation.

Here's an example of a DMARC record, to be created as a `TXT` record on `_dmarc.[example.com]`:

```
v=DMARC1; p=none; rua=mailto:[...];
```

You may later strengthen the policy and change the alignment mode, but make sure your email setup allows so by reviewing the DMARC reports.

For example, if you use a branded subdomain entirely dedicated to Brevo (and emails are sent from an address on that domain), you'll be able to set strict alignment mode on both SPF and DKIM.

```
v=DMARC1; p=reject; rua=mailto:[...]; aspf=s; adkim=s;
```

[Guide to DMARC compliance](https://dmarcwise.io/docs/guide-to-dmarc-compliance)

</Block>
