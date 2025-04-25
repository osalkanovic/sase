// import { OpenAIAssistantRunnable } from 'langchain/experimental/openai_assistant';
// import { AssistantResponse } from './types';
// import { getCurrentStockPriceTool } from 'src/agent/tools/get-current-stock-price';
// import { AgentExecutor } from 'langchain/agents';
// import { getStockPriceTool } from 'src/agent/tools/get-stock-price';
// import { buyStock } from 'src/agent/tools/buy-stock';
export class Langchain {
  async test() {
    // const agent = new OpenAIAssistantRunnable({
    //   assistantId: 'asst_KQqlMQuUkyYMC4SJ7r7kLp01',
    //   clientOptions: {
    //     apiKey:
    //       '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',
    //   },
    //   asAgent: true,
    // });
    // const agentExecutor = AgentExecutor.fromAgentAndTools({
    //   agent,
    //   tools: [getCurrentStockPriceTool, getStockPriceTool, buyStock],
    // });
    // const assistantResponse = (await agentExecutor.invoke({
    //   content: 'Po kojoj cijeni predlazes da kupim dionice?',
    //   // threadId: 'thread_5kjePhx58PzvNYK2F9oWxSt1',
    // })) as AssistantResponse;
    // console.log(assistantResponse);
    // const assistantResponse2 = (await agentExecutor.invoke({
    //   content: 'Zelim kupiti po 10% nizoj cjeni od predlozene za 1000KM',
    //   threadId: assistantResponse.threadId,
    // })) as AssistantResponse;
    // console.log(assistantResponse2);
    // const assistantResponse3 = (await agentExecutor.invoke({
    //   content: 'Prikazi mi chart zadnje 2 godine',
    //   threadId: assistantResponse.threadId,
    // })) as AssistantResponse;
    // console.log(assistantResponse3);
    // const assistantResponse2 = await assistant.invoke({
    //   threadId: assistantResponse.threadId,
    //   content: 'what is my name?',
    // });
    // console.log(assistantResponse2);
  }
}
