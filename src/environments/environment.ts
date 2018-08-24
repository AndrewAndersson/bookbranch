// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDTjMXd9Vaj5eNUCkBBCyoHz4rCvy4hgsg",
    authDomain: "books-branch.firebaseapp.com",
    databaseURL: "https://books-branch.firebaseio.com",
    projectId: "books-branch",
    storageBucket: "books-branch.appspot.com",
    messagingSenderId: "82698786557"
  }
};
