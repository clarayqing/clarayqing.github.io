# Clara Lee — personal website

Live at https://clarayqing.github.io/.

A responsive, dependency-free portfolio covering algorithms, scientific computing,
research, and competition milestones. Hosted on GitHub Pages from the main branch.

## Editing

- `index.html` contains the bio, projects, CO₂ results table, achievements, and C++ notebook.
- `style.css` contains the blue, pink, and white palette, typography, layouts, and breakpoints.
- `script.js` enhances the native mobile menu and CO₂ test set comparison.
- `favicon.svg` is the site's icon.
- `blog/index.html` lists articles and their tags. The articles keep their original names under `posts/`.
- `blog/blog.js` handles tag filtering and the blog’s theme. `blog/fenwick.js` powers the Fenwick tree demo.
- `resume.html` summarizes the public projects and achievements listed on the portfolio.

There is no build step. All assets are local; the site does not load third-party
scripts, fonts, analytics, or frameworks. Without JavaScript, the page shows both
CO₂ test sets in a table. The mobile menu, research details, and C++ solution use
native disclosures.

## Content sources

Research metrics and domain notes come from
https://github.com/clarayqing/real-gas-correction and its tracked
results/tables/final_test_comparison.csv. Update the table and evaluation notes
when the research changes. The chart reads its values from the table. The errors
measure agreement with CoolProp reference data for CO₂ within the documented domain.

Competition milestones and the Young Turing Program project description are
owner-supplied. Preserve distinctions between individual and team results, tied
rankings, qualifications, and publication status when updating them.

The blog articles were imported from
https://github.com/clarayqing/LemonMatcha.github.io at commit
`800e7becd035ceabe409b32e712e7de9cff65f93`. The original MIT notice is in
`licenses/lemonmatcha.txt`.

## Checks before publishing

Check local asset paths and section links, HTML/CSS validity, JavaScript syntax,
keyboard navigation, and layouts at narrow phone, tablet, and desktop widths.
Keep the existing section IDs so incoming links continue to work.
The Pages build and deployment workflow runs after updates to main.

