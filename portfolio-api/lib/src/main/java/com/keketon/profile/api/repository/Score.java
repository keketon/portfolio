package com.keketon.profile.api.repository;

import lombok.Builder;
import lombok.Getter;
import lombok.Value;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbImmutable;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;

@Value
@Builder
@DynamoDbImmutable(builder = Score.ScoreBuilder.class)
public class Score {
  @Getter(onMethod_ = @DynamoDbPartitionKey)
  String userId;

  @Getter(onMethod_ = @DynamoDbSortKey)
  long timestampMillis;

  int score;

  public static Score of(final String userId, final int score) {
    return new Score(userId, System.currentTimeMillis(), score);
  }
}
