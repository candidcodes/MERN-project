import { fromStorage, inStorage, removeStorage } from '@/lib'
import { createSlice } from '@reduxjs/toolkit'

const localCart = fromStorage('430cart')

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: localCart ? JSON.parse(localCart) : null ,
    },
    reducers: {
        setCart: (state, action) => {
            state.value = action.payload
            inStorage('430cart', JSON.stringify(state.value), true)
        },
        clearCart: state => {
            state.value = null
            removeStorage('430cart')
        }
    }
})

export default cartSlice.reducer

export const {setCart, clearCart} = cartSlice.actions
