import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import App from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
      {
        id: 1,
        title: "freelance website",
        type: "deposit",
        category: "dev",
        amount: 6800,
      },
      {
        id: 2,
        title: "Aluguel",
        type: "withdraw",
        category: "Casa",
        amount: 2800,
      }
    ]
    })
  },

  routes() {
    this.namespace = 'api'

    this.get('/transactions', () => {
      return this.schema.all('transactions')
    })

    this.post('/transactions', (schema, request)=>{
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
