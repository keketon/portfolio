import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class Ddb extends Construct {
  public readonly scoreTable: ddb.ITable;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.scoreTable = new ddb.Table(this, 'ScoreTable', {
      tableName: 'ScoreTable',
      partitionKey: { name: 'userId', type: ddb.AttributeType.STRING },
      sortKey: { name: 'timestampMillis', type: ddb.AttributeType.NUMBER },
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
    });
  }
}
