---
name: Salesforce
slug: salesforce
logo: salesforce.png
type: marketing
spfAlignment: partial
dkim: true
dkimAlignment: true
updated: 2025-08-27
---

<script>
  import DotsBadge from '$lib/mdsvex/dots-badge.svelte';
</script>
<Block title="SPF">

### With Bounce Management/Email Security Compliance enabled

By default, emails sent by Salesforce are not SPF-aligned. Outgoing emails will use a *Variable Envelope Return Path* in the format `sampleemail=salesforce.com__abc123@abc123.bnc.salesforce.com`, causing SPF to be unaligned with your sender domain.

### Without Bounce Management/Email Security Compliance

To achieve SPF alignment with Salesforce, you need to disable both the **Bounce Management** and **Email Security Compliance** features. To do so, follow these steps in the Lightning Experience:

- Navigate to Salesforce setup settings.
- Choose **Email** → **Deliverability**.
- Untick the checkbox for **Activate bounce management**.
- Untick the checkbox for **Enable compliance with standard email security mechanisms**.

With these options disabled, Salesforce will use your domain name in the `Envelope From` (or `Return-Path`) of email messages. This makes it possible to achieve DMARC compliance via SPF.

Finally, create the following SPF `TXT` record on your domain:

```
v=spf1 include:_spf.salesforce.com ~all
```

[Source](https://help.salesforce.com/s/articleView?id=000381292&type=1)

</Block>

<Block title="DKIM">

Salesforce supports custom DKIM signatures domains. This makes it possible to achieve DMARC compliance via DKIM.

To create a custom DKIM key, [follow the official guide](https://help.salesforce.com/s/articleView?id=sales.emailadmin_create_secure_dkim.htm&type=5).

</Block>

<Block title="DMARC">

Salesforce supports DMARC compliance via both SPF and DKIM, even with strict alignment.

Set up DMARC to:

- Receive email delivery reports to identify and fix authentication issues and find out who's sending from your domain.
- Choose the action to apply when both SPF and DKIM are not aligned with your sender domain, blocking abuse attempts.

Use a DMARC monitoring tool like [DMARCwise](https://dmarcwise.io) to simplify compliance and detect issues before they affect your domain reputation.

Here's an example of a DMARC record, to be created as a `TXT` record on `_dmarc.[example.com]`:

```
v=DMARC1; p=none; rua=mailto:[...];
```

Salesforce allows setting strict alignment on both SPF and DKIM, so you may later strengthen the policy and change the alignment mode:

```
v=DMARC1; p=reject; rua=mailto:[...]; aspf=s; adkim=s;
```

[Guide to DMARC compliance](https://dmarcwise.io/docs/guide-to-dmarc-compliance)

</Block>
