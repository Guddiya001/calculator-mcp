import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "calculator-mcp-server",
  version: "1.0.0",
});

// ADD
server.registerTool(
  "add",
  {
    description: "Add two numbers",
    inputSchema: {
      a: z.number(),
      b: z.number(),
    },
  },
  async ({ a, b }) => {
    const result = a + b;

    return {
      content: [
        {
          type: "text",
          text: String(result),
        },
      ],
    };
  }
);

// SUBTRACT
server.registerTool(
  "subtract",
  {
    description: "Subtract the second number from the first number",
    inputSchema: {
      a: z.number(),
      b: z.number(),
    },
  },
  async ({ a, b }) => {
    const result = a - b;

    return {
      content: [
        {
          type: "text",
          text: String(result),
        },
      ],
    };
  }
);

// MULTIPLY
server.registerTool(
  "multiply",
  {
    description: "Multiply two numbers",
    inputSchema: {
      a: z.number(),
      b: z.number(),
    },
  },
  async ({ a, b }) => {
    const result = a * b;

    return {
      content: [
        {
          type: "text",
          text: String(result),
        },
      ],
    };
  }
);

// DIVIDE
server.registerTool(
  "divide",
  {
    description: "Divide the first number by the second number",
    inputSchema: {
      a: z.number(),
      b: z.number(),
    },
  },
  async ({ a, b }) => {
    if (b === 0) {
      return {
        content: [
          {
            type: "text",
            text: "Error: Cannot divide by zero.",
          },
        ],
        isError: true,
      };
    }

    const result = a / b;

    return {
      content: [
        {
          type: "text",
          text: String(result),
        },
      ],
    };
  }
);

// PERCENTAGE
server.registerTool(
  "percentage",
  {
    description: "Calculate what percentage one number is of another",
    inputSchema: {
      value: z.number(),
      total: z.number(),
    },
  },
  async ({ value, total }) => {
    if (total === 0) {
      return {
        content: [
          {
            type: "text",
            text: "Error: Total cannot be zero.",
          },
        ],
        isError: true,
      };
    }

    const result = (value / total) * 100;

    return {
      content: [
        {
          type: "text",
          text: `${result}%`,
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();

await server.connect(transport);