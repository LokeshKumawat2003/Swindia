
import { configureStore } from '@reduxjs/toolkit';
import  leadSlice  from './detail';


const store = configureStore({
  reducer: {
    lead: leadSlice,
  },
});

export default store;
