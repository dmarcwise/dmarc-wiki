---
name: Brevo
slug: brevo
logo: brevo.jpg
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

**If you don't have a dedicated IP**, Brevo is **not capable** of sending SPF-aligned emails, meaning that their mail servers won't use your domain name in the `Envelope From` (or `Return-Path`) of email messages.

In this situation it's not possible to achieve DMARC compliance via SPF with Brevo.

Since Brevo uses a domain of theirs as the `Envelope From` (often a subdomain of `sender-sib.com`) and SPF retrieves the SPF `TXT` record from that domain, **you don't need to include Brevo in the SPF record** of your domain. In most cases, doing it anyway shouldn't hurt, but you increase the risk of reaching the limit of 10 DNS lookups.

### With dedicated IP

**If you set up a dedicated IP** ($251 / year), Brevo will send emails using a subdomain of your custom domain as the `Envelope From`, therefore allowing SPF alignment.

[Source](https://help.brevo.com/hc/en-us/articles/115000240344-Set-up-your-dedicated-IP-in-Brevo)

</Block>

<Block title="DKIM">

Brevo supports DMARC compliance via DKIM, by supporting custom DKIM signatures.

To set up Brevo DKIM on your domain, follow these instructions:

- Go to the [Domains](https://app.brevo.com/senders/domain/list) settings page.
- Locate your domain in the domains list and click **Authenticate**.
- You have two options:
  - **Authenticate the domain automatically**, in which case you'll be asked for the credentials of your nameserver provider to create the record automatically.
  - **Authenticate the domain yourself**, in which case you'll be provided with a list of DNS records to be manually added to your domain.
- By choosing the second option you will be shown the DKIM DNS record configuration, which should look like this:

| Type  | Host                            | Value                       |
| ----- | ------------------------------- | --------------------------- |
| `TXT` | `mail._domainkey.[example.com]` | As shown in Brevo settings. |

- After creating the required records, click **Authenticate this email domain** to complete the process.

By default Brevo creates DKIM keys with a length of 1024 bits. You can request the use of a more secure 2048-bit key by contacting Brevo support.

[Source](https://help.brevo.com/hc/en-us/articles/12163873383186-Authenticate-your-domain-with-Brevo-Brevo-code-DKIM-record-DMARC-record)

</Block>

<Block title="DMARC">

There are two situations:

- **If you're not using a dedicated IP**, Brevo supports DMARC compliance via **DKIM only**.
- **If you are using a dedicated IP**, Brevo supports DMARC compliance on **both SPF and DKIM**.

Set up DMARC to:

- Receive email delivery reports to identify and fix authentication issues and find out who's sending from your domain.
- Choose the action to apply when both SPF and DKIM are not aligned with your sender domain, blocking abuse attempts.

Use a DMARC monitoring tool like [DMARCwise](https://dmarcwise.io) to simplify compliance and detect issues before they affect your domain reputation.

Here's an example of a DMARC record, to be created as a `TXT` record on `_dmarc.[example.com]`:

```
v=DMARC1; p=none; rua=mailto:[...];
```

You may later strengthen the policy and change the alignment mode, but make sure your email setup allows so by reviewing the DMARC reports.

For example, if you use a dedicated IP with an entire subdomain dedicated to Brevo only (and emails sent from an address on that domain), you'll be able to set strict alignment mode on both SPF and DKIM.

```
v=DMARC1; p=reject; rua=mailto:[...]; aspf=s; adkim=s;
```

[Guide to DMARC compliance](https://dmarcwise.io/docs/guide-to-dmarc-compliance)

</Block>
