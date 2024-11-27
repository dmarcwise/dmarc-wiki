---
name: SendGrid
slug: sendgrid
logo: sendgrid.png
type: marketing
spfAlignment: true
dkim: true
dkimAlignment: true
updated: 2024-10-10
---

<script>
  import DotsBadge from '$lib/mdsvex/dots-badge.svelte';
</script>
<Block title="SPF">

### With automated security

When you authenticate a new domain in SendGrid the "automated security" feature will be enabled by default.

In this case, SendGrid will use your domain name in the `Envelope From` (or `Return-Path`), making it possible to achieve DMARC compliance via SPF.

During the setup process you will be provided with three `CNAME` DNS records:

- A `CNAME` for the subdomain that will be used as the `Envelope From` domain. This will make sure that email bounces are received and processed by SendGrid. It looks like `em0000.example.com` and is different for each domain that you set up.
- Two `CNAME` records for the DKIM keys. These usually look like `s1._domainkey.example.com` and `s2._domainkey.example.com`.

You don't need to create an SPF record, as SPF is checked on the `Envelope From` domain, which SendGrid will manage for you.

### Without automated security

If you disable the "automated security" feature, SendGrid will provide you with an `MX` record, an SPF record and a `TXT` record for DKIM.

Unless you have specific requirements, leave "automated security" on: this will make sure that DKIM keys are automatically rotated and you'll still be able to achieve full DMARC compliance.

[Source](https://www.twilio.com/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication)

</Block>

<Block title="DKIM">

SendGrid supports custom DKIM signatures domains. This makes it possible to achieve DMARC compliance via DKIM.

Follow the authentication process and create the `CNAME` (or `TXT`) records for the DKIM keys.

[Source](https://www.twilio.com/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication)

</Block>

<Block title="DMARC">

SendGrid supports DMARC compliance via both SPF and DKIM, with strict alignment on DKIM but only relaxed alignment on SPF.

Set up DMARC to:

- Receive email delivery reports to identify and fix authentication issues and find out who's sending from your domain.
- Choose the action to apply when both SPF and DKIM are not aligned with your sender domain, blocking abuse attempts.

Use a DMARC monitoring tool like [DMARCwise](https://dmarcwise.io) to simplify compliance and detect issues before they affect your domain reputation.

Here's an example of a DMARC record, to be created as a `TXT` record on `_dmarc.[example.com]`:

```
v=DMARC1; p=none; rua=mailto:[...];
```

You may later strengthen the policy and change the alignment mode, but remember that in SendGrid:

- The SPF domain is a subdomain of your sender domain, so **you cannot use the strict SPF alignment mode**.
- The DKIM signature domain would instead match your sender domain exactly, so **you may use strict DKIM alignment**.

```
v=DMARC1; p=reject; rua=mailto:[...]; adkim=s;
```

(`aspf=r;` for relaxed SPF is implied if left out.)

[Guide to DMARC compliance](https://dmarcwise.io/docs/guide-to-dmarc-compliance)

</Block>
