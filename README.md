# NodeJS Instagram private API client

# Install

From npm

```
npm install instagram-private-api
```

From github

```
npm install github:dilame/instagram-private-api
```

This package uses [`url-regex-safe`](https://www.npmjs.com/package/url-regex-safe) ([GitHub](https://github.com/spamscanner/url-regex-safe)) to check for links when sending direct messages.
By default, the **safe** regex engine [`re2`](https://github.com/uhop/node-re2) is **not** installed.
⚠ It's highly recommended for you to install `re2` by running `npm install re2`, else you _will_ be vulnerable to [CVE-2020-7661](https://nvd.nist.gov/vuln/detail/CVE-2020-7661).

