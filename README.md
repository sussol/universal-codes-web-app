![Build Status](http://54.206.8.184:8080/buildStatus/icon?job=universal-drug-codes-web-app-test)

Universal Drug Codes Web App
==============================

A front-end for displaying Universal Drug names and codes.

**If you want to contribute, poke, prod, or fork, read on.**

## Getting the project

`git clone git@github.com:sussol/universal-drug-codes-web-app.git && cd universal-drug-codes-web-app`

## Starting up the project for local development

```
npm install
npm start

// open your browser to localhost:8080
```
### Changing the local development `port`

If you'd to run the project on a port other than `:8080`: 

`WEBPACK_SERVER_PORT=[NEW_PORT] npm start`

📓 Local development uses:
* [`react-hot-loader`](https://github.com/gaearon/react-hot-loader) ("Tweak React components in real time.")
* [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) (watch for changes and re-compile)

## Deploying
Deployment happens by release branch indentification. Create a `release-x.x.x` (e.g. release-1.0.0) branch after pulling from `master`. Push the branch to `origin`.

```
git checkout master
git pull
git checkout -b release-x.x.x
git push origin HEAD
```

After the release branch is pushed and the deployment succeeds, be sure to create a tag (e.g. v1.0.0) for the release (the release branch should be checked out):

```
git tag vX.X.X
git push --tags
```

## Testing

`npm test`

## Contributing

1. [Fork the project](https://help.github.com/articles/fork-a-repo/)
2. Send a pull request to us

❗️ All tests must pass
