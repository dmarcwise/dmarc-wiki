---
name: EmailOctopus
slug: emailoctopus
logo: emailoctopus.png
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

EmailOctopus is capable of sending SPF-aligned emails, meaning that they use your domain name in the `Envelope From` (or `Return-Path`) of email messages.

This makes it possible to achieve DMARC compliance via SPF.

You don't need to create a `TXT` SPF record on your domain, since EmailOctopus takes care of it for you.

In fact, EmailOctopus uses a subdomain like `eom.[example.com]` in the `Envelope From`, and SPF verifiers look for the SPF record on this domain.

Since the `eom.[example.com]` subdomain is pointed to EmailOctopus with a `CNAME` record during the [verification process](https://emailoctopus.com/account/senders), the SPF record will be managed by them.

[Source](https://help.emailoctopus.com/article/160-verifying-a-new-domain)

</Block>

<Block title="DKIM">

EmailOctopus supports custom DKIM signatures domains. This makes it possible to achieve DMARC compliance via DKIM.

To set up EmailOctopus DKIM on your domain, create a `CNAME` record as instructed during the [sender verification process](https://emailoctopus.com/account/senders):

| Type    | Host                          | Value                        |
| ------- | ----------------------------- | ---------------------------- |
| `CNAME` | `eo._domainkey.[example.com]` | As provided by EmailOctopus. |

[Source](https://help.emailoctopus.com/article/160-verifying-a-new-domain)

</Block>

<Block title="DMARC">

EmailOctopus supports DMARC compliance via both SPF and DKIM, with strict alignment on DKIM but only relaxed alignment on SPF.

Set up DMARC to:

- Receive email delivery reports to identify and fix authentication issues and find out who's sending from your domain.
- Choose the action to apply when both SPF and DKIM are not aligned with your sender domain, blocking abuse attempts.

Use a DMARC monitoring tool like [DMARCwise](https://dmarcwise.io) to simplify compliance and detect issues before they affect your domain reputation.

Here's an example of a DMARC record, to be created as a `TXT` record on `_dmarc.[example.com]`:

```
v=DMARC1; p=none; rua=mailto:[...];
```

You may later strengthen the policy and change the alignment mode, but remember that in EmailOctopus:

- The SPF domain is a subdomain of your sender domain, so **you cannot use the strict SPF alignment mode**.
- The DKIM signature domain would instead match your sender domain exactly, so **you may use strict DKIM alignment**.

```
v=DMARC1; p=reject; rua=mailto:[...]; adkim=s;
```

(`aspf=r;` for relaxed SPF is implied if left out.)

[Guide to DMARC compliance](https://dmarcwise.io/docs/guide-to-dmarc-compliance)

</Block>
