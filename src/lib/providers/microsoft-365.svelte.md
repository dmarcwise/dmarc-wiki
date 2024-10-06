---
name: Microsoft 365
slug: microsoft-365
logo: microsoft365.png
type: hosting
spfAlignment: true
dkim: true
dkimAlignment: true
updated: 2024-10-05
---

<script>
  import DotsBadge from '$lib/mdsvex/dots-badge.svelte';
</script>

<Block title="SPF">

Microsoft 365 is capable of sending SPF-aligned emails, meaning that they use your domain name in the `Envelope From` (or `Return-Path`) of email messages.

This makes it possible to achieve DMARC compliance via SPF.

To allow Microsoft servers to send emails from your domain, create the following **TXT** record:

```
v=spf1 include:spf.protection.outlook.com ~all
```

Microsoft may suggest the use of the `-all` directive instead of `~all`. However, the most recent industry best practices recommend the use of `~all`; you can learn more about this in the link below.

If you're using a different product than Microsoft 365 (government cloud, etc.), refer to the link below for the correct instructions.

[Source](https://learn.microsoft.com/en-us/defender-office-365/email-authentication-spf-configure) • [Learn more about `~all`](https://dmarcwise.io/learn/email/spf/setup)

</Block>

<Block title="DKIM">

Microsoft 365 supports custom DKIM signatures domains. This makes it possible to achieve DMARC compliance via DKIM.

To set up Microsoft 365 DKIM on your domain, follow these instructions:

- Navigate to [Email authentication settings](https://security.microsoft.com/authentication) in the Microsoft Defender portal.
- Find the row corresponding to your domain (i.e. `[example.com]`, not `[example].onmicrosoft.com`) and click on it.
- Click on the toggle below **Sign messages for this domain with DKIM signatures**.
- You will now need to create two `CNAME` records on your domain, with the values shown in the dialog that opens:

| Host                                 | Value                            |
| ------------------------------------ | -------------------------------- |
| `selector1._domainkey.[example.com]` | As shown in the Defender portal. |
| `selector2._domainkey.[example.com]` | As shown in the Defender portal. |

- (If the number of records shown in the Microsoft Defender portal doesn't match with this example, abide by the Microsoft instructions.)
- Back in the Microsoft Defender portal, close the dialog and click the **Sign messages for this domain with DKIM signatures** toggle again.
- You may receive a **Client Error**. If that's the case, click **OK** and try the previous step again in a few minutes. Don't skip this step or DKIM signing for your domain won't be enabled.

[Source](https://learn.microsoft.com/en-us/defender-office-365/email-authentication-dkim-configure)

</Block>

<Block title="DMARC">

Microsoft 365 supports DMARC compliance via both SPF and DKIM, even with strict alignment.

Set up DMARC to:

- Receive email delivery reports to identify and fix authentication issues and find out who's sending from your domain.
- Choose the action to apply in case of SPF or DKIM non-compliance, blocking abuse attempts.

Use a DMARC monitoring tool like [DMARCwise](https://dmarcwise.io) to simplify compliance and detect issues before they affect your domain reputation.

Here's an example of a DMARC record, to be created as a `TXT` record on `_dmarc.[example.com]`:

```
v=DMARC1; p=none; rua=mailto:[...];
```

Microsoft 365 allows setting strict alignment on both SPF and DKIM, so you may later strengthen the policy and change the alignment mode:

```
v=DMARC1; p=reject; rua=mailto:[...]; aspf=s; adkim=s;
```

[Guide to DMARC compliance](https://dmarcwise.io/docs/guide-to-dmarc-compliance)

</Block>
