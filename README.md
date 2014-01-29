#EcoPOS
======

## Angular-powered POS and e-commerce.

This app was generated using Yeoman and the cg-angular generator.
Cg-angular generates a module with it's specified directives, partials, and services.

Moderate hacking of grunt files has allowed for relatively seamless configurations of nested submodules in /modules.

Each submodule is a standalone and test-ready application that compiles to it's own .js file that the main module includes in the primary build.

## Modules:

**ecopos** - main module (deps on ecoposadmin, ecoposcommon, ecoposresources, and ecoposshop)

**ecoposadmin** - admin submodule (deps on ecoposcommon)

**ecoposresources** - resources submodule (deps on ecoposcommon)

**ecoposshop** - shopping submodule (deps on ecoposcommon)

**ecoposcommon** - a common submodule that (no deps)

## To install:

Download or clone this repo, then..

        sudo npm install yeoman -g

        sudo npm install -g generator-cg-angular


## To run

*From the root dir of the module worked on*

New Directive bundle:

        yo cg-angular:directive my-awesome-directive

New Partial bundle:

        yo cg-angular:partial my-partial

New Service:

        yo cg-angular:service my-service

New Filter:

        yo cg-angular:filter my-filter


Test server:

        grunt server

Compile:

        grunt build


* * *
**Notes:**

Changes to ecoposcommon must be compiled before it can be used by the other submodules or ecopos. Each submodule must be compiled prior to compiling ecopos. derp.
