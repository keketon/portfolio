import { Duration } from 'aws-cdk-lib';
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { Construct } from 'constructs';
import { CONST } from './const';
import { LambdaFunctions } from './lambda-functions';

export class ApiGateway extends Construct {
  constructor(scope: Construct, id: string, lambdaFunctions: LambdaFunctions) {
    super(scope, id);

    const api = new apigwv2.HttpApi(this, 'HttpApi', {
      apiName: 'PortfolioApi',
      description: 'API for Portfolio',
      corsPreflight: {
        allowHeaders: ['X-API-KEY'],
        allowMethods: [
          apigwv2.CorsHttpMethod.GET,
          apigwv2.CorsHttpMethod.HEAD,
          apigwv2.CorsHttpMethod.OPTIONS,
          apigwv2.CorsHttpMethod.POST,
        ],
        allowOrigins: [CONST.webUrl],
        maxAge: Duration.days(10),
      },
      createDefaultStage: true,
    });

    api.addRoutes({
      path: '/score',
      methods: [apigwv2.HttpMethod.POST],
      integration: new HttpLambdaIntegration('RecordScoreIntegration', lambdaFunctions.recordScoreFunction),
    });
  }
}
