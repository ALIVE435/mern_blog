import { useSelector } from "react-redux"


const ThemeProvider = ({children})=>{
    const { theme } = useSelector(state=>state.theme)
    return(
        <div className={theme?"light":"dark"}>
            <div className="bg-slate-100 text-gray-700 min-h-screen dark:text-gray-200 dark:bg-[rgb(18,26,59)]">
                {children}
            </div>
        </div>
    )
}

export default ThemeProvider