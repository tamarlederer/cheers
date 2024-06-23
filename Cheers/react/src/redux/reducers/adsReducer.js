import { createSlice } from '@reduxjs/toolkit';

//אתחול הסטייט הגלובלי במשתנים ריקים שאת ערכם נקבל מהשרת ונכניס לסטייט בפונקציה של הוספת מודעה
const initialState = {
    listAds: []
}

//יצירת רדוסר למודעות
export const AdSlice = createSlice({
    name: 'ad',
    initialState,
    reducers: {
        //הפונקציה מקבלת רשימה של כל המודעות ומכניסה אותם למשתנה מודעות הקיים בסטייט הגלובלי
        getAds: (state, action) => {
            state.listAds = (action.payload);
        },

        // הפונקציה שמכניסה מודעה למשתנה מודעות הקיים בסטייט הגלובלי
        addAd: (state, action) => {
            state.listAds.push(action.payload);
        },
        // כאן מוסיפים פונקציות נוספות לעידכון הסטייט לדוגמה updateRecipe
    },
})
// Action creators are generated for each case reducer function
//מיצאים את הפעולות - פונקציות שכתבנו ברדוסר
export const { getAds, addAd, getAdsById } = AdSlice.actions
//מיצאים את הרדוסר
export default AdSlice.reducer
