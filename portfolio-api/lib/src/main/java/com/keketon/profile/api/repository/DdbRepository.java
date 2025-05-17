package com.keketon.profile.api.repository;

import com.amazonaws.services.lambda.runtime.LambdaLogger;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Expression;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.model.PageIterable;
import software.amazon.awssdk.enhanced.dynamodb.model.ScanEnhancedRequest;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

public class DdbRepository {
  static final String TABLE_NAME = System.getenv("SCORE_TABLE_NAME");
  static final DynamoDbEnhancedClient enhancedClient = DynamoDbEnhancedClient.create();
  static final DynamoDbTable<Score> scoreTable =
      enhancedClient.table(TABLE_NAME, TableSchema.fromImmutableClass(Score.class));

  public void saveScore(final Score score, final LambdaLogger logger) {
    logger.log("Saving score for user: " + score.getUserId() + ", score: " + score.getScore());
    scoreTable.putItem(score);
  }

  /** Return 1-indexed rank of the score: Returns 1 when no items in the table. */
  public int calculateRank(final Score score, final LambdaLogger logger) {
    logger.log("Calculating rank for user: " + score.getUserId() + ", score: " + score.getScore());

    final ScanEnhancedRequest queryRequest =
        ScanEnhancedRequest.builder()
            .filterExpression(
                Expression.builder()
                    .expression("score > :score")
                    .putExpressionValue(
                        ":score", AttributeValue.fromN(String.valueOf(score.getScore())))
                    .build())
            .build();
    final PageIterable<Score> res = scoreTable.scan(queryRequest);
    return (int) res.items().stream().count() + 1;
  }
}
