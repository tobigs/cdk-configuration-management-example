import * as cdk from 'aws-cdk-lib';
import { Ec2CdkStack } from '../lib/ec2-cdk-stack';
import { BuildConfig, getConfig } from '../lib/build-config';

const app = new cdk.App();

let buildConfig: BuildConfig = getConfig(app);

new Ec2CdkStack(app, 'Ec2CdkStack', {env: {region: buildConfig.region}}, buildConfig);
