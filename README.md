# EC2 Instance Creation with CDK

This example showcases how you can deploy and test your cdk project with multiple environments.

## Deployment

```bash
$ export ENV=dev
$ cdk deploy
```

## Testing

```bash
$ export ENV=dev
$ npm run test
```

## Notice

This is a sample solution intended as a starting point and should not be used in a productive setting without thorough analysis and considerations on the user's side.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.

## Attribution

The file `build-config.ts` is based on [this blog](https://spin.atomicobject.com/2022/05/11/cdk-configurations/) by [Gage Vander Clay](https://spin.atomicobject.com/author/gage-vanderclay/).<br>
The file `ec2-cdk-stack.ts` is based on [this repository](https://github.com/aws-samples/aws-cdk-examples/tree/master/typescript/ec2-instance) from [AWS Samples](https://github.com/aws-samples).

