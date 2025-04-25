import { Injectable, OnModuleInit } from '@nestjs/common';
import { SendMessageDto } from './chat.dto';
import { AgentExecutor } from 'langchain/agents';
import { OpenAIAssistantRunnable } from 'langchain/experimental/openai_assistant';
import { AppConfigService } from '../../config/config.service';

import { LangchainToolProvider } from '../../langchain/langchain-tool.provider';
import { AssistantUtils } from '../../utils/assistant.utils';

@Injectable()
export class ChatService {
  private chats = new Map<
    string,
    { mainAssistantThreadId: string; stockAssistants: any }
  >();
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly langchainToolProvider: LangchainToolProvider
  ) {}

  async sendMessage(data: SendMessageDto) {
    let chat = this.getChat(data.chatId);
    const response = await this.callMainAgent(
      data.message,
      chat.mainAssistantThreadId
    );
    chat = this.updateChat(data.chatId, {
      mainAssistantThreadId: response.threadId,
    });

    return response;
  }

  async callMainAgent(message: string, threadId: string | null) {
    console.log(`Calling main agent ${message} ${threadId}`);

    const mainAssistant = new OpenAIAssistantRunnable({
      assistantId: this.appConfigService.mainAssistant,
      clientOptions: {
        apiKey: this.appConfigService.openAiApiKey,
      },

      asAgent: true,
    });
    const tools = this.langchainToolProvider.getUserTools();

    const mainAgentExecutor = AgentExecutor.fromAgentAndTools({
      agent: mainAssistant,
      tools: tools,
    });

    const response = await mainAgentExecutor.invoke({
      content: message,
      ...(threadId ? { threadId } : {}),
    });
    return response;
  }

  async callAgent(message: string, assistantId, threadId: string | null) {
    console.log(`Calling sub agent ${message} ${assistantId} ${threadId}`);
    const agent = new OpenAIAssistantRunnable({
      assistantId: assistantId,
      clientOptions: {
        apiKey: this.appConfigService.openAiApiKey,
      },

      asAgent: true,
    });
    const tools = this.langchainToolProvider.getStockTools();

    const agentExecutor = AgentExecutor.fromAgentAndTools({
      agent,
      tools: tools,
    });
    const assistantResponse = await agentExecutor.invoke({
      content: `This message is forwarded from main agent. If message contains name of other company, ignore that company and just return information related to your company. Respond in message language.\n Message:${message}`,
      ...(threadId ? { threadId: threadId } : {}),
    });

    return assistantResponse;
  }

  private getChat(chatId: string) {
    const chat = this.chats.get(chatId);
    if (!chat) {
      this.chats.set(chatId, {
        mainAssistantThreadId: null,
        stockAssistants: {},
      });
    }

    return this.chats.get(chatId);
  }

  private updateChat(chatId: string, data) {
    this.chats.set(chatId, { ...this.chats.get(chatId), ...data });

    return this.chats.get(chatId);
  }

  async zeroShotTest(data: SendMessageDto) {
    // const interpreter = await PythonInterpreterTool.initialize({});
    // const agentModel = new ChatOpenAI({
    //   temperature: 0,
    //   model: 'gpt-4o',
    //   apiKey: this.appConfigService.openAiApiKey,
    // });
    // const agentTools = [
    //   getCurrentStockPriceTool,
    //   //   getStockPriceTool,
    //   buyStock,
    //   interpreter,
    // ];
    // const agent = createReactAgent({
    //   llm: agentModel,
    //   tools: agentTools,
    //   checkpointSaver: this.agentCheckpointer,
    //   prompt:
    //     new SystemMessage(`You assist users with information from the SASE stock exchange for the company: BH Telecom - BHTSR. When a user asks for a price recommendation, perform a mathematical operation using the code_interpreter to calculate the average price over the last 30 days and, depending on indicators, suggest a price. When a user requests the stock price for a specific period, return a message in the following format:
    // \`\`\`chart {"fromDate": "20.01.2024", "toDate": "25.01.2024", "ticker": "BHTSR"}\`\`\`. Chart can be named as grafikon or graficki prikaz and etc.
    // Use the code_interpreter to calculate the exact dates — do not rely on memory for the dates. This is required so that a chart can be displayed to the user on the frontend.
    // The financial reports are in the files. For mathematical operations  use code interpreter. If user wants to buy stocks and if you dont have information about quantity ask for that information. Currency is KM`),
    // });
    // const agentState = await agent.invoke(
    //   { messages: [new HumanMessage(data.message)] },
    //   { configurable: { thread_id: data.threadId } },
    // );
    // return agentState;
  }
}
