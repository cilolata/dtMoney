import { FormEvent, useState } from 'react'
import { useTransactions } from '../../hooks/useTransactions'
import Modal from 'react-modal'

import close from '../../assets/close.svg'
import income from '../../assets/income.svg'
import outcome from '../../assets/outcome.svg'

import { Container, RadioBox, TransactionTypeContainer } from './styles'

Modal.setAppElement('#root')

interface newTransactionsProps{
    isOpen: boolean
    onRequestClose: () => void
}

export function NewTransactionsModal({isOpen, onRequestClose}: newTransactionsProps){
    const { createTransaction } = useTransactions()
    
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [type, setType ] = useState('deposit')

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault()

      await createTransaction({
            title,
            amount,
            category,
            type
        })

        setTitle('')
        setAmount(0)
        setCategory('')
        setType('deposit')
        onRequestClose()

    }

    return(
        <Modal
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
        >

        <button 
            type='button' 
            onClick={onRequestClose} 
            className='react-modal-close'
            >
            <img src={close} alt="fechar modal" />
        </button>

        <Container onSubmit={handleCreateNewTransaction}>
         <h2>Cadastrar Transação</h2>

         <input 
            placeholder='Título'
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
         <input 
            type='number' 
            placeholder='Valor' 
            value={amount}
            onChange={event => setAmount(Number(event.target.value))}
            />

        <TransactionTypeContainer>
            <RadioBox
             type='button'
             onClick={() => setType('deposit')}
             isActive={type === 'deposit'}
             activeColor='green'

             >
                 <img src={income} alt="Entrada" />
                 <span>Entrada</span>

             </RadioBox>
             <RadioBox
             type='button'
             onClick={() => setType('withdraw')}
             isActive={type === 'withdraw'}
             activeColor='red'

             >
                 <img src={outcome} alt="Saída" />
                 <span>Saída</span>

             </RadioBox>
        </TransactionTypeContainer>

         <input 
         placeholder='Categoria'
         value={category}
         onChange={event => setCategory(event.target.value)}
          />

         <button type="submit">Cadastrar</button>

        </Container>
       </Modal>
    )
}