# SASE Stock Trading Platform Documentation

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Setup and Installation](#setup-and-installation)
- [Development Guide](#development-guide)
- [API Documentation](#api-documentation)
- [Frontend Guide](#frontend-guide)
- [Deployment](#deployment)

## Project Overview

The SASE Stock Trading Platform is a comprehensive solution for trading stocks on the Sarajevo Stock Exchange. It provides real-time market data, trading capabilities, and AI-powered market analysis.

### Key Features

- Real-time stock trading
- Portfolio management
- Market data visualization
- AI-powered market analysis
- Email notifications
- Trading history tracking

## Tech Stack

### Frontend

- **Framework**: Next.js 15.2.4
- **UI Library**: React 18.3.1
- **Styling**: TailwindCSS
- **Charts**: React ApexCharts
- **Animations**: Framer Motion

### Backend

- **Framework**: NestJS
- **Language**: TypeScript
- **Build System**: Nx
- **AI Integration**: LangChain
- **Email Service**: Resend

## Architecture

### Backend Structure

```
apps/api/src/
├── app/
│   ├── news/           # News module
│   ├── stocks/         # Stock trading module
│   ├── sase-api/       # SASE API integration
│   ├── resend/         # Email notifications
│   ├── agent/          # AI integration
│   └── config/         # Configuration
```

### Frontend Structure

```
apps/app/src/
├── app/
│   ├── page.tsx        # Main dashboard
│   ├── historija/      # Trading history
│   ├── chat/          # AI chat interface
│   └── components/     # Reusable components
```

## Setup and Installation

### Prerequisites

- Node.js (LTS version)
- NPM or Yarn
- Nx CLI

### Installation Steps

1. Clone the repository:

   ```bash
   git clone git@github.com:osalkanovic/sase.git
   cd sase
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run setup agents script:
   ```bash
   npx ts-node -r tsconfig-paths/register --compiler-options '{"module":"CommonJS"}' apps/api/src/setup.ts
   ```

## Development Guide

### Running the Application

#### Development Mode

1. Start the backend:

   ```bash
   npm run api:dev
   ```

2. Start the frontend:
   ```bash
   npm run app:dev
   ```

#### Production Build

```bash
npm run build:app
npm run start:app
```

## API Documentation

### News Module

- **GET /news**
  - Returns list of market news
  - Response format:
    ```typescript
    interface News {
      text: string;
      date: string;
      link: string;
    }
    ```

### Stocks Module

- **POST /stocks/buy**

  - Parameters:
    ```typescript
    {
      symbol: string;
      price: number;
      amount: number;
    }
    ```
  - Response:
    ```typescript
    {
      success: boolean;
      reason: string;
    }
    ```

- **POST /stocks/sell**

  - Parameters: Same as buy
  - Response: Same as buy

- **GET /stocks/balance**
  - Returns user's portfolio and balance
  - Response format:
    ```typescript
    {
      userBalance: string;
      stocks: {
        [symbol: string]: {
          name: string;
          amount: number;
          value: string;
          currentPrice: string;
        }
      }
    }
    ```

### SASE API Integration

The backend integrates with the Sarajevo Stock Exchange API:

- Base URL: `https://www.sase.ba/FeedServices`
- Endpoint: `/HandlerChart.ashx`
- Data Format: XML (converted to JSON)

Available operations:

- Get stock price
- Get historical data
- Get stock indicators
- Get company reports

## Frontend Guide

### Main Components

1. **Dashboard**

   - Stock price charts
   - Portfolio overview
   - Market news

2. **Trading Interface**

   - Buy/Sell forms
   - Order history
   - Portfolio management

3. **AI Chat**
   - Market analysis
   - Trading recommendations
   - News interpretation

### Styling

- Uses TailwindCSS for styling

## Deployment

### Production Build

1. Build the application:

   ```bash
   npm run build:app
   ```

2. Start the production server:
   ```bash
   npm run start:app
   ```

### Environment Variables

Required environment variables:

- `RESEND_API_KEY` - For email notifications
- `OPENAI_API_KEY` - For AI features

## Security Considerations

### API Security

- All API endpoints are protected
- Rate limiting implemented
- Input validation
- Error handling

### Data Protection

- Secure API key management
- HTTPS communication
- Data encryption

## Contributing

### Development Workflow

1. Create feature branch
2. Implement changes
3. Run tests
4. Create pull request

### Code Style

- Follow TypeScript best practices
- Use ESLint for linting
- Follow project's coding conventions
