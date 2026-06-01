# Hours in Spanish

<p align="center">
  <img src="static/readme-logo.png" width="500" />
</p>


[A blog][ba] tracking my Spanish acquisition through hours of comprehensible input.

Each post documents what’s improving, what’s still difficult, and how comprehension evolves over time.

## Tech

- [Hugo][h] (static site generator) with the [mana][m] theme
- Deployed via [Cloudflare Pages][cfp]
- Reader comments powered by [Cusdis][cusdis]
- Quiet footer links for support and per-page GitHub source

## Local development

Run:

    hugo server -D

Then open http://localhost:1313

## Git hooks

This repo uses a versioned pre-commit hook in `scripts/git-hooks/`.
Configure Git to use it:

    git config core.hooksPath scripts/git-hooks

The current hook runs an Elixir script that prevents committing staged
`content/hours/*.md` posts while they still have `draft = true`.

## Structure

- `content/hours/` → hour-based progress logs  
- `content/compartir/` → shared reflections, ideas, media and experiments  
- `scripts/check_hours_drafts.exs` → pre-commit draft check for hours posts
- `scripts/git-hooks/pre-commit` → versioned Git pre-commit hook
- `layouts/partials/comments.html` → Cusdis comments embed
- `layouts/partials/footer.html` → footer support and source links
- `assets/css/custom.css` → site-specific theme overrides

## Status

Active project. Ongoing updates as hours accumulate.

[ba]: https://hoursinspanish.com
[h]: https://gohugo.io/
[m]: https://themes.gohugo.io/themes/hugo-mana-theme/
[cfp]: https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/#deploy-with-cloudflare-pages
[cusdis]: https://cusdis.com/
