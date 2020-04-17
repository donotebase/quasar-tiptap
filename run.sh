#! /bin/sh

# ==============================================================================
# Description: Run and build scripts
# Author: Micle Bu, micle@oriovo.com
# Created On: 2018.03.18
# Updated On: 2018.03.18
# Quasar: http://quasar-framework.org/guide/quasar-cli.html
# ==============================================================================
APP="quasar-tiptap"

## Run from here
## -----------------------------------------------------------------------------
if [ $# -lt 1 ]
then
    echo "Usage: $(basename "$0") dev|build|deploy|packager|builder [pwa|electron]"
    exit 1
fi

## Params
## -----------------------------------------------------------------------------
type=$1
mode=$2

if [ -z "$mode" ]
then
  mode="pwa"
fi


## Preprocess
## -----------------------------------------------------------------------------
VERSION=$(cat package.json | python2 -c 'import json,sys;obj=json.load(sys.stdin);print obj["version"]')
echo "Building $APP $VERSION ..."


## Func
## -----------------------------------------------------------------------------
run_build() {
  quasar "$type" -m "$mode"
}

run_deploy() {
  cd dist/spa

  git init
  git add -A
  git commit -m 'deploy: 🎉[skip ci]'
  git push -f git@github.com:donotebase/quasar-tiptap.git master:gh-pages

  cd -
}

electron_builder() {
  quasar build -m electron -T all -b builder

  cd dist/electron
  cd -
}

## Run from here
## -----------------------------------------------------------------------------
case $type in
  "deploy")
    type="build"
    run_build
    run_deploy
    ;;
  "builder")
    electron_builder
    ;;
  *)
    run_build
    ;;
esac
