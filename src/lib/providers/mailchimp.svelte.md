---
name: Mailchimp
slug: mailchimp
logo: mailchimp.jpg
type: marketing
spfAlignment: partial
dkim: true
dkimAlignment: true
updated: 2024-10-05
---

<script>
  import DotsBadge from '$lib/mdsvex/dots-badge.svelte';
</script>

<Block title="SPF">

### Without dedicated IP

By default, Mailchimp is **not capable** of sending SPF-aligned emails, meaning that Mailchimp mail servers won't use your domain name in the `Envelope From` (or `Return-Path`) of email messages.

In this situation it's not possible to achieve DMARC compliance via SPF with Mailchimp.

Since Mailchimp uses a domain of theirs as the `Envelope From` (usually a subdomain of `mcsv.net`, `mcdlv.net` or `rsgsv.net`) and SPF retrieves the SPF `TXT` record from that domain, you don't need to allow Mailchimp in the SPF record of your domain.

While you may find guides and resources telling you to add `include:servers.mcsv.net` to your SPF record, there's no technical reason to do that: if anything, this will increase the risk of reaching the limit of 10 DNS lookups.

[Source](https://mailchimp.com/help/my-campaign-from-name-shows-mcsvnet/)

### With dedicated IP

Mailchimp is capable of sending SPF-aligned emails when a dedicated IP is configured. Contact Mailchimp's support for more information, as there is no public documentation about this.

</Block>

<Block title="DKIM">

Mailchimp supports DMARC compliance via DKIM, thanks to custom DKIM signatures.

To set up Mailchimp DKIM on your domain, follow these instructions:

- Go to the [Domains](https://admin.mailchimp.com/account/domains/) page of your **Account & billing** settings.
- Click **Start Authentication** next to your domain name.
- Follow the steps and you will be provided with two `CNAME` DNS records for the DKIM keys. They should look like this:

| Type    | Host                          | Value            |
| ------- | ----------------------------- | ---------------- |
| `CNAME` | `k2._domainkey.[example.com]` | `dkim2.mcsv.net` |
| `CNAME` | `k3._domainkey.[example.com]` | `dkim3.mcsv.net` |

- Continue to complete the process.

Note that these records may slightly differ based on your account, so make sure you check the correct configuration on Mailchimp.

[Source](https://mailchimp.com/help/set-up-email-domain-authentication/)

</Block>

<Block title="DMARC">

Brevo supports DMARC compliance via **DKIM only**.

Set up DMARC to:

- Receive email delivery reports to identify and fix authentication issues and find out who's sending from your domain.
- Choose the action to apply when both SPF and DKIM are not aligned with your sender domain, blocking abuse attempts.

Use a DMARC monitoring tool like [DMARCwise](https://dmarcwise.io) to simplify compliance and detect issues before they affect your domain reputation.

Here's an example of a DMARC record, to be created as a `TXT` record on `_dmarc.[example.com]`:

```
v=DMARC1; p=none; rua=mailto:[...];
```

You may later strengthen the policy and change the alignment mode, but keep in mind that Mailchimp supports DMARC compliance only through DKIM alignment.

Here's an example of a DMARC record with a strengthened policy and strict alignment on DKIM:

```
v=DMARC1; p=reject; rua=mailto:[...]; adkim=s;
```

(`aspf=s;` for relaxed SPF alignment is implied if left out.)

[Guide to DMARC compliance](https://dmarcwise.io/docs/guide-to-dmarc-compliance)

</Block>
