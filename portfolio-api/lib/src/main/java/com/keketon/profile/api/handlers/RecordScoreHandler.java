package com.keketon.profile.api.handlers;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.keketon.profile.api.dto.RecordScoreRequest;
import com.keketon.profile.api.repository.DdbRepository;
import com.keketon.profile.api.repository.Score;

public class RecordScoreHandler
    implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
  private static final ObjectMapper mapper = new ObjectMapper();
  private static final DdbRepository ddbRepository = new DdbRepository();

  @Override
  public APIGatewayProxyResponseEvent handleRequest(
      final APIGatewayProxyRequestEvent event, final Context context) {
    final RecordScoreRequest req;
    try {
      req = mapper.readValue(event.getBody(), RecordScoreRequest.class);
    } catch (final JsonProcessingException e) {
      final APIGatewayProxyResponseEvent res = new APIGatewayProxyResponseEvent();
      res.setStatusCode(400);
      res.setBody("{\"message\":\"Invalid request body: " + e.getMessage() + "\"}");

      return res;
    }

    final Score score = Score.of(req.userId(), req.score());
    ddbRepository.saveScore(score, context.getLogger());
    final int rank = ddbRepository.calculateRank(score, context.getLogger());

    final APIGatewayProxyResponseEvent res = new APIGatewayProxyResponseEvent();
    res.setStatusCode(200);
    res.setBody("{\"rank\":" + rank + "}");

    return res;
  }
}
