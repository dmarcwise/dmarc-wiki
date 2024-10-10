---
name: Amazon SES
slug: ses
logo: ses.png
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

### Without custom MAIL FROM

[By default](https://docs.aws.amazon.com/ses/latest/dg/send-email-authentication-spf.html), emails sent through Amazon SES are not SPF-aligned. Outgoing emails will use the domain `amazonses.com` as the `Envelope From` (also known as `MAIL FROM` or `Return-Path`), causing SPF to be unaligned with your sender domain.

### With custom MAIL FROM

If you enable the feature called **Custom MAIL FROM domain**, Amazon SES will use your domain in the `Envelope From`. This makes it possible to achieve DMARC compliance via SPF.

To make sure your SES emails are SPF-aligned, enable the **Custom MAIL FROM domain** feature in your domain identity.

When enabling it, you will be asked to choose a subdomain of your sending domain to use in the `MAIL FROM` address. You can use something like `email` or `newsletter`, for example. This domain will not be visible to end users, unless they go look at the email message headers.

When enabling the **Custom MAIL FROM domain** feature, you will be required to create the following DNS records on your domain. Here's an example assuming you chose `email` as the `MAIL FROM` subdomain:

| Type  | Host                  | Value                                       |
| ----- | --------------------- | ------------------------------------------- |
| `MX`  | `email.[example.com]` | ` 10 feedback-smtp.[region].amazonses.com ` |
| `TXT` | `email.[example.com]` | `v=spf1 include:amazonses.com ~all`         |

The `MX` record is used to ensure that Amazon SES can receive and process email bounces. The `TXT` record is the SPF record.

Don't forget to replace the region with your Amazon SES region.

If you haven't set up the **custom MAIL FROM** when you added the domain to SES, here's how to do it:

- Navigate to the [Identities](https://eu-central-1.console.aws.amazon.com/ses/home?region=eu-central-1#/identities) page of the AWS dashboard and choose your domain from the list.
- Scroll down to **Custom MAIL FROM domain** and click **Edit**.
- Check the box **Use a custom MAIL FROM domain**.
- Type in a subdomain, as discussed above, and save the changes.
- Create the DNS records as instructed.

[Source](https://docs.aws.amazon.com/ses/latest/dg/mail-from.html)

</Block>

<Block title="DKIM">

Amazon SES supports custom DKIM signatures domains. This makes it possible to achieve DMARC compliance via DKIM.

To set up Amazon SES DKIM on your domain, follow these instructions:

- Navigate to the [Identities](https://eu-central-1.console.aws.amazon.com/ses/home?region=eu-central-1#/identities) page of the AWS dashboard and choose your domain from the list.
- Scroll down to **DomainKeys Identified Mail (DKIM)** and click **Edit**.
- Choose **Easy DKIM** and `RSA_2048_BIT`, unless you have specific requirements, and check the **Enabled** box, then save the changes.
- You will be provided with 3 DNS records of type `CNAME` . These records are different for each customer/domain. Create the DNS records to complete the DKIM signing setup.

Amazon SES also supports bringing your own DKIM keys, if you have special security requirements.

[Source](https://docs.aws.amazon.com/ses/latest/dg/send-email-authentication-dkim-easy.html)

</Block>

<Block title="DMARC">

Amazon SES supports DMARC compliance via both SPF and DKIM, with strict alignment on DKIM but only relaxed alignment on SPF.

Set up DMARC to:

- Receive email delivery reports to identify and fix authentication issues and find out who's sending from your domain.
- Choose the action to apply when both SPF and DKIM are not aligned with your sender domain, blocking abuse attempts.

Use a DMARC monitoring tool like [DMARCwise](https://dmarcwise.io) to simplify compliance and detect issues before they affect your domain reputation.

Here's an example of a DMARC record, to be created as a `TXT` record on `_dmarc.[example.com]`:

```
v=DMARC1; p=none; rua=mailto:[...];
```

You may later strengthen the policy and change the alignment mode, but remember that in Amazon SES:

- The SPF domain is a subdomain of your sender domain, so **you cannot use the strict SPF alignment mode**.
- The DKIM signature domain would instead match your sender domain exactly, so **you may use strict DKIM alignment**.

```
v=DMARC1; p=reject; rua=mailto:[...]; adkim=s;
```

(`aspf=r;` for relaxed SPF is implied if left out.)

[Source](https://docs.aws.amazon.com/ses/latest/dg/send-email-authentication-dmarc.html) • [Guide to DMARC compliance](https://dmarcwise.io/docs/guide-to-dmarc-compliance)

</Block>
