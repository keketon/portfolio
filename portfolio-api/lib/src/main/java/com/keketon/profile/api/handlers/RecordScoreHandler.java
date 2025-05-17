package com.keketon.profile.api.handlers;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.keketon.profile.api.dto.RecordScoreRequest;
import com.keketon.profile.api.dto.RecordScoreResponse;

public class RecordScoreHandler implements RequestHandler<RecordScoreRequest, RecordScoreResponse> {

  // private static final DynamoDBCluent dynamoDBClient = DynamoDBClient.builder()
  //     .region(Region.US_EAST_1)
  //     .build();

  @Override
  public RecordScoreResponse handleRequest(
      final RecordScoreRequest request, final Context context) {
    context.getLogger().log("Requested by " + request.userId() + ", score is: " + request.score());
    return new RecordScoreResponse(request.userId(), 1);
  }
}
