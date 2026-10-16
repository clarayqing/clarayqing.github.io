# Chloe Lee — personal website

Live at https://chloeyqing.github.io/.

A responsive, dependency-free portfolio covering algorithms, scientific computing,
research, and competition milestones. Hosted on GitHub Pages from the main branch.

## Editing

- index.html: bio, project descriptions, evaluation numbers, achievements, and links.
- style.css: the pastel palette, typography, desktop layout, and mobile breakpoints.
- script.js: progressive enhancement for the native mobile navigation menu.
- favicon.svg: the site's vector icon.

There is no build step. All assets are local; the site does not load third-party
scripts, fonts, analytics, or frameworks. The menu and research notes use native
details/summary elements and remain usable without JavaScript.

## Content sources

Research metrics and domain notes come from
https://github.com/chloeyqing/real-gas-correction and its tracked
results/tables/final_test_comparison.csv. Keep the table, summary figures, and
evaluation notes in sync when the research changes. The errors measure agreement
with CoolProp reference data for CO₂ within the documented domain.

Competition milestones and the Young Turing Program project description are
owner-supplied. Preserve distinctions between individual and team results, tied
rankings, qualifications, and publication status when updating them.

## Checks before publishing

Check local asset paths and section links, HTML/CSS validity, JavaScript syntax,
keyboard navigation, and layouts at narrow phone, tablet, and desktop widths.
Keep the existing section IDs so incoming links continue to work.
The Pages build and deployment workflow runs after updates to main.

