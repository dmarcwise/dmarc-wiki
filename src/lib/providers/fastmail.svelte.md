---
name: Fastmail
slug: fastmail
logo: fastmail.jpg
type: hosting
spfAlignment: true
dkim: true
dkimAlignment: true
updated: 2024-10-05
---

<script>
  import Block from '$lib/block.svelte';
</script>

<Block title="SPF">

Fastmail supports SPF alignment, meaning that they use your custom domain in the `Envelope From` when sending emails.

This makes it possible to achieve DMARC alignment via SPF.

To allow Fastmail servers to send emails from your domain, create the following **TXT** record:

```
v=spf1 include:_spf.fastmail.com ~all
```

If you use the nameservers hosted by Fastmail, they will automatically create the following record:

```
v=spf1 include:_spf.fastmail.com ?all
```

It is recommended to change `?all` to `~all`, otherwise no SPF policy is applied.

[Source](https://www.fastmail.help/hc/en-us/articles/360060591153-Manual-DNS-configuration) • [Learn more about `~all`](https://dmarcwise.io/learn/email/spf/setup)

</Block>

<Block title="DKIM">

Fastmail supports custom signing domains for DKIM. This makes it possible to achieve DMARC alignment via DKIM.

To set up Fastmail DKIM on your domain, add the following three **CNAME** records, after replacing `[example.com]` with your domain name:

| Host                                 | Value                               |
| ------------------------------------ | ----------------------------------- |
| `fm1._domainkey.[example.com]` | `fm1.[example.com].dkim.fmhosted.com` |
| `fm2._domainkey.[example.com]` | `fm2.[example.com].dkim.fmhosted.com` |
| `fm3._domainkey.[example.com]` | `fm3.[example.com].dkim.fmhosted.com` |

</Block>

<Block title="DMARC">

TODO

</Block>
