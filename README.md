ecopos
======

Angular-powered POS and e-commerce.
This app was generated using Yeoman and the cg-angular generator.
Cg-angular generates a module with it's specified directives, partials, and services.

Moderate hacking of grunt files has allowed for relatively seemless configurations of nested modules.

Each nested module is a standalone and test-ready application that compiles to it's own .js file that the main module includes in the primary build.

Modules:

ecopos - main module (deps on ecoposadmin, ecoposcommon, ecoposresources, and ecoposshop)

ecoposadmin - admin module (deps on ecoposcommon)
ecoposresources - resources module (deps on ecoposcommon)
ecoposshop - shopping module (deps on ecoposcommon)

ecoposcommon - a common module that (no deps)

