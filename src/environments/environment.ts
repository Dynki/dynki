// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,

  region: 'eu-west-2',

  identityPoolId: 'eu-west-2:30a734df-5477-47e5-a689-82bce8804ed3',
  userPoolId: 'eu-west-2_QHrznNjw2',
  clientId: '1r7htsvagbh7a0cp0r19utekrc',

  rekognitionBucket: 'rekognition-pics',
  albumName: "usercontent",
  bucketRegion: 'eu-west-2',

  ddbTableName: 'LoginTrail'
};
