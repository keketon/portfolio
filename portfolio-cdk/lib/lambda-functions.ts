import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class LambdaFunctions extends Construct {
  public readonly recordScoreFunction: lambda.IFunction;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.recordScoreFunction = new lambda.Function(this, 'RecordScore', {
      runtime: lambda.Runtime.JAVA_21,
      handler: 'com.keketon.profile.api.handlers.RecordScoreHandler::handleRequest',
      code: lambda.Code.fromAsset('../portfolio-api/lib/build/libs/lib-all.jar'),
      functionName: 'RecordScore',
    });
  }
}
