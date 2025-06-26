---
name: Google Workspace
slug: google-workspace
logo: google.png
type: hosting
spfAlignment: partial
dkim: true
dkimAlignment: true
updated: 2025-06-26
---

<script>
  import DotsBadge from '$lib/mdsvex/dots-badge.svelte';
</script>

<Block title="SPF">

### With sending from alias domains

**If you send from an alias domain**, Google Workspace is **not capable** of sending SPF-aligned emails, meaning that their mail servers won't use your alias domain name in the `Envelope From` (or `Return-Path`) of email messages.

In this situation it's not possible to achieve DMARC compliance via SPF with Google Workspace.

Since Google Workspace uses your configured primary domain as the `Envelope From` and SPF retrieves the SPF `TXT` record from that domain, **you don't need to include Google Workspace in the SPF record** of your domain. The domain used as the as the `Envelope From` is **not configurable**, and Google refuses to see this as an issue since DMARC compliance can still be achieved via DKIM, but some users have reported that specific mail providers have blocked their mail due to this misalignment.

Sources: [\[1\]](https://support.google.com/a/thread/69536504/spf-alignment-when-sending-from-a-domain-alias) [\[2\]](https://www.youtube.com/watch?v=fi1xwO9zApo) [\[3\]](https://old.reddit.com/r/DMARC/comments/1i23w1l/help_requested_looking_for_an_actual_dmarc_expert/)

### Without sending from alias domains

Google Workspace is capable of sending SPF-aligned emails, meaning that they use your domain name in the `Envelope From` (or `Return-Path`) of email messages.

This makes it possible to achieve DMARC compliance via SPF.

To allow Google servers to send emails from your domain, create the following **TXT** record:

```
v=spf1 include:_spf.google.com ~all
```

We recommend using the `~all` directive instead of `-all`. Learn more in the link below.

[Source](https://support.google.com/a/answer/33786) • [Learn more about `~all`](https://dmarcwise.io/learn/email/spf/setup)

</Block>

<Block title="DKIM">

Google Workspace supports custom DKIM signatures domains. This makes it possible to achieve DMARC compliance via DKIM.

To set up Google Workspace DKIM on your domain, follow these instructions:

- Navigate to the [Google Admin console](https://admin.google.com).
- In the sidebar menu, go to Apps → Google Workspace → Gmail.
- Scroll down and click **Authenticate email**.
- Click the **Generate new record** button, then choose `2048` as the DKIM key length. You can leave the DKIM selector set to `google`.
- Click **Generate** to proceed.

- You will now need to create a `TXT` record on your domain, with the values shown in the admin console:

| Type  | Host                              | Value                          |
| ----- | --------------------------------- | ------------------------------ |
| `TXT` | `google._domainkey.[example.com]` | As shown in the admin console. |

- After creating the record, go back to the admin console and click **Start authentication**.

[Source](https://support.google.com/a/answer/174124)

</Block>

<Block title="DMARC">

Google Workspace supports DMARC compliance via both SPF and DKIM, even with strict alignment.

Set up DMARC to:

- Receive email delivery reports to identify and fix authentication issues and find out who's sending from your domain.
- Choose the action to apply when both SPF and DKIM are not aligned with your sender domain, blocking abuse attempts.

Use a DMARC monitoring tool like [DMARCwise](https://dmarcwise.io) to simplify compliance and detect issues before they affect your domain reputation.

Here's an example of a DMARC record, to be created as a `TXT` record on `_dmarc.[example.com]`:

```
v=DMARC1; p=none; rua=mailto:[...];
```

Google Workspace allows setting strict alignment on both SPF and DKIM, so you may later strengthen the policy and change the alignment mode:

```
v=DMARC1; p=reject; rua=mailto:[...]; aspf=s; adkim=s;
```

[Guide to DMARC compliance](https://dmarcwise.io/docs/guide-to-dmarc-compliance)

</Block>
