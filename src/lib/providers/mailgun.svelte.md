---
name: Mailgun
slug: mailgun
logo: mailgun.png
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

Mailgun is capable of sending SPF-aligned emails. Outgoing emails will always use your domain name in the `Envelope From` (or `Return-Path`) of email messages.

This makes it possible to achieve DMARC compliance via SPF.

### Without automatic sender security

To allow Mailgun servers to send emails from your domain, create the following SPF `TXT` record :

```
v=spf1 include:mailgun.org ~all
```

You will also need to create `MX` records so that bounces are received and processed by Mailgun.

The setup process with respect to SPF seems to be identical whether you enable "automatic sender security" or not.

[Source](https://help.mailgun.com/hc/en-us/articles/360026833053-Domain-Verification-Setup-Guide)

</Block>

<Block title="DKIM">

Mailgun supports custom DKIM signatures domains. This makes it possible to achieve DMARC compliance via DKIM.

During the setup process, you will be required to create `CNAME` DNS records for the DKIM keys.

Make sure you enable "automatic sender security", so that DKIM keys are periodically rotated.

[Source](https://www.twilio.com/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication)

</Block>

<Block title="DMARC">

Mailgun supports DMARC compliance via both SPF and DKIM, with strict alignment in some cases.

Set up DMARC to:

- Receive email delivery reports to identify and fix authentication issues and find out who's sending from your domain.
- Choose the action to apply when both SPF and DKIM are not aligned with your sender domain, blocking abuse attempts.

Use a DMARC monitoring tool like [DMARCwise](https://dmarcwise.io) to simplify compliance and detect issues before they affect your domain reputation.

Here's an example of a DMARC record, to be created as a `TXT` record on `_dmarc.[example.com]`:

```
v=DMARC1; p=none; rua=mailto:[...];
```

You may later strengthen the policy and change the alignment mode, but remember that in Mailgun:

- If your verified domain is a **subdomain** of your main sender domain, **you cannot use strict SPF/DKIM alignment**.
- If the verified domain and the sender domain **match**, **you can use strict SPF/DKIM alignment**.

```
v=DMARC1; p=reject; rua=mailto:[...]; aspf=r; adkim=r;
```

Change `r` to `s` to enable strict mode. Make sure you have verified that this will not cause misalignments.

[Guide to DMARC compliance](https://dmarcwise.io/docs/guide-to-dmarc-compliance)

</Block>
