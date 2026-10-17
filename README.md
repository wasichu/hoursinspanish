# Hours in Spanish

<p align="center">
  <img src="static/readme-logo.png" width="500" />
</p>


[A blog][ba] tracking my Spanish acquisition through hours of comprehensible input.

Each post documents what’s improving, what’s still difficult, and how comprehension evolves over time.

## Tech

- [Hugo][h] (static site generator) with the [mana][m] theme
- Deployed via [Cloudflare Pages][cfp]
- Reader comments powered by [CommentBox][commentbox]
- Quiet footer links for support and per-page GitHub source

## Local development

Install [mise](https://mise.jdx.dev/) and [Just](https://just.systems/)
(on macOS: `brew install mise just`). After
cloning, trust the repo configuration and install the pinned Hugo version:

    mise trust
    mise install

Download the pinned theme submodule:

    git submodule update --init --recursive

For a fresh clone, `git clone --recurse-submodules` downloads the theme
automatically.

Run:

    just server

Then open http://localhost:1313

Create a new draft hours post using the hours template:

    just new-hours 700

This creates `content/hours/700-hours.md`.

Create a compartir post using the compartir template:

    just new-compartir my-post-title

This creates `content/compartir/my-post-title.md`. The compartir template sets
`draft: false` by default.

All recipes run Hugo through mise.
Run `just --list` to see the available commands.

The Hugo version is pinned in `mise.toml`. Keep Cloudflare Pages'
`HUGO_VERSION` environment variable aligned with this version for production
and preview builds.

## Comments

Comments use CommentBox. Configure `params.comments.commentbox` in `hugo.toml`
with `enabled = true` and the project ID from the CommentBox dashboard.
Anonymous posting and moderation are configured in that dashboard.

The embed uses each page's URL and the `commentbox` anchor to identify its
thread, ignoring query parameters and existing anchors. Localhost previews have
separate threads from the live site. Colors match the site theme at page load.
If loading fails, readers see an unavailable message with a retry button.

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
- `layouts/_partials/comments.html` → CommentBox comments embed
- `layouts/_partials/footer.html` → footer support and source links
- `assets/css/custom.css` → site-specific theme overrides

## Status

Active project. Ongoing updates as hours accumulate.

[ba]: https://hoursinspanish.com
[h]: https://gohugo.io/
[m]: https://themes.gohugo.io/themes/hugo-mana-theme/
[cfp]: https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/#deploy-with-cloudflare-pages
[commentbox]: https://commentbox.io/

## Theme overrides

Site templates use Hugo's current `layouts/` paths, `_partials/`, and
`_shortcodes/`. Keep changes outside the pinned `themes/mana` submodule.

- `home.html` displays the introduction and the three most recent hours or
  compartir posts. `home.json` indexes those two sections for search, including
  full post text. The home output formats are configured in `hugo.toml`.
- `list.html` renders every post in the current section so tag and date filters
  can match the whole section. Section lists intentionally have no pagination;
  revisit this approach if the archive grows large.
- `single.html` adds comments; `footer.html` adds support and source links;
  `post-card.html` increases the summary limit; `head/favicon.html` adds SVG.
- `head/css.html` adds `assets/css/custom.css` to the theme's CSS bundle. Compare
  this override with upstream whenever updating the theme's stylesheet list.
- `baseof.html`, `head.html`, `head/json-ld.html`, `head/opengraph.html`, and
  `language-switcher.html` adapt the theme's old language APIs to current Hugo.
  Keep these until an updated theme has equivalent compatibility fixes, then
  compare and remove the redundant overrides. Other customized templates must
  retain their site-specific behavior when incorporating upstream changes.

Production settings live in `config/production/hugo.toml`. A normal `hugo`
build uses them; `hugo server` uses the development environment.
