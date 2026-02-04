# Email Configuration Setup Guide

## ✅ Contact Form Email is Ready!

Your contact form is already fully functional. It just needs email credentials to send messages.

## Quick Setup (Choose One Method)

### Method 1: Gmail SMTP (Easiest - Recommended for Testing)

**Step 1: Enable App Passwords in Gmail**
1. Go to your Google Account: https://myaccount.google.com
2. Click "Security" in the left sidebar
3. Enable "2-Step Verification" if not already enabled
4. Go to https://myaccount.google.com/apppasswords
5. Select app: "Mail", Select device: "Other (Custom name)"
6. Type "Third Fuse Energy Website"
7. Click "Generate"
8. Copy the 16-character password (looks like: abcd efgh ijkl mnop)

**Step 2: Update .env.local File**
Replace these lines in `.env.local`:
```env
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=youremail@gmail.com
EMAIL_SMTP_PASS=abcdefghijklmnop
FORM_RECIPIENT_EMAIL=bharani@thirdfuseenergycorp.com
```

**Step 3: Restart Development Server**
```bash
# Stop the current server (Ctrl+C)
npm run dev
```

**Step 4: Test the Contact Form**
1. Go to http://localhost:3000/contact
2. Fill out the form
3. Click "Send Message"
4. Check your inbox at bharani@thirdfuseenergycorp.com

---

### Method 2: Company Email SMTP

**Step 1: Get SMTP Credentials**
Contact your email hosting provider (whoever manages @thirdfuseenergycorp.com) and ask for:
- SMTP server hostname
- SMTP port (usually 587 or 465)
- Email username
- Email password

**Step 2: Update .env.local File**
```env
EMAIL_SMTP_HOST=mail.thirdfuseenergycorp.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=bharani@thirdfuseenergycorp.com
EMAIL_SMTP_PASS=your-password-here
FORM_RECIPIENT_EMAIL=bharani@thirdfuseenergycorp.com
```

**Common SMTP Providers:**
- **cPanel/WHM**: `mail.yourdomain.com`, Port: 587
- **Plesk**: `mail.yourdomain.com`, Port: 587
- **Office 365**: `smtp.office365.com`, Port: 587
- **Zoho Mail**: `smtp.zoho.com`, Port: 587

---

## For Vercel Deployment

**Step 1: Add Environment Variables in Vercel**
1. Go to: https://vercel.com/your-username/third-fuse-energy/settings/environment-variables
2. Add each variable:
   - `EMAIL_SMTP_HOST` = smtp.gmail.com
   - `EMAIL_SMTP_PORT` = 587
   - `EMAIL_SMTP_USER` = youremail@gmail.com
   - `EMAIL_SMTP_PASS` = your-app-password
   - `FORM_RECIPIENT_EMAIL` = bharani@thirdfuseenergycorp.com

**Step 2: Redeploy**
Click "Deployments" → "..." → "Redeploy"

---

## How It Works (No Database!)

```
User fills form
     ↓
Form submits to /api/contact
     ↓
Server validates data
     ↓
Nodemailer sends via SMTP
     ↓
Email arrives at bharani@thirdfuseenergycorp.com
```

**Email Contains:**
- User's Name
- User's Email (can reply directly)
- User's Phone
- Company Name
- Project Type
- Message
- Timestamp

**Features Already Built:**
✅ Form validation
✅ Rate limiting (5 requests/minute)
✅ Spam protection (honeypot field)
✅ HTML email templates
✅ Error handling
✅ Success notifications

---

## Troubleshooting

**Error: "Email configuration is incomplete"**
- Make sure all variables in `.env.local` are filled
- Restart dev server after changes

**Error: "Invalid login" (Gmail)**
- Enable 2-Step Verification
- Use App Password, not regular password
- Remove spaces from app password

**Error: "Connection timeout"**
- Check SMTP host and port
- Some ISPs block port 25, use port 587
- Check firewall settings

**Emails not arriving?**
- Check spam/junk folder
- Verify FORM_RECIPIENT_EMAIL is correct
- Check email provider logs

---

## Testing Checklist

- [ ] Created `.env.local` file
- [ ] Added Gmail app password OR company SMTP credentials
- [ ] Restarted development server
- [ ] Filled contact form at /contact
- [ ] Received email successfully
- [ ] Added variables to Vercel (for production)
- [ ] Tested on live site

---

## Security Notes

⚠️ **NEVER commit `.env.local` to Git!**
- Already ignored in `.gitignore`
- Contains sensitive passwords
- Each developer needs their own copy

✅ **Good Practices:**
- Use app-specific passwords (Gmail)
- Rotate passwords regularly
- Use different emails for dev/production
- Monitor rate limiting logs

---

## Need Help?

1. Gmail App Passwords: https://support.google.com/accounts/answer/185833
2. Nodemailer Docs: https://nodemailer.com/smtp/
3. Vercel Environment Variables: https://vercel.com/docs/environment-variables
