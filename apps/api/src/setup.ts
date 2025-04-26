import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AppConfigService } from './app/config/config.service';
import { SaseApiService } from './app/sase-api/sase-api.service';
import { OpenaiService } from './app/openai/openai.service';
import { ReportsUtils } from './app/utils/reports.utils';
import { formatToOpenAIFunction } from 'langchain/tools';
import { LangchainToolProvider } from './app/langchain/langchain-tool.provider';
import { AssistantUtils } from './app/utils/assistant.utils';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfigService);
  const saseApi = app.get(SaseApiService);
  const openai = app.get(OpenaiService);
  const langchainToolProvider = app.get(LangchainToolProvider);
  const getStockPriceTool = langchainToolProvider.getStockPricesTool();
  const buyStock = langchainToolProvider.getBuyStockTool();
  const getUserBalance = langchainToolProvider.getUserBalance();
  const sellStock = langchainToolProvider.getSellStockTool();
  const callAssistnat = langchainToolProvider.getCallAssistant();
  const assistants = {};
  const getCurrentStockPriceTool =
    langchainToolProvider.getCurrentStockPriceTool();

  console.log('lets setup', appConfig.companies);
  for (const company of appConfig.companies) {
    await ReportsUtils.deleteAllFiles();
    await saseApi.getLatestReport(company.symbol);
    await saseApi.getStockIndicators(company.symbol, '2024');
    const vectorStore = await openai.uploadReports();
    const assistant = await openai.openai.beta.assistants.create({
      model: 'gpt-4o',
      temperature: 0.01,
      name: `SASE ${company.name} Assistant`,
      instructions: `You assist users with information from the SASE stock exchange for the company: ${company.name} - ${company.symbol}. Use defined functions for that. When a user asks for a price recommendation, perform a mathematical operation using the code_interpreter to calculate the average price over the last 30 days and, depending on indicators, suggest a price. 
    This is required so that a chart can be displayed to the user on the frontend.
    For price recommendation use the code_interpreter to calculate the exact dates — do not rely on memory for the dates.
    The financial reports are in the files. For mathematical operations  use code interpreter.  Currency is KM. Always return plain text answers. Do not use LaTeX, Markdown math formatting (like [ ], text{}, or times), or any special formatting for numbers or equations. Write all calculations in simple, human-readable text format. If you receive question about other company, ignore it.`,
      tools: [
        { type: 'file_search' },
        { type: 'code_interpreter' },
        {
          type: 'function',
          function: formatToOpenAIFunction(getCurrentStockPriceTool, {
            strict: true,
          }),
        },
        {
          type: 'function',
          function: formatToOpenAIFunction(getStockPriceTool, { strict: true }),
        },
      ],
      tool_resources: {
        file_search: {
          vector_store_ids: [vectorStore],
        },
      },
    });
    assistants[company.symbol] = assistant.id;
    console.log('Assistant created:', assistant);
  }

  const mainAssistant = await openai.openai.beta.assistants.create({
    model: 'gpt-4o',
    temperature: 0.01,
    name: 'SASE Main Assistant',
    instructions: `You are the main assistant for the SASE stock exchange, responsible for deciding which assistant to query based on the user's question. Under your management, you have the following assistants:
          ${appConfig.companies
            .map(
              (company, index) =>
                `${index + 1}. ${company.symbol} - ${company.name}\n`
            )
            .join()}
          You can call these assistants with function call_assistant to get current stock price, financial reports (finansijske izvjestaje), price recommendation and etc. 
          If you need information about current price you MUST call the relevant agent based on the company.
          If the user asks for any financial information (e.g., "prihodi", "rashodi", "dobit", "izvještaj", "finansijski izvještaj", "bilans", "prodaja", "trošak", "profit", etc.), you MUST call the relevant agent based on the company to get financial reports.
          You MUST consider any question related to company financials, such as revenue, cost, sales, or profits, as a request for financial reports and call the corresponding assistant.
          If the user asks for a price recommendation (e.g., "Koju cijenu predlažeš", "Predloži cijenu", "Preporuka za kupovnu cijenu", etc.), you MUST call the relevant assistant based on the company.
          Call it whenever you don't know question, this assistants will help you.

          If user wants to see chart, return message in this format:
          \`\`\`chart {"fromDate": "20.01.2024", "toDate": "25.01.2024", "ticker": "BHTSR"}\`\`\`. Chart can be named as grafikon or graficki prikaz and etc. Use the code_interpreter to calculate the exact dates — do not rely on memory for the dates. 
          
          If user wants to buy stocks and if you dont have information about quantity ask for that information.
          You have ability to buy and sell stocks for user. 
          If you don't have company name inside question, try to guess based on the previous messages.
          Once you receive the responses from the agents, format the result from JSON into readable text.`,
    tools: [
      { type: 'code_interpreter' },
      {
        type: 'function',
        function: formatToOpenAIFunction(buyStock, { strict: true }),
      },
      {
        type: 'function',
        function: formatToOpenAIFunction(getUserBalance),
      },
      {
        type: 'function',
        function: formatToOpenAIFunction(sellStock, { strict: true }),
      },
      {
        type: 'function',
        function: formatToOpenAIFunction(callAssistnat, { strict: true }),
      },
    ],
  });

  console.log(mainAssistant);
  await AssistantUtils.saveToEnv(assistants, mainAssistant.id);
}
bootstrap();
