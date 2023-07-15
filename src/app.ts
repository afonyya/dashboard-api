import express from 'express';
import type { Express } from 'express';
import type { Server } from 'http';

export class App {
  app: Express;
  server: Server;
  port: number;

  constructor() {
    this.app = express();
    this.port = 8000;
  }

  public init() {
    this.server = this.app.listen(this.port);
    console.log(`On http://localhost:${this.port}`);
  }
}
