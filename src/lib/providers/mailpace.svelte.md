---
name: MailPace
slug: mailpace
logo: mailpace.png
type: marketing
spfAlignment: true
dkim: true
dkimAlignment: true
updated: 2024-10-09
---

<script>
  import DotsBadge from '$lib/mdsvex/dots-badge.svelte';
</script>
<Block title="SPF">

### Without advanced verification

By default, emails sent through MailPace are not SPF-aligned. Outgoing emails will use the domain `mailer.mailpace.com` in the `Envelope From` (also known as  `Return-Path`), causing SPF to be unaligned with your sender domain.

### With advanced verification

If you complete the **Advanced Verification** step, MailPace will use your domain in the `Envelope From`. This makes it possible to achieve DMARC compliance via SPF.

To make sure your MailPace emails are SPF-aligned, complete the advanced verification in your domain settings.

The advanced verification process involves creating a `CNAME` record that looks like this:

| Type    | Host                   | Value                    |
| ------- | ---------------------- | ------------------------ |
| `CNAME` | `mailer.[example.com]` | As provided by MailPace. |

Since this is a `CNAME` record, MailPace will handle the SPF record for you on the target domain. You don't need to create an SPF record manually.

[Source](https://docs.mailpace.com/guide/verification#advanced-verification)

</Block>

<Block title="DKIM">

MailPace supports custom DKIM signatures domains. This makes it possible to achieve DMARC compliance via DKIM.

All emails sent through MailPace are DKIM signed. Follow the instructions provided during the verification process to set up DKIM.

[Source](https://docs.mailpace.com/guide/verification)

</Block>

<Block title="DMARC">

MailPace supports DMARC compliance via both SPF and DKIM, with strict alignment on DKIM but only relaxed alignment on SPF.

Set up DMARC to:

- Receive email delivery reports to identify and fix authentication issues and find out who's sending from your domain.
- Choose the action to apply when both SPF and DKIM are not aligned with your sender domain, blocking abuse attempts.

Use a DMARC monitoring tool like [DMARCwise](https://dmarcwise.io) to simplify compliance and detect issues before they affect your domain reputation.

Here's an example of a DMARC record, to be created as a `TXT` record on `_dmarc.[example.com]`:

```
v=DMARC1; p=none; rua=mailto:[...];
```

You may later strengthen the policy and change the alignment mode, but remember that in MailPace:

- The SPF domain is a subdomain of your sender domain, so **you cannot use the strict SPF alignment mode**.
- The DKIM signature domain would instead match your sender domain exactly, so **you may use strict DKIM alignment**.

```
v=DMARC1; p=reject; rua=mailto:[...]; adkim=s;
```

(`aspf=r;` for relaxed SPF is implied if left out.)

[Guide to DMARC compliance](https://dmarcwise.io/docs/guide-to-dmarc-compliance)

</Block>
