/* eslint-disable @typescript-eslint/require-await */
import { DynamicStructuredTool } from '@langchain/core/tools';
import { StockService } from '../../stocks/stocks.service';
import { z } from 'zod';
import { OpenAIAssistantRunnable } from 'langchain/experimental/openai_assistant';
import { AppConfigService } from '../../config/config.service';
import { AgentExecutor } from 'langchain/agents';

export const callAssistantFactory = (
  appConfigService: AppConfigService,
  tools
) =>
  new DynamicStructuredTool({
    name: 'call_assistant',
    description: 'Use this function to call relevant assistant',
    schema: z.object({
      ticker: z
        .string()
        .describe(
          'Stock symbol. You have this information inside system instructions'
        ),
      question: z.string().describe('Formatted question for this assistant'),
    }),
    func: async ({ ticker, question }) => {
      console.log(`Calling call_assistant ${ticker} ${question}`);
      const assistantId = appConfigService.assistants[ticker];
      const agent = new OpenAIAssistantRunnable({
        assistantId: assistantId,
        clientOptions: {
          apiKey: appConfigService.openAiApiKey,
        },

        asAgent: true,
      });

      const agentExecutor = AgentExecutor.fromAgentAndTools({
        agent,
        tools: tools,
      });
      const assistantResponse = await agentExecutor.invoke({
        content: question,
      });

      return assistantResponse.output;
    },
  });
