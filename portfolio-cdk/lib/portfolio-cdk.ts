import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface PortfolioCdkStackProps extends cdk.StackProps {
  stackName: string;
}

export class PortfolioCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PortfolioCdkStackProps) {
    super(scope, id, props);
  }
}
