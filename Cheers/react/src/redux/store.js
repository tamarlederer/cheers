//לא לשכוח להתקין את הספריות
// npm install @reduxjs/toolkit react-redux
import { configureStore } from '@reduxjs/toolkit'

//מיבאים את הרדוסר
//אם יש כמה רדוסרים מיבאים כאן את כולם
import adsReducer from './reducers/adsReducer'
import userReducer from './reducers/userReducer'
import commentsReducer from './reducers/commentsReducer'

//מיבאים את המידלוור - כמובן שאם יש כמה מיבאים את כולם כאן
//אם יש ממש הרבה אפשר ליצור בקובץ אחר משתנה גדול של כל המידלוור (כמו ברדוסר) ולייבא אותו לכאן
import { getAdsMidd } from './middleware/admiddleware'
import { addAdMidd } from './middleware/admiddleware'
import { postUserMidd } from './middleware/usermiddleware'
import { addCommentMidd } from './middleware/commentmiddleware'
import { getCommentsMidd } from './middleware/commentmiddleware'


//יוצרים אובייקט סטור שהוא מכיל את כל הרידקס
export const store = configureStore({
    //יוצרים משתנה רדוסר שהוא מכיל את כל הרדוסרים
    reducer: {
        ad: adsReducer,
        user:userReducer,
        comment:commentsReducer
        //כאן מוסיפים את הרדוסרים הנוספים לדוגמה
        //tip: tipReducer
    },
    //מוסיפים משתנה מידלוור ומכניסים אליו את המידלוורים שיצרנו
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({serializableCheck:false}), getAdsMidd,postUserMidd,addAdMidd,getCommentsMidd,addCommentMidd],

})