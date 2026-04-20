# Release Report: v1.0.2 → v1.2.2

**Repo:** `esquire.explorer.sandbox/develop`  
**Top commit:** `58a9bc0`

---

## Release Notes

### doc/release_notes.txt


**v1.2.2-2604.1914** esquire.ui lib: direct .tgx distribution added (to avoid git package access restrictions)  

**v1.2.2-2604.1821** esquire.ui lib v1.2.2; EsqObjectKind API; esquireKinds; dual-mode run; smoke tests  
&nbsp;: Improvement: EsqObjectKind API adoption; EsqExplorerHostDummy with loading/error signals  
&nbsp;: Improvement: backend esquireKinds endpoint (datastore, service, controller)  
&nbsp;: Improvement: dual-mode library run - run-yalc.bat / run-git.bat  
&nbsp;: Improvement: Playwright smoke tests - smock-test/  

---

## Code Changes

### backend/sandbox/changes.txt


**04/18/2026** mir0n  PokemonKinds array; esquireKinds endpoint  
**sandbox\datastore.js**  
&nbsp;- PokemonKinds array; esquireKinds endpoint  
**services\EsquireService.js**  
&nbsp;- esquireKinds service method  
**controllers\EsquireController.js**  
&nbsp;- esquireKinds controller handler  

### frontend/src/changes.txt


**04/18/2026** mir0n  EsqObjectKind API; EsqExplorerHostDummy; loading/error signals; esquireKinds  
**tree\pokemon-tree\pokemon-tree.component.ts**  
&nbsp;- EsqObjectKind API; EsqExplorerHostDummy; loading/error signals; esquireKinds  
**tree\pokemon-tree\pokemon-tree.component.html**  
&nbsp;- ready guard; error/status footer  

**04/18/2026** mir0n  dual-mode library run; GitHub Packages registry scope  
.npmrc  
&nbsp;- GitHub Packages registry scope for @mir0n-pro  

---

## Commits

```

-- 2026-04-20 | commit: 58a9bc0 | mir0n.the.programmer | esquire.ui lib: direct .tgx distribution added (to avoid git package access restrictions) --
M	doc/release_notes.txt
M	frontend/package.json
A	package-lock.json
A	package.clear.json
M	package.json
A	package.pkg.git.json
A	package.pkg.local.json
A	run-local.bat
A	run-pkg.bat
M	run-yalc.bat
 10 files changed, 16597 insertions(+), 5 deletions(-)

-- 2026-04-19 | commit: d1249fa | mir0n.the.programmer | v1.2.2 Finalization --
M	README.md
A	doc/media/51bddf97-3945-45c9-b7a4-8985594c64c8.png
D	explorer.sandbox.this.lib.iml
M	package.json
M	run.bat
 5 files changed, 81 insertions(+), 29 deletions(-)


-- 2026-04-18 | commit: 44e570c | mir0n.the.programmer | esquire.ui lib v1.2.2; EsqObjectKind API; esquireKinds; dual-mode run; smoke tests --
M	.gitignore
M	backend/api/openapi.yaml
M	backend/controllers/EsquireController.js
M	backend/package.json
M	backend/sandbox/changes.txt
M	backend/sandbox/datastore.js
M	backend/services/EsquireService.js
M	doc/release_notes.txt
A	explorer.sandbox.this.lib.iml
A	frontend/.npmrc
M	frontend/angular.json
M	frontend/package.json
D	frontend/src/app/app.component.spec.ts
M	frontend/src/changes.txt
M	frontend/src/rest/api/esquire.service.ts
M	frontend/src/styles.scss
M	frontend/src/tree/pokemon-tree/pokemon-tree.component.html
M	frontend/src/tree/pokemon-tree/pokemon-tree.component.scss
D	frontend/src/tree/pokemon-tree/pokemon-tree.component.spec.ts
M	frontend/src/tree/pokemon-tree/pokemon-tree.component.ts
M	frontend/tsconfig.json
D	frontend/tsconfig.spec.json
M	package.json
A	run-git.bat
A	run-yalc.bat
A	smock-test.bat
 26 files changed, 319 insertions(+), 159 deletions(-)

-- 2025-12-27 | commit: 4c25aa7 | mir0n.the.programmer | Update README.md --
M	README.md
A	favicon.ico
 2 files changed, 3 insertions(+), 8 deletions(-)
```

---

## Files Modified

```
M	.gitignore
M	README.md
M	backend/api/openapi.yaml
M	backend/controllers/EsquireController.js
M	backend/package.json
M	backend/sandbox/changes.txt
M	backend/sandbox/datastore.js
M	backend/services/EsquireService.js
A	doc/media/51bddf97-3945-45c9-b7a4-8985594c64c8.png
M	doc/release_notes.txt
A	favicon.ico
A	frontend/.npmrc
M	frontend/angular.json
M	frontend/package.json
D	frontend/src/app/app.component.spec.ts
M	frontend/src/changes.txt
M	frontend/src/rest/api/esquire.service.ts
M	frontend/src/styles.scss
M	frontend/src/tree/pokemon-tree/pokemon-tree.component.html
M	frontend/src/tree/pokemon-tree/pokemon-tree.component.scss
D	frontend/src/tree/pokemon-tree/pokemon-tree.component.spec.ts
M	frontend/src/tree/pokemon-tree/pokemon-tree.component.ts
M	frontend/tsconfig.json
D	frontend/tsconfig.spec.json
A	package-lock.json
A	package.clear.json
M	package.json
A	package.pkg.git.json
A	package.pkg.local.json
A	run-git.bat
A	run-local.bat
A	run-pkg.bat
A	run-yalc.bat
M	run.bat
A	smock-test.bat
 35 files changed, 16985 insertions(+), 186 deletions(-)
```

---

*From `v1.0.2` till `v1.2.2`*
