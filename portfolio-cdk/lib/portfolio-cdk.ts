import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaFunctions } from './lambda-functions';
import { ApiGateway } from './apiGateway';
import { Ddb } from './ddb';

export interface PortfolioCdkStackProps extends cdk.StackProps {
  stackName: string;
}

export class PortfolioCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PortfolioCdkStackProps) {
    super(scope, id, props);

    const ddb = new Ddb(this, 'Ddb');
    const lambdaFunctions = new LambdaFunctions(this, 'LambdaFunctions', ddb);

    new ApiGateway(this, 'ApiGateway', lambdaFunctions);
  }
}
