import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { GlobalStyle } from "./styles/global";
import React from "react";
import { NewTransactionsModal } from "./components/NewTransactionsModal";
import { TransactionsProvider } from "./hooks/useTransactions";


export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen ] = React.useState(false)

  const handleOpenNewTransactionModal = () => {
      setIsNewTransactionModalOpen(true)
  }

  const handleCloseNewTransactionModal = () => {
      setIsNewTransactionModalOpen(false)
  }
  return (
    <TransactionsProvider>
      <GlobalStyle />
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard/>
      <NewTransactionsModal 
        isOpen={isNewTransactionModalOpen} 
        onRequestClose={handleCloseNewTransactionModal}      
      />
    </TransactionsProvider>
  );
}

export default App;
