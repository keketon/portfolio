#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { PortfolioCdkStack } from '../lib/portfolio-cdk';

const ENV = {
  account: '900001851704',
  region: 'ap-northeast-1',
};

const app = new cdk.App();

new PortfolioCdkStack(app, `Portfolio-cdk-stack`, {
  stackName: `Portfolio-cdk-stack`,
  env: ENV,
});
