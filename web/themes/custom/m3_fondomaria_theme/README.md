### This theme is not built for use!

Before loading this theme into drupal, `make build`(from the makefile) should be run in order to compile the files included and process what is needed. Requirements for this are:

- make command enabled
- node and yarn installed
- ruby sass in context


### Enabling Fontawesome Pro for development

Before rebuilding the template styles and dependencies, you must ensure you have settled up the Fontawesome Pro token in the `.npmrc` file. An `.example_npmrc` with the code required for this is included in this repository.

Copy that `.example_npmrc` and rename it to `.npmrc`, then edit the file changing the string `FONTAWESOME-PRO-TOKEN` for your current **Fontawesome Pro plan npm package Token**, you might find this token in your Fontawesome profile page after subscribing to Pro.