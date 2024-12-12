---
name: SMTP2GO
slug: smtp2go
logo: smtp2go.png
type: marketing
spfAlignment: true
dkim: true
dkimAlignment: true
updated: 2024-12-12
---

<script>
  import DotsBadge from '$lib/mdsvex/dots-badge.svelte';
</script>
<Block title="SPF">

SMTP2GO is capable of sending SPF-aligned emails, meaning that they use your domain name in the `Envelope From` (or `Return-Path`) of email messages.

This makes it possible to achieve DMARC compliance via SPF.

You don't need to create a `TXT` SPF record on your domain, since SMTP2GO takes care of it for you.

In fact, SMTP2GO uses a subdomain like `em0000000.[example.com]` in the `Envelope From`, and SPF verifiers look for the SPF record on this domain.

Since the `em0000000.[example.com]` subdomain is pointed to SMTP2GO with a `CNAME` record during the verification process, the SPF record will be managed by them.

[Source](https://support.smtp2go.com/hc/en-gb/articles/115004408567-Verified-Senders)

</Block>

<Block title="DKIM">

SMTP2GO supports custom DKIM signatures domains. This makes it possible to achieve DMARC compliance via DKIM.

Follow the authentication process and create the `CNAME` record for the DKIM key.

[Source](https://support.smtp2go.com/hc/en-gb/articles/115004408567-Verified-Senders)

</Block>

<Block title="DMARC">

SMTP2GO supports DMARC compliance via both SPF and DKIM, with strict alignment on DKIM but only relaxed alignment on SPF.

Set up DMARC to:

- Receive email delivery reports to identify and fix authentication issues and find out who's sending from your domain.
- Choose the action to apply when both SPF and DKIM are not aligned with your sender domain, blocking abuse attempts.

Use a DMARC monitoring tool like [DMARCwise](https://dmarcwise.io) to simplify compliance and detect issues before they affect your domain reputation.

Here's an example of a DMARC record, to be created as a `TXT` record on `_dmarc.[example.com]`:

```
v=DMARC1; p=none; rua=mailto:[...];
```

You may later strengthen the policy and change the alignment mode, but remember that in SMTP2GO:

- The SPF domain is a subdomain of your sender domain, so **you cannot use the strict SPF alignment mode**.
- The DKIM signature domain would instead match your sender domain exactly, so **you may use strict DKIM alignment**.

```
v=DMARC1; p=reject; rua=mailto:[...]; adkim=s;
```

(`aspf=r;` for relaxed SPF is implied if left out.)

[Guide to DMARC compliance](https://dmarcwise.io/docs/guide-to-dmarc-compliance)

</Block>
