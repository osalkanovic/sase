export interface AssistantResponse {
  returnValues: {
    output: string;
    runId: string;
    threadId: string;
  };
  log: string;
  runId: string;
  threadId: string;
}
