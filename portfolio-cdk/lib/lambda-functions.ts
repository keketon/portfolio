import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { Ddb } from './ddb';
import { Duration } from 'aws-cdk-lib';
import { CONST } from './const';

export class LambdaFunctions extends Construct {
  public readonly corsFunction: lambda.IFunction;
  public readonly recordScoreFunction: lambda.IFunction;

  constructor(scope: Construct, id: string, ddb: Ddb) {
    super(scope, id);

    const { scoreTable } = ddb;

    this.corsFunction = new lambda.Function(this, 'CorsFunction', {
      runtime: lambda.Runtime.NODEJS_LATEST,
      handler: 'index.handler',
      code: lambda.Code.fromInline(
        `exports.handler = async (event) => { return { statusCode: 200, headers: { "Access-Control-Allow-Headers" : "Content-Type", "Access-Control-Allow-Origin": "${CONST.webUrl},http://localhost:5173", "Access-Control-Allow-Methods": "OPTIONS,POST,GET" } }; };`
      ),
      functionName: 'CorsFunction',
    });

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
