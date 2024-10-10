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

MailPace handles SPF verification without any domain specific DNS records required to be set. This is due to a specific header in the email called `Return-Path`. By default, emails sent through MailPace have a return path that ends in `@mailer.mailpace.com`. If you look this domain up over DNS, you’ll find an SPF record that points to the MailPace IP ranges.

For a custom SPF record, as required to enable DMARC, follow the Advanced Verification steps within the Verification section of your Domain.

[Advanced Verification](https://docs.mailpace.com/guide/verification#advanced-verification)

[Source](https://blog.mailpace.com/blog/whats-an-spf-record/)

</Block>

<Block title="DKIM">

All emails sent through MailPace must be DKIM signed. This is a pre-requisite to setting up and verifying a Domain on MailPace.

[Source](https://docs.mailpace.com/guide/verification)

</Block>

<Block title="DMARC">

To enable DMARC to pass you need to follow MailPace's Advanced Verification, which will set up a Return-Path for your domain (e.g bounces+abc@mailer.yourdomain.com), and SPF verification against your domain directly. This involves:

1. Setting up a CNAME record.

This allows lookups for return-path, SPF records and bounce reports to pass over to a MailPace domain.

2. Publishing your DMARC policy as a TXT record

This allows you to set a DMARC Policy and control how emails from your domain should be validated.

You can find the required records and how to set them in the Advanced Verification section of your Domain at [app.mailpace.com](https://app.mailpace.com)

> Note that you must click **Verify Additional Records** to ensure that MailPace confirms your DNS records and sends emails with the correct Return-Path

[Guide to DMARC compliance](https://dmarcwise.io/docs/guide-to-dmarc-compliance)

</Block>
