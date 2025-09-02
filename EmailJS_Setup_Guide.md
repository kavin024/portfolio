# EmailJS Setup Guide for Contact Form

## Overview
This guide will help you set up EmailJS to enable email functionality in your portfolio contact form.

## Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## Step 3: Create Email Templates
You need to create 2 templates:

### Template 1: Contact Form Template
1. Go to "Email Templates" → "Create New Template"
2. Template content:
```
Subject: New Contact Form Message - {{subject}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```
3. Note down your **Template ID**

### Template 2: Auto-Reply Template
1. Create another template for auto-replies:
```
Subject: Thank you for contacting me!

Hi {{to_name}},

Thank you for reaching out! I have received your message and will get back to you as soon as possible.

Best regards,
KAVIN P
UI/UX Designer & Software Engineer
kavin22cs024@gmail.com
```
2. Note down your **Auto-Reply Template ID**

## Step 4: Get Your Public Key
1. Go to "Account" → "General"
2. Find your **Public Key**

## Step 5: Update Your Code
Replace the following placeholders in your `script.js` file:

```javascript
// Line ~291: Replace with your actual public key
emailjs.init('YOUR_PUBLIC_KEY');

// Line ~319: Replace with your service ID
'YOUR_SERVICE_ID',

// Line ~320: Replace with your template ID  
'YOUR_TEMPLATE_ID',

// Line ~358: Replace with your service ID
'YOUR_SERVICE_ID',

// Line ~359: Replace with your auto-reply template ID
'YOUR_AUTO_REPLY_TEMPLATE_ID',
```

## Step 6: Test Your Form
1. Open your portfolio in a browser
2. Fill out the contact form
3. Submit the form
4. Check your email for the message
5. The sender should receive an auto-reply

## Troubleshooting

### Common Issues:
1. **Template parameters not matching**: Ensure your template uses the exact parameter names:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`

2. **Service not working**: Make sure your email service is properly configured and verified

3. **Public key issues**: Double-check you're using the correct public key from your account

### Fallback Option
If EmailJS fails, the form will automatically offer to open the user's default email client with a pre-filled message.

## Free Tier Limits
- 200 emails per month
- Up to 2 email services
- Up to 2 email templates

For higher volumes, consider upgrading to a paid plan.

## Security Notes
- Your public key is safe to expose in client-side code
- Never expose your private key
- EmailJS handles all email sending securely

## Support
If you need help:
1. Check EmailJS documentation: https://www.emailjs.com/docs/
2. Contact EmailJS support
3. Use the mailto fallback for immediate functionality