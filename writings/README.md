# Publishing a new article

Use the owner-only content manager at `/admin/`.

1. Sign in.
2. Select **Writings** and open **Articles**.
3. Add an article and enter its URL name, title, date, 3–4 sentence preview, and full article.
4. Select **Publish**.

Separate paragraphs in the article field with a blank line. The title on the writings page automatically links to the full article.

## One-time hosting setup

This project uses Decap CMS with Git Gateway. On Netlify, enable **Identity**, registration set to **Invite only**, and **Git Gateway** under Identity settings. Invite the owner's email address. The owner can then sign in at `/admin/`.

The site must be deployed through a host that supports Netlify Identity and Git Gateway. A hidden URL by itself is not secure.
