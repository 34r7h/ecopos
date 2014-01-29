ecopos
======

Angular-powered POS and e-commerce.
This app was generated using Yeoman and the cg-angular generator.
Cg-angular generates a module with it's specified directives, partials, and services.

Moderate hacking of grunt files has allowed for relatively seemless configurations of nested submodules.

Each submodule is a standalone and test-ready application that compiles to it's own .js file that the main module includes in the primary build.

Modules:

ecopos - main module (deps on ecoposadmin, ecoposcommon, ecoposresources, and ecoposshop)

ecoposadmin - admin submodule (deps on ecoposcommon)
ecoposresources - resources submodule (deps on ecoposcommon)
ecoposshop - shopping submodule (deps on ecoposcommon)

ecoposcommon - a common submodule that (no deps)

To run cd to the app or submodule dir and type 'grunt server'. Compile 'grunt build'.
*** note ***
Changes to ecoposcommon must be compiled before it can be used by the other submodules or ecopos.
Each submodule must be compiled prior to compiling ecopos. derp.
