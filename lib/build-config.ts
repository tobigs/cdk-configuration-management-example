import * as cdk from "aws-cdk-lib";

// These values map to the keys in our cdk.json and make sure
// no values that aren't supported are passed in with the
// -c env=environment flag
const supportedEnvironments = ["prod", "dev", "test"] as const;

type SupportedEnvironments = typeof supportedEnvironments[number];

// This maps to the values you specified in your cdk.json file
// if you add any values to your cdk.json file, also add them here!
export type BuildConfig = {
  environment: SupportedEnvironments;
  region: string;
  ec2Name: string;
  ec2InstanceLogicalId: string;
};

// This function is used by your CDK app and pulls your config values
// from the context
export const getConfig = (app: cdk.App, env?: SupportedEnvironments): BuildConfig => {
  
  let environmentFromEnv = app.node.tryGetContext("env");

  if (!environmentFromEnv) {
    environmentFromEnv = process.env.ENV;
    if (!environmentFromEnv) {
      throw new Error(
        "Environment variable must be either set through the environment variable ENV our by providing it to cdk via context: `cdk deploy -c env=XXX`"
      );
    }
  }
  if (supportedEnvironments.includes(environmentFromEnv)) {
    env = environmentFromEnv as SupportedEnvironments;
  } else {
    throw new Error(
      `${env} is not in supported environments: ${supportedEnvironments.join(
        ", "
      )}`
    );
  }
  
  // this contains the values in the context without being
  // validated
  let unparsedEnv = app.node.tryGetContext(env);
  if (!unparsedEnv) {
    unparsedEnv = require("../cdk.json")["context"][env]
  }

  let buildConfig : BuildConfig = {
    environment: env,
    region: ensureString(unparsedEnv, "region"),
    ec2Name: ensureString(unparsedEnv, "ec2Name"),
    ec2InstanceLogicalId: ensureString(unparsedEnv, "ec2InstanceLogicalId")
  }

  return buildConfig;
};


// this function ensures that the value from the config is
// the correct type. If you have any types other than
// strings be sure to create a new validation function
function ensureString(
  object: { [name: string]: any },
  key: keyof BuildConfig
): string {
  if (
    !object[key] ||
    typeof object[key] !== "string" ||
    object[key].trim().length === 0
  ) {
    throw new Error(key + " does not exist in cdk config");
  }
  return object[key];
}