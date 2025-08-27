---
name: Lettermint
slug: lettermint
logo: lettermint.png
type: marketing
spfAlignment: true
dkim: true
dkimAlignment: true
updated: 2025-08-27
---

<script>
  import DotsBadge from '$lib/mdsvex/dots-badge.svelte';
</script>
<Block title="SPF">

Lettermint is capable of sending SPF-aligned emails, meaning that they use your domain name in the `Envelope From` (or `Return-Path`) of email messages.

This makes it possible to achieve DMARC compliance via SPF.

You don't need to create a `TXT` SPF record on your domain, since Lettermint takes care of it for you.

In fact, Lettermint uses a subdomain like `lm-bounces.[example.com]` in the `Envelope From`, and SPF verifiers look for the SPF record on this domain.

Since the `lm-bounces.[example.com]` subdomain is pointed to Lettermint with a `CNAME` record during the verification process, the SPF record will be managed by them.

[Source](https://docs.lettermint.co/platform/domains/spf)

</Block>

<Block title="DKIM">

Lettermint supports custom DKIM signatures domains. This makes it possible to achieve DMARC compliance via DKIM.

Follow the domain verification process and create the `TXT` record for the DKIM key when asked.

[Source](https://docs.lettermint.co/platform/domains/introduction)

</Block>

<Block title="DMARC">

Lettermint supports DMARC compliance via both SPF and DKIM, with strict alignment on DKIM but only relaxed alignment on SPF.

Set up DMARC to:

- Receive email delivery reports to identify and fix authentication issues and find out who's sending from your domain.
- Choose the action to apply when both SPF and DKIM are not aligned with your sender domain, blocking abuse attempts.

Use a DMARC monitoring tool like [DMARCwise](https://dmarcwise.io) to simplify compliance and detect issues before they affect your domain reputation.

Here's an example of a DMARC record, to be created as a `TXT` record on `_dmarc.[example.com]`:

```
v=DMARC1; p=none; rua=mailto:[...];
```

You may later strengthen the policy and change the alignment mode, but remember that in Lettermint:

- The SPF domain is a subdomain of your sender domain, so **you cannot use the strict SPF alignment mode**.
- The DKIM signature domain would instead match your sender domain exactly, so **you may use strict DKIM alignment**.

```
v=DMARC1; p=reject; rua=mailto:[...]; adkim=s;
```

(`aspf=r;` for relaxed SPF is implied if left out.)

[Guide to DMARC compliance](https://dmarcwise.io/docs/guide-to-dmarc-compliance)

</Block>
