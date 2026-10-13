# LearnIND

LearnIND provides a ₹149 Affiliate Training enquiry, secure account login, an administrator-managed student list, and a protected training area. The site does not collect payments, verify payments, or send WhatsApp messages automatically.

## Requirements and local setup

- Node.js 20.19 or newer
- npm
- MongoDB Atlas or another reachable MongoDB deployment

```bash
npm install
```

Copy `.env.example` to `.env.local`, then set:

- `MONGODB_URI`: MongoDB connection string. In Atlas, create a database user, allow the deployment network under Network Access, and copy the connection URI. Replace its placeholders and URL-encode special characters in the database password when needed.
- `SESSION_SECRET`: a private random value of at least 32 bytes. Generate one with:

  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- `ADMIN_EMAIL`: `sudhanshushekhar8210@gmail.com`, the sole designated administrator address used by the local setup script. Admin authorization still depends on the MongoDB account's `admin` role, not an email match.

Keep `.env.local` private and out of source control. Start the development server:

```bash
npm run dev
```

The app reads `.env.local` from the project root. Restart `npm run dev` after changing it. The admin setup and diagnostic commands also load that same file and use the same `MONGODB_URI`.

To inspect the configured administrator without changing the database, run:

```bash
npm run check-admin
```

It prints only whether the account exists, its role, and whether a password hash is present. It never prints the URI, password, or hash.

## Initialize the administrator (one time)

After configuring `.env.local` and MongoDB, run:

```bash
npm run setup-admin
```

The terminal asks you to type the exact email configured in `ADMIN_EMAIL`. It then:

- Creates that exact account with role `admin` if it does not exist. You must explicitly type `CREATE`.
- If that exact email already has a non-admin account, asks you to type `PROMOTE` and replaces that account's password with the new password you enter. This deliberately does not silently promote an account.
- If that exact email already has the admin role, asks you to type `RESET` before replacing its password, providing a secure recovery path for a forgotten or mismatched password.
- Requires the new password twice; the password is masked and must be 16–72 UTF-8 bytes with uppercase, lowercase, number, and symbol characters. It is bcrypt-hashed before being stored.
- Refuses to promote the configured email while a different admin account exists.

The script is local/server-side only; there is no public admin setup endpoint or setup secret. Sign in at `/login`; the admin account is sent to `/admin/users`. The login API reports missing database/session configuration explicitly; configure all three variables above in `.env.local`.

## Managing student accounts

From `/admin/users`, create an account with the student's name, email, temporary password, and initial training-access status. Share the credentials securely. The admin can enable or revoke access from the student list at any time. Student records contain a normalized unique email, bcrypt password hash, `user` role, and access flag. The account form never accepts a role.

Students sign in at `/login`. Only a signed-in account with role `user` and training access enabled can view the protected training content at `/training`. Training videos are intentionally empty until you configure authorized modules in `lib/training-modules.js`.

## Purchase enquiries

The `/buy` form validates the customer's full name, state, and email and opens WhatsApp to `917369851886` with the prefilled enquiry for ₹149. It does not store those form values, initiate a payment, or send the message. The customer reviews the message and presses Send in WhatsApp. LearnIND manually shares payment instructions and provides credentials after confirming payment.

## Security and deployment

- Login attempts are rate limited using a MongoDB counter collection (10 per IP per 15 minutes). Account creation and access changes also have shared MongoDB limits. No in-memory/serverless-only limiter is used.
- When deploying behind a reverse proxy, configure it to set trustworthy `X-Forwarded-For` or `X-Real-IP` headers and prevent direct origin access that would allow clients to spoof them.
- Set `MONGODB_URI` and a unique `SESSION_SECRET` in the hosting provider's **server-side** environment settings. Serve production traffic over HTTPS; production session cookies are Secure, HTTP-only, and SameSite=Lax.
- The MongoDB application user must be allowed to read/write account and rate-limit collections and create the unique/expiry indexes.
- `npm run build` does not require a live database. Login, admin operations, and setup require MongoDB.

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
npm run check-admin
npm run setup-admin
```

If authentication is unavailable, verify the Atlas URI, database credentials, network allowlist, and `SESSION_SECRET` length. Never paste secrets into public logs, source files, or client-side `NEXT_PUBLIC_*` variables.
