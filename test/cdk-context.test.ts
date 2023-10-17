import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { Ec2CdkStack } from '../lib/ec2-cdk-stack';
import { BuildConfig, getConfig } from '../lib/build-config';

function getLogicalId(stack: cdk.Stack, resource: cdk.IResource) {
    // Retrieve the logical id for any resource within a stack
    // Invoke as follows:
    // const ec2InstanceLogicalId = getLogicalId(stack, stack.ec2Instance);
    return stack.getLogicalId(resource.node.findChild('Resource') as cdk.CfnElement);
}

test('EC2 name from config', () => {
    // GIVEN
    const app = new cdk.App();
    let buildConfig: BuildConfig = getConfig(app);

    // WHEN
    const stack = new Ec2CdkStack(app, 'Ec2CdkStack', { env: { region: buildConfig.region } }, buildConfig);

    // THEN
    const template = Template.fromStack(stack);

    // Ensure EC2 Instance logical id doesn't change
    template.templateMatches({
        Resources: Match.objectLike({
            [buildConfig.ec2InstanceLogicalId]: Match.objectLike({ "Type": "AWS::EC2::Instance" })
        })
    })

    // Ensure naming of EC2 Instance
    template.hasResourceProperties('AWS::EC2::Instance', {
        Tags: [{
            Key: "Name",
            Value: buildConfig.ec2Name
        }],
    });
});
