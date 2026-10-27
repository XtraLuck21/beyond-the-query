# GitHub Pages deployment

Expected public URL after a successful deployment:
https://xtraluck21.github.io/beyond-the-query/

## Branch model

- `main`: normal development.
- `gh-pages`: source code plus deployment configuration, branched from `main`.
- GitHub Actions builds `gh-pages` and publishes only `dist/`.
- Do not select **Deploy from a branch** in Pages settings. This branch contains Vite source, not prebuilt HTML.
- A push to `gh-pages` triggers publication once Pages is enabled. A push to `main` does not trigger this workflow.
- This setup does not require a personal access token or additional repository secrets.
- The initial local setup does not commit, push, change GitHub settings, or deploy anything.

## Local verification

Use Node.js 22.22.2 (the CI version), then run:

```sh
npm ci
npm run lint
npm run build
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

Open http://127.0.0.1:4173/beyond-the-query/ and check paper switching, Scim tabs, the relationship map, the comparison matrix, images, and source links. Stop the preview with Ctrl+C.

`npm run dev` continues to use the root path at the address printed by Vite. Production builds and previews use `/beyond-the-query/`. Build output stays ignored in `dist/`; do not commit it.

## First publication (perform when ready)

1. Review the local changes while on `gh-pages`:

   ```sh
   git branch --show-current
   git status --short
   git diff -- vite.config.js
   ```

   Also review `.github/workflows/deploy-pages.yml` and this document. Until committed, these are working-tree changes, not changes stored exclusively in a branch. Commit them on `gh-pages` before switching back to `main`.

2. In https://github.com/XtraLuck21/beyond-the-query/settings/pages, set **Build and deployment > Source > GitHub Actions**. Save if prompted. If Pages is unavailable, check repository visibility and the account plan; do not change visibility without considering what becomes public.

3. If a `github-pages` environment already restricts deployment branches, allow `gh-pages` under **Settings > Environments > github-pages > Deployment branches and tags**. The environment may be created by the first deployment. If that run is blocked by its rules, allow `gh-pages` and rerun the failed job.

4. Commit only the deployment files:

   ```sh
   git add vite.config.js .github/workflows/deploy-pages.yml docs/github-pages.md
   git commit -m "Configure GitHub Pages deployment from gh-pages"
   ```

5. Push when you are ready to publish. This is the deployment trigger:

   ```sh
   git push -u origin gh-pages
   ```

6. Open the repository's **Actions** tab and select **Deploy GitHub Pages**. Wait for both `build` and `deploy` to succeed. Open the URL shown by the deployment and verify it in a separate browser window.

7. If deployment fails, inspect the failed step. After fixing repository settings, use **Re-run failed jobs** on the existing workflow run. There is no manual-dispatch trigger, since the workflow initially exists only on this non-default branch.

## Future releases

Keep the working tree clean before changing branches. After committing normal work on `main`, update the deployment branch locally:

```sh
git switch gh-pages
git merge main
npm run lint
npm run build
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

Review the preview and resolve any merge conflicts before publication. When ready, stop the preview and run `git push origin gh-pages`. It publishes the updated version. Do not merge the deployment branch back into `main` unless you intentionally want its configuration there.

For each study session, record the deployed commit and avoid publishing updates during the session.

## Local validation of this setup

Validated on October 26, 2026 against source commit `1b7b4269700276fe6924aedfeaf91919690e7a6e`, with the deployment changes still uncommitted:

- ESLint and the production build passed using installed dependencies matching the checked package-lock versions.
- The workflow YAML parsed successfully; the branch filter, job dependency, permissions, and artifact directory were checked.
- Development resolves to `/`; build and preview resolve to `/beyond-the-query/`.
- Built HTML, JavaScript, CSS, and both image assets returned HTTP 200 with byte-for-byte matches to local output.
- Browser checks passed for paper selection, Scim highlight explanations, relationship-map selection, two-paper comparison, and evidence disclosure.
- Vite reported a non-blocking JavaScript chunk-size warning (approximately 589 kB before compression). No bundle-splitting changes were made.
- No commit, push, GitHub settings change, or deployment was performed. The GitHub-hosted workflow and public URL still require verification after the first intentional push.

## References

- [Vite: GitHub Pages](https://vite.dev/guide/static-deploy#github-pages)
- [GitHub: Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
