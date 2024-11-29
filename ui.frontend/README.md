### General

The ui.frontend module compiles the code under the `ui.frontend/src` folder and outputs the compiled JS into the `ui.apps` module,
specifically into `../ui.apps/src/main/content/jcr_root/apps/e2e-apps/clientlibs/clientlib-frontend`


## Usage

The following npm scripts drive the frontend workflow:

* `npm run dev` - Runs the development mode by sync-ing local changes to a local AEM instance running at http://localhost:4502. This assumes that the entire project has been deployed to AEM at least once (`mvn clean install -PautoInstallPackage` **in the project root**).
* `npm run build` - Full build of client libraries.

### Skipping tests
To skip running npm tests add the `-Dmaven.npm.test.command=help` profile:
* `mvn clean install -PautoInstallPackage -Dnpm.test.command=help`

## VS Code Plugins

VS Code plugin for @web/test-runner to run / debug one or more test
https://marketplace.visualstudio.com/items?itemName=manishgowardipe.test-runner&ssr=false#overview