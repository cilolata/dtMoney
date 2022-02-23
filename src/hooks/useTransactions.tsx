import React, { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import { api } from "../services/api";

interface ITransactions {
    id: number
    title: string
    amount: number
    type: string
    category: string
    createdAt: string
}

//herdando todos os campos do ITransaction menos id e createdAt - contrário do Omit é o Pick
type TransactionInput = Omit<ITransactions, 'id' | 'createdAt'>

interface ITransactionsProviderProps{
    children: ReactNode
}

interface TransactionsContextData {
    transactions: ITransactions[]
    createTransaction: (transactionInput: TransactionInput) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export function TransactionsProvider({ children }: ITransactionsProviderProps){
    const[transactions, setTransactions] = useState<ITransactions[]>([])
    
    React.useEffect(() => {
        api.get('/transactions').then(response => setTransactions(response.data)
        )}, [])

   async function createTransaction(transactionInput: TransactionInput){    
       const response = await api.post('/transactions', {
           ...transactionInput, 
           createdAt: new Date()
        })

       const { transaction } = response.data

       setTransactions([
           ...transactions,
           transaction
        ])
    }

    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext)

    return context
}