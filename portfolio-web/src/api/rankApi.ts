const API_ENDPOINT = 'https://ed0p43f7dj.execute-api.ap-northeast-1.amazonaws.com/score';

export async function recordResult(userId: string, score: number): Promise<number> {
  return fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'X-API-KEY': 'key here' || '',
    },
    body: JSON.stringify({
      userId,
      score,
    }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.rank == null) {
        throw new Error(`Failed API call. Message: ${data.message ?? 'No details are available'}`);
      }
      return data.rank;
    })
    .catch(error => {
      console.error('Error to call API', error);
      throw error;
    });
}
