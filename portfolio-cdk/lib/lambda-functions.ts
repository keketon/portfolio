import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { Ddb } from './ddb';
import { Duration } from 'aws-cdk-lib';

export class LambdaFunctions extends Construct {
  public readonly recordScoreFunction: lambda.IFunction;

  constructor(scope: Construct, id: string, ddb: Ddb) {
    super(scope, id);

    const { scoreTable } = ddb;

    this.recordScoreFunction = new lambda.Function(this, 'RecordScore', {
      runtime: lambda.Runtime.JAVA_21,
      handler: 'com.keketon.profile.api.handlers.RecordScoreHandler::handleRequest',
      code: lambda.Code.fromAsset('../portfolio-api/lib/build/libs/lib-all.jar'),
      functionName: 'RecordScore',
      timeout: Duration.seconds(15),
      memorySize: 256,
      environment: {
        SCORE_TABLE_NAME: scoreTable.tableName,
      },
    });

    scoreTable.grantReadWriteData(this.recordScoreFunction);
  }
}
